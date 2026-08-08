import type { Skill } from "@/types/skill";

/** Skills list — populate with real skills only. */
export const skills: Skill[] = [];

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((skill) => skill.category === category);
}
