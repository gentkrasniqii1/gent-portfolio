export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** ISO date or year string, e.g. "2025-06" or "2025" */
  date: string;
  /** Optional certificate scan/thumbnail under /public */
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
  /** Label used on the CV PDF (falls back to name — issuer). */
  cvLabel?: string;
}
