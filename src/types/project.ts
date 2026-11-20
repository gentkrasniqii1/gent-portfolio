export type ProjectStatus = "live" | "completed" | "in-progress" | "archived";

export type ProjectCategory =
  "fullstack" | "web" | "frontend" | "backend" | "mobile" | "devops" | "other";

/** Icon keys for the case-study feature grid (mapped to icons in the UI). */
export type ProjectFeatureIcon =
  | "ai"
  | "auth"
  | "calendar"
  | "chat"
  | "cookie"
  | "form"
  | "globe"
  | "languages"
  | "layers"
  | "map"
  | "pricing"
  | "route"
  | "shield"
  | "timeline"
  | "upload"
  | "users";

export interface ProjectFeature {
  title: string;
  description: string;
  icon: ProjectFeatureIcon;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  device: "desktop" | "mobile";
  width: number;
  height: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Longer title for the case-study hero, e.g. "Velnora — Digital agency website". */
  headline?: string;
  shortDescription: string;
  /** Overview / problem statement for the case study. */
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  /** Describes what the cover image actually shows. */
  imageAlt: string;
  gallery: ProjectScreenshot[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  /** Lower numbers come first among featured projects. */
  featuredOrder?: number;
  year: number;
  /** 1–12; shown as "Mar 2026" when set, otherwise only the year. */
  month?: number;
  status: ProjectStatus;
  role: string;
  responsibilities: string[];
  /** One factual line shown on project cards. */
  outcome: string;
  features: ProjectFeature[];
  architecture: string[];
  challenges: ProjectChallenge[];
  results: string[];
  /** Optional resume-only bullet highlights for the CV page */
  cvHighlights?: string[];
  /** Full project title for CV/PDF (short `title` stays for portfolio UI). */
  cvFullTitle?: string;
  /** Optional stack line shown on the CV PDF only. */
  cvStack?: string;
}
