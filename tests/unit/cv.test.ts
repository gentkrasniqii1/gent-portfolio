import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CV_PARSE_META,
  CV_PDF_PATH,
  getCvData,
  getCvPdfFilename,
} from "@/data/cv";
import { SOCIAL_LINKS } from "@/lib/constants";

describe("cv.generated.ts", () => {
  // CI runs this before the build, so a commit that changes cv.pdf without
  // regenerating the committed cv.generated.ts fails instead of shipping
  // stale CV data.
  it("was generated from the current public/documents/cv.pdf", () => {
    const pdf = fs.readFileSync(
      path.join(process.cwd(), "public", "documents", "cv.pdf"),
    );
    const currentSha256 = createHash("sha256").update(pdf).digest("hex");

    expect(
      CV_PARSE_META.sourceSha256,
      "src/data/cv.generated.ts is out of date with public/documents/cv.pdf. " +
        "Run `npx tsx scripts/parse-cv.ts` and commit both files together.",
    ).toBe(currentSha256);
  });
});

describe("getCvData", () => {
  it("loads parsed CV content from cv.generated.ts", () => {
    const cv = getCvData();

    expect(cv.identity.name.length).toBeGreaterThan(0);
    expect(cv.identity.role.length).toBeGreaterThan(0);
    expect(cv.identity.summary.length).toBeGreaterThan(0);
    expect(cv.identity.contactBits.length).toBeGreaterThan(0);
    expect(cv.experience.length).toBeGreaterThan(0);
    expect(cv.projects.length).toBeGreaterThan(0);
    expect(cv.education.length).toBeGreaterThan(0);
    expect(cv.skillGroups.length).toBeGreaterThan(0);
    expect(cv.languages.length).toBeGreaterThan(0);
    expect(cv.certifications.length).toBeGreaterThan(0);
  });

  it("includes SkillMatch project highlights and links when present in the PDF", () => {
    const skillmatch = getCvData().projects.find((project) =>
      project.title.toLowerCase().includes("skillmatch"),
    );

    expect(skillmatch).toBeDefined();
    expect(skillmatch?.highlights.length).toBeGreaterThan(0);
  });
});

describe("public email", () => {
  it("shows the public address instead of the inbox listed in the PDF", () => {
    const bits = getCvData().identity.contactBits;
    const emails = bits.filter((bit) => bit.includes("@"));

    expect(emails).toEqual([SOCIAL_LINKS.email]);
    expect(bits.join(" ")).not.toContain("gmail.com");
  });
});

describe("getCvPdfFilename", () => {
  it("builds a download filename from the profile name", () => {
    expect(getCvPdfFilename("Gent Krasniqi")).toBe("Gent-Krasniqi-CV.pdf");
    expect(getCvPdfFilename(getCvData().identity.name)).toMatch(/-CV\.pdf$/);
  });
});

describe("CV_PDF_PATH", () => {
  it("points to the static PDF in public/documents", () => {
    expect(CV_PDF_PATH).toBe("/documents/cv.pdf");

    const pdfPath = path.join(process.cwd(), "public", "documents", "cv.pdf");
    expect(fs.existsSync(pdfPath)).toBe(true);
  });
});
