export interface SpokenLanguage {
  name: string;
  proficiency: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
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
