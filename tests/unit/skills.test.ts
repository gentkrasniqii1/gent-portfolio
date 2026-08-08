import { describe, expect, it } from "vitest";
import { groupSkillsByCategory } from "@/lib/skills";
import type { Skill } from "@/types/skill";

describe("groupSkillsByCategory", () => {
  it("groups skills by category", () => {
    const skills: Skill[] = [
      { name: "TypeScript", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "React", category: "frontend" },
    ];

    const grouped = groupSkillsByCategory(skills);

    expect(grouped.frontend?.map((s) => s.name)).toEqual([
      "TypeScript",
      "React",
    ]);
    expect(grouped.database?.map((s) => s.name)).toEqual(["PostgreSQL"]);
    expect(grouped.backend).toBeUndefined();
  });
});
