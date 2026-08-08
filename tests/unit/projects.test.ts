import { describe, expect, it } from "vitest";
import { isProjectCategory, sortProjectsByYear } from "@/lib/projects";
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
    gallery: [],
    featured: false,
    status: "completed",
    challenges: [],
    solutions: [],
    results: [],
    architecture: [],
    role: "Full-Stack Developer",
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

  it("validates category values", () => {
    expect(isProjectCategory("frontend")).toBe(true);
    expect(isProjectCategory("not-real")).toBe(false);
  });
});
