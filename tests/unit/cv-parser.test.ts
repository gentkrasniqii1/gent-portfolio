import { describe, expect, it } from "vitest";
import {
  applyTextCorrections,
  CvValidationError,
  isGitHubProfileUrl,
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

/** Shape of text read from a tagged PDF: one line per paragraph/list item. */
const TAGGED_CV_TEXT = `
Jane Doe
Frontend / Full-Stack Developer
Prizren, Kosovë · +383 00 000 000 · jane@example.com · github.com/jane
Profile
Developer who ships complete web apps.
Technical skills
• Frontend: React.js, Next.js
• Tools & IT: Git/GitHub, Windows and hardware troubleshooting
Professional experience
Founder & Backend Developer — Studio, Prizren · 2026 – Present
• Founded a digital studio
Intern — Company, Prishtinë · Jun 2023 – Jan 2024
• Built React.js interfaces
Selected projects
Shop — online store · shop.example.com · React, Node.js
• Checkout with saved carts
Earlier projects: Recipes app, Fitness app.
Education
BSc Computer Science — UBT · Oct 2023 – Present
High School, Prizren · Sep 2020 – Jun 2023 · GPA 4.8
Certifications & languages
Certifications: School — Frontend Developer · RDA — AI Workshop (participation)
Languages: Albanian (native), English (professional)
`.trim();

describe("normalizeRole", () => {
  it("fixes spaced react-pdf role output", () => {
    expect(normalizeRole("FR ONTEND DEV ELOP ER")).toBe("FRONTEND DEVELOPER");
  });

  it("keeps mixed-case roles as written", () => {
    expect(normalizeRole("Frontend / Full-Stack  Developer")).toBe(
      "Frontend / Full-Stack Developer",
    );
  });
});

describe("applyTextCorrections", () => {
  it("restores Albanian diacritics in place names", () => {
    expect(applyTextCorrections("Prizren, Kosove · Azwedo, Prishtine")).toBe(
      "Prizren, Kosovë · Azwedo, Prishtinë",
    );
  });

  it("leaves already-correct text untouched", () => {
    expect(applyTextCorrections("Prizren, Kosovë")).toBe("Prizren, Kosovë");
  });
});

describe("isGitHubProfileUrl", () => {
  it("detects profile links but not repository links", () => {
    expect(isGitHubProfileUrl("https://github.com/gentkrasniqii1")).toBe(true);
    expect(isGitHubProfileUrl("https://github.com/gentkrasniqii1/")).toBe(true);
    expect(
      isGitHubProfileUrl(
        "https://github.com/gentkrasniqii1/prizren-smart-city",
      ),
    ).toBe(false);
  });
});

describe("parseCvText", () => {
  it("parses header, sections, projects, and additional information", () => {
    const { data, warnings } = parseCvText(SAMPLE_CV_TEXT);

    expect(warnings).toEqual([]);
    expect(data.identity.name).toBe("GENT KRASNIQI");
    expect(data.identity.role).toBe("FRONTEND DEVELOPER");
    expect(data.identity.contactBits).toEqual([
      "Prizren, Kosovë",
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
    // A bare profile link is not a repository, so it is dropped.
    expect(data.projects[0]?.githubUrl).toBeUndefined();
    expect(data.experience[0]?.title).toBe(
      "React.js Intern - Azwedo, Prishtinë",
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

  it("parses the tagged layout: Profile section, · separators and en-dash periods", () => {
    const { data, warnings } = parseCvText(TAGGED_CV_TEXT);

    expect(warnings).toEqual([]);
    expect(data.identity.name).toBe("Jane Doe");
    expect(data.identity.role).toBe("Frontend / Full-Stack Developer");
    expect(data.identity.summary).toBe(
      "Developer who ships complete web apps.",
    );
    expect(data.identity.contactBits).toEqual([
      "Prizren, Kosovë",
      "+383 00 000 000",
      "jane@example.com",
      "github.com/jane",
    ]);
    expect(data.skillGroups.map((group) => group.label)).toEqual([
      "Frontend",
      "Tools & IT",
    ]);
    expect(data.experience).toEqual([
      expect.objectContaining({
        title: "Founder & Backend Developer — Studio, Prizren",
        period: "2026 – Present",
        description: ["Founded a digital studio"],
      }),
      expect.objectContaining({
        title: "Intern — Company, Prishtinë",
        period: "Jun 2023 – Jan 2024",
        description: ["Built React.js interfaces"],
      }),
    ]);
    expect(data.projects[0]).toMatchObject({
      title: "Shop — online store",
      year: "",
      liveUrl: "https://shop.example.com",
      shortDescription: "React, Node.js",
      highlights: ["Checkout with saved carts"],
    });
    expect(data.projects[1]).toMatchObject({
      title: "Earlier projects",
      highlights: ["Recipes app, Fitness app."],
    });
    expect(data.education[1]).toMatchObject({
      title: "High School, Prizren",
      period: "Sep 2020 – Jun 2023",
      description: ["GPA 4.8"],
    });
    expect(data.certifications.map((cert) => cert.label)).toEqual([
      "School — Frontend Developer",
      "RDA — AI Workshop (participation)",
    ]);
    expect(data.languages.map((language) => language.name)).toEqual([
      "Albanian",
      "English",
    ]);
  });

  it("slices sections by their position in the document, not a fixed order", () => {
    const { data } = parseCvText(TAGGED_CV_TEXT);

    // Experience comes before projects here; neither may swallow the other.
    expect(data.experience).toHaveLength(2);
    expect(data.projects).toHaveLength(2);
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
