export interface SpokenLanguage {
  name: string;
  proficiency: string;
}

export interface Availability {
  /** e.g. "Open to frontend/full-stack roles" */
  label: string;
  /** e.g. "Remote or Kosovo" */
  detail: string;
}

export interface Profile {
  name: string;
  role: string;
  /** Role without the qualifier, for compact labels such as the hero eyebrow. */
  shortRole: string;
  headline: string;
  /** One-line value proposition shown under the name in the hero. */
  tagline: string;
  /** Core stack named in the hero, in display order. */
  coreStack: string[];
  /** Shown next to the status dot while `availableForWork` is true. */
  availability: Availability;
  summary: string;
  location?: string;
  phone?: string;
  email: string;
  github: string;
  linkedin: string;
  /** Public portfolio URL for CV/resume links (not derived from env). */
  portfolioUrl: string;
  cvPath: string;
  /** ISO date string, e.g. "2026-08-01" */
  cvLastUpdated: string;
  availableForWork: boolean;
  /** Spoken languages (not programming skills) */
  languages?: SpokenLanguage[];
}
