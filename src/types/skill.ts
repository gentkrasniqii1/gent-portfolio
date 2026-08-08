export type SkillCategory =
  "frontend" | "backend" | "database" | "devops" | "ai" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Optional relative proficiency 1–5 for future visualization */
  level?: 1 | 2 | 3 | 4 | 5;
}
