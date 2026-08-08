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
  challenges: string[];
  solutions: string[];
  results: string[];
  architecture: string[];
  role: string;
}
