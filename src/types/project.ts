export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectCategory =
  "fullstack" | "frontend" | "backend" | "mobile" | "devops" | "other";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  status: ProjectStatus;
  /** Optional resume-only bullet highlights for the CV page */
  cvHighlights?: string[];
  /** Full project title for CV/PDF (short `title` stays for portfolio UI). */
  cvFullTitle?: string;
  /** Optional stack line shown on the CV PDF only. */
  cvStack?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  architecture: string[];
  role: string;
}
