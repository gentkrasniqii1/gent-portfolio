import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import type { CvData } from "../src/types/cv";
import { CvValidationError, parseCvText } from "./cv-parser";

const ROOT = process.cwd();
const DOCUMENTS_DIR = path.join(ROOT, "public", "documents");
const CANONICAL_PDF_PATH = path.join(DOCUMENTS_DIR, "cv.pdf");
const OUTPUT_PATH = path.join(ROOT, "src", "data", "cv.generated.ts");

/**
 * Running in CI or on Vercel (or any environment that opts in via CI=true).
 * Used to decide whether a missing PDF may fall back to a previously
 * generated file (a local dev convenience) or must fail the run outright —
 * a production build should never ship silently stale CV data.
 */
const IS_CI_OR_PROD = Boolean(process.env.CI) || Boolean(process.env.VERCEL);

/**
 * Resolve the CV source PDF path.
 *
 * `public/documents/cv.pdf` is the canonical, expected filename and is
 * always preferred when present. If it is missing, and exactly one other
 * `.pdf` file exists in `public/documents/`, that file is used instead —
 * this keeps replacing the CV simple (drop in a differently-named PDF) but
 * intentionally does NOT try to guess when there is any ambiguity (zero or
 * multiple candidates), since silent misdetection of a CV file would be
 * worse than requiring the canonical filename.
 */
async function resolveCvPdfPath(): Promise<{
  path: string;
  usedFallback: boolean;
} | null> {
  try {
    await fs.access(CANONICAL_PDF_PATH);
    return { path: CANONICAL_PDF_PATH, usedFallback: false };
  } catch {
    // fall through to auto-detection below
  }

  let entries: string[];
  try {
    entries = await fs.readdir(DOCUMENTS_DIR);
  } catch {
    return null;
  }

  const pdfCandidates = entries.filter(
    (name) => name.toLowerCase().endsWith(".pdf") && name !== "cv.pdf",
  );

  if (pdfCandidates.length === 1) {
    return {
      path: path.join(DOCUMENTS_DIR, pdfCandidates[0]),
      usedFallback: true,
    };
  }

  return null;
}

async function readPdfText(filePath: string) {
  const buffer = await fs.readFile(filePath);
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
}

function serializeValue(value: unknown, indent = 0): string {
  const pad = " ".repeat(indent);
  const nextPad = " ".repeat(indent + 2);

  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value
      .map((item) => `${nextPad}${serializeValue(item, indent + 2)}`)
      .join(",\n")}\n${pad}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, entryValue]) => entryValue !== undefined,
  );

  return `{\n${entries
    .map(
      ([key, entryValue]) =>
        `${nextPad}${key}: ${serializeValue(entryValue, indent + 2)}`,
    )
    .join(",\n")}\n${pad}}`;
}

function buildGeneratedFile(
  data: CvData,
  warnings: string[],
  sourcePath: string,
) {
  const generatedAt = new Date().toISOString();
  const warningBlock =
    warnings.length > 0
      ? `\n/** Parser warnings:\n${warnings.map((warning) => ` * - ${warning}`).join("\n")}\n */`
      : "";

  return `/** AUTO-GENERATED — do not edit manually.
 * Source: ${sourcePath.replace(/\\/g, "/")}
 * Generated: ${generatedAt}
 */${warningBlock}
import type { CvData, CvParseMeta } from "@/types/cv";

export const CV_PDF_PATH = "/documents/cv.pdf";

export const CV_PARSE_META: CvParseMeta = ${serializeValue({
    sourcePath: sourcePath.replace(/\\/g, "/"),
    generatedAt,
    warnings,
  })};

export const CV_DATA: CvData = ${serializeValue(data)};

export function getCvData(): CvData {
  return CV_DATA;
}
`;
}

async function hasPreviousGenerated(): Promise<boolean> {
  try {
    await fs.access(OUTPUT_PATH);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const resolved = await resolveCvPdfPath();

  if (!resolved) {
    console.error(
      `[parse-cv] No CV PDF found. Expected ${path.relative(ROOT, CANONICAL_PDF_PATH)}, ` +
        `and no unambiguous single fallback PDF exists in ${path.relative(ROOT, DOCUMENTS_DIR)}.`,
    );

    // Missing-file fallback is a local dev convenience only. CI/production
    // builds must never silently ship stale CV data — fail the build.
    if (!IS_CI_OR_PROD && (await hasPreviousGenerated())) {
      console.warn(
        "[parse-cv] Dev mode: keeping existing src/data/cv.generated.ts. " +
          "This will FAIL the build in CI/production — restore public/documents/cv.pdf.",
      );
      return;
    }

    process.exit(1);
  }

  const { path: pdfPath, usedFallback } = resolved;

  if (usedFallback) {
    console.warn(
      `[parse-cv] public/documents/cv.pdf not found — using detected single PDF instead: ` +
        `${path.relative(ROOT, pdfPath)}. Prefer naming the file cv.pdf.`,
    );
  }

  try {
    const rawText = await readPdfText(pdfPath);
    const { data, warnings } = parseCvText(rawText);

    for (const warning of warnings) {
      console.warn(`[parse-cv] ${warning}`);
    }

    await fs.writeFile(
      OUTPUT_PATH,
      buildGeneratedFile(data, warnings, pdfPath),
    );
    console.log(`[parse-cv] Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[parse-cv] Failed to parse CV PDF: ${message}`);

    // A CvValidationError means the PDF was read but produced invalid or
    // incomplete data — this must always fail the run. Falling back to a
    // stale generated file here would silently ship wrong CV content,
    // which is exactly what this pipeline must prevent.
    if (error instanceof CvValidationError) {
      console.error(
        "[parse-cv] Refusing to reuse a previous generated file for a " +
          "content validation failure — fix the CV PDF and re-run.",
      );
      process.exit(1);
    }

    // Any other failure (e.g. a corrupt/unreadable PDF file) is treated the
    // same as a missing file: a dev-only convenience fallback, never in CI.
    if (!IS_CI_OR_PROD && (await hasPreviousGenerated())) {
      console.warn(
        "[parse-cv] Dev mode: keeping existing src/data/cv.generated.ts. " +
          "This will FAIL the build in CI/production — fix the CV PDF.",
      );
      return;
    }

    process.exit(1);
  }
}

void main();
