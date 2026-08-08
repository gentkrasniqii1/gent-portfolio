import type { Project } from "@/types/project";

/**
 * Portfolio projects — add new entries here; UI reads this array.
 * Do not invent project details. Replace the placeholder when ready.
 */
export const projects: Project[] = [];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
