export interface Experience {
  id: string;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string | "present";
  description: string[];
  technologies?: string[];
  /** When false, entry is omitted from the generated CV PDF. */
  includeInCvPdf?: boolean;
  type: "work" | "education" | "freelance" | "volunteer";
}
