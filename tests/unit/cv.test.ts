import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CV_PDF_PATH, getCvData, getCvPdfFilename } from "@/data/cv";

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
