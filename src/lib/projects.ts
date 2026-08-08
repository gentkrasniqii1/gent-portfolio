import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  fullstack: "Full-Stack",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  devops: "DevOps",
  other: "Other",
};

export const PROJECT_STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
};

export function sortProjectsByYear(items: Project[]): Project[] {
  return [...items].sort(
    (a, b) => b.year - a.year || a.title.localeCompare(b.title),
  );
}

export function getFeaturedProjects(): Project[] {
  return sortProjectsByYear(projects.filter((project) => project.featured));
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

export function getUsedCategories(): ProjectCategory[] {
  return Array.from(new Set(projects.map((project) => project.category)));
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return value in PROJECT_CATEGORY_LABELS;
}
