export interface Profile {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location?: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  /** ISO date string, e.g. "2026-08-01" */
  cvLastUpdated: string;
  availableForWork: boolean;
}
