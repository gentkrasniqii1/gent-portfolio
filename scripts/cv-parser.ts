import type {
  CvCertificationItem,
  CvData,
  CvExperienceItem,
  CvIdentity,
  CvLanguageItem,
  CvProjectItem,
  CvSkillGroup,
} from "../src/types/cv";

const SECTION_KEYS = [
  "TECHNICAL SKILLS",
  "PROJECTS",
  "PROFESSIONAL EXPERIENCE",
  "EDUCATION",
  "ADDITIONAL INFORMATION",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

/**
 * Alternate headings that map to the same canonical section. Keeps the parser
 * from breaking on reasonable CV wording changes (e.g. "SKILLS" vs.
 * "TECHNICAL SKILLS") without turning section detection into free-text NLP.
 * Add new aliases here as real CV variants are encountered — do not guess.
 */
const SECTION_ALIASES: Record<string, SectionKey> = {
  "TECHNICAL SKILLS": "TECHNICAL SKILLS",
  SKILLS: "TECHNICAL SKILLS",
  "SKILLS & TOOLS": "TECHNICAL SKILLS",
  PROJECTS: "PROJECTS",
  "SELECTED PROJECTS": "PROJECTS",
  "PROFESSIONAL EXPERIENCE": "PROFESSIONAL EXPERIENCE",
  EXPERIENCE: "PROFESSIONAL EXPERIENCE",
  "WORK EXPERIENCE": "PROFESSIONAL EXPERIENCE",
  "EMPLOYMENT HISTORY": "PROFESSIONAL EXPERIENCE",
  EDUCATION: "EDUCATION",
  "EDUCATION & TRAINING": "EDUCATION",
  "ADDITIONAL INFORMATION": "ADDITIONAL INFORMATION",
  "ADDITIONAL INFO": "ADDITIONAL INFORMATION",
};

/** Thrown when parsed CV data fails structural validation — the caller must not use it. */
export class CvValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CvValidationError";
  }
}

const MONTH = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";

const PERIOD_PATTERN = new RegExp(
  `((${MONTH})\\s+\\d{4}\\s*-\\s*(?:(${MONTH})\\s+\\d{4}|Present))$`,
);

const YEAR_PATTERN = /(\d{4})(?:\s*-\s*Present)?$/;

export function normalizeCompact(value: string) {
  return value.replace(/\s/g, "").toUpperCase();
}

export function normalizeRole(value: string) {
  const compact = value.replace(/\s/g, "");
  if (/DEVELOPER$/i.test(compact)) {
    return compact.replace(/DEVELOPER$/i, " DEVELOPER").trim();
  }
  return value.replace(/\s+/g, " ").trim();
}

function slugify(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `item-${index}`;
}

function splitLines(text: string) {
  return text
    .replace(/\uFEFF/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) => line.length > 0 && !/^--\s+\d+\s+of\s+\d+\s+--$/i.test(line),
    );
}

const ALIAS_LOOKUP: Record<string, SectionKey> = Object.fromEntries(
  Object.entries(SECTION_ALIASES).map(([alias, section]) => [
    normalizeCompact(alias),
    section,
  ]),
);

function matchSectionHeader(line: string): SectionKey | null {
  const compact = normalizeCompact(line);
  return ALIAS_LOOKUP[compact] ?? null;
}

function splitSections(lines: string[]) {
  const indices = new Map<SectionKey, number>();

  lines.forEach((line, index) => {
    const section = matchSectionHeader(line);
    if (section && !indices.has(section)) {
      indices.set(section, index);
    }
  });

  const ordered = SECTION_KEYS.filter((section) => indices.has(section)).map(
    (section) => ({
      key: section,
      start: indices.get(section)!,
    }),
  );

  const sections = new Map<SectionKey, string[]>();
  ordered.forEach((entry, index) => {
    const end = ordered[index + 1]?.start ?? lines.length;
    sections.set(entry.key, lines.slice(entry.start + 1, end));
  });

  return { ordered: ordered.map((entry) => entry.key), sections };
}

function parseContactPrimary(line: string) {
  const structured = line.match(/^(.+),\s*(\+[\d\s]+),\s*(\S+@\S+)$/);
  if (structured) {
    return [structured[1].trim(), structured[2].trim(), structured[3].trim()];
  }

  return line
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseContactSecondary(line: string) {
  return line
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseSkillGroups(lines: string[]): CvSkillGroup[] {
  return lines
    .map((line, index) => {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (!match) return null;
      const label = match[1].trim();
      const skills = match[2]
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      return {
        id: slugify(label, index),
        label,
        skills,
      };
    })
    .filter((group): group is CvSkillGroup => Boolean(group));
}

function toHttpsUrl(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes("@")) return `mailto:${trimmed}`;
  if (trimmed.startsWith("+")) return `tel:${trimmed.replace(/[^\d+]/g, "")}`;
  return `https://${trimmed.replace(/^\/\//, "")}`;
}

function parseLiveCodeLine(line: string) {
  const liveMatch = line.match(/Live:\s*([^|]+)/i);
  const codeMatch = line.match(/Code:\s*(.+)$/i);
  const liveLabel = liveMatch?.[1]?.trim();
  const codeLabel = codeMatch?.[1]?.trim();

  return {
    liveUrl: liveLabel ? toHttpsUrl(liveLabel) : undefined,
    githubUrl: codeLabel ? toHttpsUrl(codeLabel) : undefined,
  };
}

function isBulletLine(line: string) {
  return /^[•●\-–—]\s*/.test(line);
}

function stripBullet(line: string) {
  return line.replace(/^[•●\-–—]\s*/, "").trim();
}

function isProjectTitleLine(line: string) {
  return (
    YEAR_PATTERN.test(line) && !isBulletLine(line) && !/^Live:/i.test(line)
  );
}

function parseProjectTitle(line: string) {
  const presentMatch = line.match(/^(.+?)\s+(\d{4}\s*-\s*Present)$/i);
  if (presentMatch) {
    return {
      title: presentMatch[1].trim(),
      year: presentMatch[2].replace(/\s+/g, " "),
    };
  }

  const yearMatch = line.match(/^(.+?)\s+(\d{4})$/);
  if (yearMatch) {
    return { title: yearMatch[1].trim(), year: yearMatch[2] };
  }

  return { title: line.trim(), year: "" };
}

function parseProjects(lines: string[]): CvProjectItem[] {
  const projects: CvProjectItem[] = [];
  let current: CvProjectItem | null = null;
  let pendingBullet = "";

  const flushBullet = () => {
    if (!current || !pendingBullet) return;
    current.highlights.push(pendingBullet.trim());
    pendingBullet = "";
  };

  const pushCurrent = () => {
    flushBullet();
    if (current) projects.push(current);
    current = null;
  };

  for (const line of lines) {
    if (isProjectTitleLine(line)) {
      pushCurrent();
      const { title, year } = parseProjectTitle(line);
      current = {
        id: slugify(title, projects.length),
        title,
        year,
        shortDescription: "",
        highlights: [],
      };
      continue;
    }

    if (!current) continue;

    if (/^Live:/i.test(line)) {
      flushBullet();
      Object.assign(current, parseLiveCodeLine(line));
      continue;
    }

    if (/^Stack:/i.test(line)) {
      flushBullet();
      current.shortDescription = line.replace(/^Stack:\s*/i, "").trim();
      continue;
    }

    if (isBulletLine(line)) {
      flushBullet();
      pendingBullet = stripBullet(line);
      continue;
    }

    if (pendingBullet) {
      pendingBullet = `${pendingBullet} ${line}`.trim();
    }
  }

  pushCurrent();
  return projects;
}

function parseExperience(lines: string[]): CvExperienceItem[] {
  const entries: CvExperienceItem[] = [];
  let current: CvExperienceItem | null = null;
  let pendingBullet = "";

  const flushBullet = () => {
    if (!current || !pendingBullet) return;
    current.description.push(pendingBullet.trim());
    pendingBullet = "";
  };

  const pushCurrent = () => {
    flushBullet();
    if (current) entries.push(current);
    current = null;
  };

  for (const line of lines) {
    const periodMatch = line.match(PERIOD_PATTERN);
    if (periodMatch && !isBulletLine(line)) {
      pushCurrent();
      const headline = line.slice(0, periodMatch.index).trim();
      current = {
        id: slugify(headline, entries.length),
        title: headline,
        organization: "",
        period: periodMatch[1].replace(/\s+/g, " "),
        description: [],
      };
      continue;
    }

    if (!current) continue;

    if (isBulletLine(line)) {
      flushBullet();
      pendingBullet = stripBullet(line);
      continue;
    }

    if (pendingBullet) {
      pendingBullet = `${pendingBullet} ${line}`.trim();
    }
  }

  pushCurrent();
  return entries;
}

function parseEducation(lines: string[]): CvExperienceItem[] {
  return lines.flatMap((line, index) => {
    const periodMatch = line.match(PERIOD_PATTERN);
    if (!periodMatch) return [];
    const headline = line.slice(0, periodMatch.index).trim();
    return [
      {
        id: slugify(headline, index),
        title: headline,
        organization: "",
        period: periodMatch[1].replace(/\s+/g, " "),
        description: [] as string[],
      },
    ];
  });
}

function parseLanguages(line: string): CvLanguageItem[] {
  const content = line.replace(/^Languages:\s*/i, "").trim();
  if (!content) return [];

  return content.split(",").map((part) => {
    const match = part.trim().match(/^(.+?)\s*\((.+)\)$/);
    if (!match) {
      return { name: part.trim(), proficiency: "" };
    }
    return { name: match[1].trim(), proficiency: match[2].trim() };
  });
}

function parseCertifications(lines: string[]): CvCertificationItem[] {
  const joined = lines
    .join(" ")
    .replace(/^Certifications:\s*/i, "")
    .trim();
  if (!joined) return [];

  return joined
    .split(";")
    .map((label, index) => ({
      id: slugify(label, index),
      label: label.trim(),
    }))
    .filter((item) => item.label.length > 0);
}

function parseAdditionalInformation(lines: string[]) {
  const languagesLine = lines.find((line) => /^Languages:/i.test(line));
  const certIndex = lines.findIndex((line) => /^Certifications:/i.test(line));
  const certificationLines =
    certIndex >= 0 ? lines.slice(certIndex) : ([] as string[]);

  return {
    languages: languagesLine ? parseLanguages(languagesLine) : [],
    certifications: parseCertifications(certificationLines),
  };
}

export function parseCvText(rawText: string): {
  data: CvData;
  warnings: string[];
} {
  const warnings: string[] = [];
  const lines = splitLines(rawText);
  const firstSectionIndex = lines.findIndex((line) => matchSectionHeader(line));

  if (firstSectionIndex < 0) {
    throw new CvValidationError(
      `Could not find any recognized section heading in the CV PDF text. ` +
        `Expected one of: ${Object.keys(SECTION_ALIASES).join(", ")}.`,
    );
  }

  const headerLines = lines.slice(0, firstSectionIndex);
  if (headerLines.length < 4) {
    throw new CvValidationError(
      "CV header is incomplete (expected name, role, and contact lines " +
        `before the first section heading, found ${headerLines.length} line(s)).`,
    );
  }

  const [nameLine, roleLine, contactPrimaryLine, contactSecondaryLine] =
    headerLines;
  const summary = headerLines.slice(4).join(" ").trim();

  const { ordered, sections } = splitSections(lines);
  for (const section of SECTION_KEYS) {
    if (!ordered.includes(section)) {
      warnings.push(`Missing section: ${section}`);
    }
  }

  const skillGroups = parseSkillGroups(sections.get("TECHNICAL SKILLS") ?? []);
  const projects = parseProjects(sections.get("PROJECTS") ?? []);
  const experience = parseExperience(
    sections.get("PROFESSIONAL EXPERIENCE") ?? [],
  );
  const education = parseEducation(sections.get("EDUCATION") ?? []);
  const additional = parseAdditionalInformation(
    sections.get("ADDITIONAL INFORMATION") ?? [],
  );

  const contactPrimary = parseContactPrimary(contactPrimaryLine);
  const contactSecondary = parseContactSecondary(contactSecondaryLine);
  const contactBits = [...contactPrimary, ...contactSecondary];

  const identity: CvIdentity = {
    name: nameLine.trim(),
    role: normalizeRole(roleLine),
    headline: "",
    summary,
    contactBits,
    lastUpdatedLabel: null,
  };

  if (!summary) warnings.push("Summary section is empty.");
  if (skillGroups.length === 0)
    warnings.push("No technical skill groups parsed.");
  if (projects.length === 0) warnings.push("No projects parsed.");
  if (experience.length === 0)
    warnings.push("No professional experience parsed.");
  if (education.length === 0) warnings.push("No education entries parsed.");

  const data: CvData = {
    identity,
    experience,
    projects,
    education,
    skillGroups,
    languages: additional.languages,
    certifications: additional.certifications,
  };

  validateCvData(data, rawText);

  return { data, warnings };
}

/**
 * A period/date string is either a recognized "Mon YYYY - Mon YYYY|Present"
 * range (already validated by PERIOD_PATTERN upstream) or a bare year /
 * year range from EDUCATION or PROJECTS. Anything else indicates the
 * upstream regexes matched something that isn't actually a date.
 */
function isPlausibleDateLabel(value: string) {
  if (!value) return false;
  const compact = value.replace(/\s+/g, " ").trim();
  if (PERIOD_PATTERN.test(compact)) return true;
  if (/^\d{4}(\s*-\s*(\d{4}|Present))?$/i.test(compact)) return true;
  return false;
}

/**
 * Fails structural validation with a clear, actionable error rather than
 * allowing an incomplete or garbled CV to reach the generated data file.
 * Only checks fields the /cv page always needs — genuinely optional
 * sections (certifications, languages) stay warning-only in parseCvText.
 */
export function validateCvData(data: CvData, rawText: string): void {
  const problems: string[] = [];

  if (!data.identity.name.trim()) {
    problems.push("Parsed CV has no name (identity.name is empty).");
  }

  if (!data.identity.role.trim()) {
    problems.push("Parsed CV has no role/title (identity.role is empty).");
  }

  if (!data.identity.summary.trim()) {
    problems.push("Parsed CV has no summary text (identity.summary is empty).");
  }

  if (data.identity.contactBits.length === 0) {
    problems.push(
      "Parsed CV has no contact information (email, location, etc.).",
    );
  }

  for (const entry of [...data.experience, ...data.education]) {
    if (entry.period && !isPlausibleDateLabel(entry.period)) {
      problems.push(
        `Entry "${entry.title}" has a malformed date/period: "${entry.period}".`,
      );
    }
  }

  for (const project of data.projects) {
    if (project.year && !isPlausibleDateLabel(project.year)) {
      problems.push(
        `Project "${project.title}" has a malformed year/period: "${project.year}".`,
      );
    }
  }

  // Heuristic guard against catastrophic text loss during PDF extraction
  // (e.g. the parser mis-detected sections and dropped most of the body).
  const rawLength = rawText.replace(/\s+/g, "").length;
  const extractedLength =
    normalizeCompact(data.identity.summary).length +
    data.experience.reduce(
      (sum, entry) => sum + normalizeCompact(entry.description.join("")).length,
      0,
    ) +
    data.projects.reduce(
      (sum, project) =>
        sum + normalizeCompact(project.highlights.join("")).length,
      0,
    );

  if (rawLength > 400 && extractedLength < rawLength * 0.1) {
    problems.push(
      "Extracted CV content is suspiciously small relative to the source " +
        "PDF text (possible large text loss during parsing). " +
        `Raw text: ${rawLength} chars, extracted body text: ${extractedLength} chars.`,
    );
  }

  if (problems.length > 0) {
    throw new CvValidationError(
      `CV PDF parsing produced invalid or incomplete data:\n` +
        problems.map((problem) => `  - ${problem}`).join("\n"),
    );
  }
}
