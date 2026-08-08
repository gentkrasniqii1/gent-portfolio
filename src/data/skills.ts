import type { Skill } from "@/types/skill";

/** Skills list — populate with real skills only. */
export const skills: Skill[] = [
  { name: "React.js", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Web Design", category: "frontend" },
  { name: "Laravel", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "API Integration", category: "backend" },
  { name: "MySQL", category: "database" },
  { name: "Database Management", category: "database" },
  { name: "Git", category: "tools" },
  { name: "WordPress", category: "tools" },
];

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((skill) => skill.category === category);
}
