import { describe, expect, it } from "vitest";
import {
  formatProjectDate,
  getFeaturedProjects,
  getNextProject,
  getProjects,
  isProjectCategory,
  sortProjectsByYear,
} from "@/lib/projects";
import type { Project } from "@/types/project";

function makeProject(
  partial: Partial<Project> & Pick<Project, "id" | "slug" | "title" | "year">,
): Project {
  return {
    shortDescription: "",
    description: "",
    category: "fullstack",
    technologies: [],
    image: "",
    imageAlt: "",
    gallery: [],
    featured: false,
    status: "completed",
    role: "Full-Stack Developer",
    responsibilities: [],
    outcome: "",
    features: [],
    architecture: [],
    challenges: [],
    results: [],
    ...partial,
  };
}

describe("project helpers", () => {
  it("sorts projects by year descending", () => {
    const sorted = sortProjectsByYear([
      makeProject({ id: "1", slug: "a", title: "A", year: 2022 }),
      makeProject({ id: "2", slug: "b", title: "B", year: 2025 }),
      makeProject({ id: "3", slug: "c", title: "C", year: 2024 }),
    ]);

    expect(sorted.map((p) => p.year)).toEqual([2025, 2024, 2022]);
  });

  it("sorts by month within a year, then by featured order", () => {
    const sorted = sortProjectsByYear([
      makeProject({ id: "1", slug: "a", title: "A", year: 2026, month: 2 }),
      makeProject({ id: "2", slug: "b", title: "B", year: 2026, month: 9 }),
      makeProject({
        id: "3",
        slug: "c",
        title: "C",
        year: 2026,
        featuredOrder: 2,
      }),
      makeProject({
        id: "4",
        slug: "d",
        title: "D",
        year: 2026,
        featuredOrder: 1,
      }),
    ]);

    expect(sorted.map((p) => p.slug)).toEqual(["b", "a", "d", "c"]);
  });

  it("validates category values", () => {
    expect(isProjectCategory("frontend")).toBe(true);
    expect(isProjectCategory("web")).toBe(true);
    expect(isProjectCategory("not-real")).toBe(false);
  });

  it("formats the project date with an optional month", () => {
    expect(formatProjectDate({ year: 2026, month: 3 })).toBe("Mar 2026");
    expect(formatProjectDate({ year: 2026 })).toBe("2026");
  });

  it("lists Velnora first among featured projects", () => {
    expect(getFeaturedProjects()[0]?.slug).toBe("velnora");
  });

  it("links every project to a different next project", () => {
    for (const project of getProjects()) {
      const next = getNextProject(project.slug);
      expect(next).toBeDefined();
      expect(next?.slug).not.toBe(project.slug);
    }
  });
});
