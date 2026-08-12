import type { Skill } from "@/types/skill";

/** Skills list — populate with real skills only. */
export const skills: Skill[] = [
  { name: "React.js", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Web Design", category: "frontend" },
  { name: "Laravel", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "API Integration", category: "backend" },
  { name: "MySQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "Prisma ORM", category: "database" },
  { name: "Database Management", category: "database" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "Render", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Postman", category: "tools" },
  { name: "WordPress", category: "tools" },
  { name: "Agile/Scrum", category: "practices" },
  { name: "Clean Code", category: "practices" },
  { name: "Cursor", category: "ai" },
  { name: "GitHub Copilot", category: "ai" },
  { name: "Claude", category: "ai" },
];

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((skill) => skill.category === category);
}
