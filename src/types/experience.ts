export interface Experience {
  id: string;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string | "present";
  description: string[];
  technologies?: string[];
  type: "work" | "education" | "freelance" | "volunteer";
}
