export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** ISO date or year string, e.g. "2025-06" or "2025" */
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}
