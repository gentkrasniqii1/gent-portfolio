import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

/*
 * Tag-aware text extraction for tagged PDFs (e.g. a CV printed to PDF from a
 * browser). Plain text extraction loses list structure when bullets are drawn
 * as graphics rather than "•" characters, so wrapped bullet lines can't be
 * told apart from new bullets. Tagged PDFs carry a structure tree (headings,
 * paragraphs, list items); reading it gives one line per heading, paragraph
 * or list item, with list items prefixed "• ", and leaves out untagged
 * artifacts such as running page headers and "Page 1 of 2" footers.
 *
 * pdfjs-dist is loaded from pdf-parse's own dependency tree, so this always
 * uses the exact pdfjs version pdf-parse ships with.
 */

interface StructNode {
  role?: string;
  type?: string;
  id?: string;
  children?: StructNode[];
}

interface TextItem {
  type?: string;
  id?: string | null;
  str?: string;
  hasEOL?: boolean;
}

interface PdfPage {
  getStructTree(): Promise<StructNode | null>;
  getTextContent(params: {
    includeMarkedContent: boolean;
  }): Promise<{ items: TextItem[] }>;
}

interface PdfDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
  destroy(): Promise<void>;
}

interface PdfjsModule {
  getDocument(source: { data: Uint8Array; verbosity?: number }): {
    promise: Promise<PdfDocument>;
  };
}

/** Structure roles rendered as one line of text each. */
const BLOCK_ROLES = new Set([
  "H",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
  "LBody",
  "Title",
  "Caption",
  "TH",
  "TD",
]);

const BULLET_PREFIX = /^[•●▪◦\-–—]\s/;

async function loadPdfjs(): Promise<PdfjsModule> {
  const rootRequire = createRequire(path.join(process.cwd(), "package.json"));
  const pdfParseRequire = createRequire(rootRequire.resolve("pdf-parse"));
  const modulePath = pdfParseRequire.resolve("pdfjs-dist/legacy/build/pdf.mjs");
  return (await import(pathToFileURL(modulePath).href)) as PdfjsModule;
}

/** Text of every marked-content sequence on a page, keyed by its id. */
function textByMarkedContentId(items: TextItem[]) {
  const texts = new Map<string, string>();
  const open: Array<string | null> = [];

  for (const item of items) {
    if (
      item.type === "beginMarkedContentProps" ||
      item.type === "beginMarkedContent"
    ) {
      open.push(item.id ?? null);
      continue;
    }
    if (item.type === "endMarkedContent") {
      open.pop();
      continue;
    }

    const id = [...open].reverse().find((value) => value);
    if (!id || typeof item.str !== "string") continue;
    texts.set(id, (texts.get(id) ?? "") + item.str + (item.hasEOL ? "\n" : ""));
  }

  return texts;
}

/**
 * Returns the PDF's text with one line per tagged block, or `null` when the
 * PDF has no structure tree (callers then fall back to plain extraction).
 */
export async function extractTaggedText(data: Uint8Array) {
  const pdfjs = await loadPdfjs();
  // pdfjs may transfer (detach) the buffer it's given, so pass a copy.
  const doc = await pdfjs.getDocument({ data: data.slice(), verbosity: 0 })
    .promise;

  try {
    const lines: string[] = [];

    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
      const page = await doc.getPage(pageNumber);
      const tree = await page.getStructTree();
      if (!tree) return null;

      const { items } = await page.getTextContent({
        includeMarkedContent: true,
      });
      const texts = textByMarkedContentId(items);

      const collect = (node: StructNode): string =>
        node.type === "content"
          ? (texts.get(node.id ?? "") ?? "")
          : (node.children ?? []).map(collect).join("");

      const visit = (node: StructNode) => {
        // List labels hold the bullet glyph (often drawn as a graphic).
        if (node.role === "Lbl") return;

        if (node.role && BLOCK_ROLES.has(node.role)) {
          const text = collect(node).replace(/\s+/g, " ").trim();
          if (!text) return;
          lines.push(
            node.role === "LBody" && !BULLET_PREFIX.test(text)
              ? `• ${text}`
              : text,
          );
          return;
        }

        for (const child of node.children ?? []) visit(child);
      };

      visit(tree);
    }

    return lines.length > 0 ? lines.join("\n") : null;
  } finally {
    await doc.destroy();
  }
}
