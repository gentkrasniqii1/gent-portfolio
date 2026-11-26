// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractTaggedText } from "../../scripts/pdf-text";

const CV_PDF = path.join(process.cwd(), "public", "documents", "cv.pdf");

describe("extractTaggedText", () => {
  it("reads public/documents/cv.pdf as one line per block, with list items as bullets", async () => {
    const text = await extractTaggedText(
      new Uint8Array(fs.readFileSync(CV_PDF)),
    );

    expect(text).not.toBeNull();
    const lines = text!.split("\n");
    expect(lines.some((line) => line.startsWith("• "))).toBe(true);
    // Running headers/footers are untagged artifacts and must not leak in.
    expect(lines.some((line) => /^Page \d+ of \d+$/i.test(line))).toBe(false);
  });
});
