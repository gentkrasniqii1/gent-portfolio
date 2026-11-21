import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  fullstack: "Full-Stack",
  web: "Web",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  devops: "DevOps",
  other: "Other",
};

export const PROJECT_STATUS_LABELS: Record<Project["status"], string> = {
  live: "Live",
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
};

/** Subtle status differentiation — accent for live/active work, neutral otherwise. */
export const PROJECT_STATUS_STYLES: Record<Project["status"], string> = {
  live: "bg-accent/10 text-accent",
  completed: "bg-muted text-muted-foreground",
  "in-progress": "bg-accent/10 text-accent",
  archived: "bg-muted text-muted-foreground",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "Mar 2026" when the month is known, otherwise just "2026". */
export function formatProjectDate(project: Pick<Project, "year" | "month">) {
  const month = project.month ? MONTHS[project.month - 1] : undefined;
  return month ? `${month} ${project.year}` : String(project.year);
}

/** Newest first (year, then month), then by featured order, then title. */
export function sortProjectsByYear(items: Project[]): Project[] {
  return [...items].sort(
    (a, b) =>
      b.year - a.year ||
      (b.month ?? 0) - (a.month ?? 0) ||
      (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity) ||
      a.title.localeCompare(b.title),
  );
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity) ||
        b.year - a.year,
    );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getProjects(category?: ProjectCategory): Project[] {
  const filtered = category
    ? projects.filter((project) => project.category === category)
    : projects;
  return sortProjectsByYear(filtered);
}

/** The project after this one in the main listing order (wraps around). */
export function getNextProject(slug: string): Project | undefined {
  const ordered = getProjects();
  if (ordered.length < 2) return undefined;
  const index = ordered.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return ordered[(index + 1) % ordered.length];
}

/** Categories in use, in the order they appear in the category labels. */
export function getUsedCategories(): ProjectCategory[] {
  const used = new Set(projects.map((project) => project.category));
  return (Object.keys(PROJECT_CATEGORY_LABELS) as ProjectCategory[]).filter(
    (category) => used.has(category),
  );
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return value in PROJECT_CATEGORY_LABELS;
}
