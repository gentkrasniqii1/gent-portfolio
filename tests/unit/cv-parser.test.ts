import { describe, expect, it } from "vitest";
import {
  CvValidationError,
  normalizeRole,
  parseCvText,
  validateCvData,
} from "../../scripts/cv-parser";
import type { CvData } from "../../src/types/cv";

const SAMPLE_CV_TEXT = `
GENT KRASNIQI
FRONTEND DEVELOPER
Prizren, Kosove, +383 49 168 682, gentkrass21@gmail.com
linkedin.com/in/gent-krasniqi | github.com/gentkrasniqii1 | gent-portfolio.vercel.app
Frontend-focused developer with production experience.
TECHNICAL SKILLS
Languages: JavaScript, TypeScript
Frontend: React.js, Tailwind CSS
PROJECTS
SkillMatch - AI Platform 2026
• Built a full-stack recruitment platform with real-time features
• Implemented secure authentication and role-based dashboards
Live: skillmatchapp.com | Code: github.com/gentkrasniqii1
PROFESSIONAL EXPERIENCE
React.js Intern - Azwedo, Prishtine Jun 2023 - Jan 2024
• Developed responsive React.js UI components
EDUCATION
Computer Science and Engineering - UBT Oct 2023 - Present
ADDITIONAL INFORMATION
Languages: Albanian (Native), English (Professional)
Certifications: Shkolla Digjitale - Frontend Developer; RDA - AI Workshop
`.trim();

describe("normalizeRole", () => {
  it("fixes spaced react-pdf role output", () => {
    expect(normalizeRole("FR ONTEND DEV ELOP ER")).toBe("FRONTEND DEVELOPER");
  });
});

describe("parseCvText", () => {
  it("parses header, sections, projects, and additional information", () => {
    const { data, warnings } = parseCvText(SAMPLE_CV_TEXT);

    expect(warnings).toEqual([]);
    expect(data.identity.name).toBe("GENT KRASNIQI");
    expect(data.identity.role).toBe("FRONTEND DEVELOPER");
    expect(data.identity.contactBits).toEqual([
      "Prizren, Kosove",
      "+383 49 168 682",
      "gentkrass21@gmail.com",
      "linkedin.com/in/gent-krasniqi",
      "github.com/gentkrasniqii1",
      "gent-portfolio.vercel.app",
    ]);
    expect(data.identity.summary).toContain("Frontend-focused developer");
    expect(data.skillGroups).toHaveLength(2);
    expect(data.projects).toHaveLength(1);
    expect(data.projects[0]?.liveUrl).toBe("https://skillmatchapp.com");
    expect(data.projects[0]?.githubUrl).toBe(
      "https://github.com/gentkrasniqii1",
    );
    expect(data.experience[0]?.title).toBe(
      "React.js Intern - Azwedo, Prishtine",
    );
    expect(data.education[0]?.title).toBe(
      "Computer Science and Engineering - UBT",
    );
    expect(data.languages.map((language) => language.name)).toEqual([
      "Albanian",
      "English",
    ]);
    expect(data.certifications).toHaveLength(2);
  });

  it("warns when expected sections are missing", () => {
    const { warnings } = parseCvText(
      `
GENT KRASNIQI
FRONTEND DEVELOPER
Prizren, Kosove, +383 49 168 682, gentkrass21@gmail.com
linkedin.com/in/gent
Summary text only.
TECHNICAL SKILLS
Languages: JavaScript
    `.trim(),
    );

    expect(
      warnings.some((warning) => warning.includes("Missing section")),
    ).toBe(true);
  });

  it("accepts recognized section heading aliases (e.g. WORK EXPERIENCE, SKILLS)", () => {
    const { data, warnings } = parseCvText(
      SAMPLE_CV_TEXT.replace("TECHNICAL SKILLS", "SKILLS").replace(
        "PROFESSIONAL EXPERIENCE",
        "WORK EXPERIENCE",
      ),
    );

    expect(warnings).toEqual([]);
    expect(data.skillGroups.length).toBeGreaterThan(0);
    expect(data.experience.length).toBeGreaterThan(0);
  });

  it("throws CvValidationError when no recognized section heading is found", () => {
    expect(() =>
      parseCvText(
        `
GENT KRASNIQI
FRONTEND DEVELOPER
Prizren, Kosove, +383 49 168 682, gentkrass21@gmail.com
linkedin.com/in/gent
Just some unstructured text with no headings at all.
      `.trim(),
      ),
    ).toThrow(CvValidationError);
  });

  it("throws CvValidationError when the header is missing name/role/contact lines", () => {
    expect(() =>
      parseCvText(
        `
GENT KRASNIQI
TECHNICAL SKILLS
Languages: JavaScript
      `.trim(),
      ),
    ).toThrow(CvValidationError);
  });
});

describe("validateCvData", () => {
  const baseData: CvData = {
    identity: {
      name: "Jane Doe",
      role: "Developer",
      headline: "",
      summary: "A short summary of experience.",
      contactBits: ["jane@example.com"],
      lastUpdatedLabel: null,
    },
    experience: [
      {
        id: "role-1",
        title: "Engineer",
        organization: "Acme",
        period: "Jan 2020 - Dec 2021",
        description: ["Did engineering work."],
      },
    ],
    projects: [],
    education: [],
    skillGroups: [],
    languages: [],
    certifications: [],
  };

  it("passes for well-formed data", () => {
    expect(() =>
      validateCvData(baseData, "Jane Doe Developer jane@example.com"),
    ).not.toThrow();
  });

  it("throws when name is empty", () => {
    const data: CvData = {
      ...baseData,
      identity: { ...baseData.identity, name: "" },
    };
    expect(() => validateCvData(data, "some text")).toThrow(CvValidationError);
  });

  it("throws when an experience entry has a malformed period", () => {
    const data: CvData = {
      ...baseData,
      experience: [{ ...baseData.experience[0], period: "not-a-real-date" }],
    };
    expect(() => validateCvData(data, "some text")).toThrow(CvValidationError);
  });

  it("throws on suspiciously large text loss relative to the source PDF", () => {
    const hugeRawText = "word ".repeat(2000); // ~10,000 chars of real content
    expect(() => validateCvData(baseData, hugeRawText)).toThrow(
      CvValidationError,
    );
  });

  it("does not flag small CVs as text loss (guard only applies above the length threshold)", () => {
    expect(() => validateCvData(baseData, "short raw text")).not.toThrow();
  });
});
