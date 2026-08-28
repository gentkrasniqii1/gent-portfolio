import path from "node:path";
import { spawn } from "node:child_process";
import chokidar from "chokidar";

const ROOT = process.cwd();
const PDF_PATH = path.join(ROOT, "public", "documents", "cv.pdf");

function runParseCv() {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("npx", ["tsx", "scripts/parse-cv.ts"], {
      cwd: ROOT,
      stdio: "inherit",
      shell: true,
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(new Error(`parse-cv.ts exited with code ${code ?? "unknown"}`));
    });
  });
}

async function start() {
  try {
    await runParseCv();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[watch-cv] Initial CV parse failed: ${message}`);
    console.error(
      "[watch-cv] Not starting the dev server with invalid/missing CV data. " +
        "Fix public/documents/cv.pdf and try again.",
    );
    process.exit(1);
  }

  // Re-parse on any change to public/documents/ (not just cv.pdf) so the
  // single-PDF auto-detect fallback in parse-cv.ts is also picked up live —
  // e.g. renaming the source file while dev is running.
  chokidar
    .watch(path.dirname(PDF_PATH), { ignoreInitial: true })
    .on("all", (event, changedPath) => {
      if (!changedPath.toLowerCase().endsWith(".pdf")) return;
      console.log(
        `[watch-cv] ${path.basename(changedPath)} ${event} — re-parsing`,
      );
      void runParseCv().catch((error) => {
        console.error(
          "[watch-cv] Re-parse failed — the /cv page still reflects the " +
            "last valid CV data:",
          error.message,
        );
      });
    });

  console.log("[watch-cv] Watching public/documents/ for CV PDF changes");

  const nextDev = spawn("npx", ["next", "dev"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });

  nextDev.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

void start();
