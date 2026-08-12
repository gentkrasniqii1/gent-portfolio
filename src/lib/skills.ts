import type { Skill, SkillCategory } from "@/types/skill";

export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "devops",
  "tools",
  "practices",
  "ai",
];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  devops: "DevOps & tooling",
  tools: "Tools",
  practices: "Practices",
  ai: "AI-Assisted Development",
};

export function groupSkillsByCategory(
  skills: Skill[],
): Partial<Record<SkillCategory, Skill[]>> {
  return skills.reduce<Partial<Record<SkillCategory, Skill[]>>>(
    (acc, skill) => {
      const bucket = acc[skill.category] ?? [];
      bucket.push(skill);
      acc[skill.category] = bucket;
      return acc;
    },
    {},
  );
}
