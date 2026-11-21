import { SOCIAL_LINKS } from "@/lib/constants";
import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Gent Krasniqi",
  role: "Full-Stack Developer (Frontend-focused)",
  shortRole: "Full-Stack Developer",
  headline:
    "Frontend-focused full-stack developer building production web apps with Next.js, React, TypeScript, NestJS, Node.js, and PostgreSQL.",
  tagline:
    "I design and ship production web apps — from civic-tech platforms to recruitment SaaS.",
  coreStack: [
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Node.js",
    "PostgreSQL",
  ],
  availability: {
    label: "Open to frontend/full-stack roles",
    detail: "Remote or Kosovo",
  },
  summary:
    "I'm a frontend-focused full-stack developer who designs and ships production web apps. My live work includes Velnora, a bilingual website for a Kosovo digital agency; Prizren Smart City, a civic platform where citizens report municipal issues that are classified by AI and routed to the right department; and SkillMatch, a recruitment platform with real-time chat and interview scheduling. I work across Next.js, React, TypeScript, NestJS, Node.js and PostgreSQL, completed a 6-month professional React.js internship, and study Computer Science and Engineering at UBT.",
  location: "Prizren, Kosovë",
  phone: "+383 49 168 682",
  email: SOCIAL_LINKS.email,
  github: "https://github.com/gentkrasniqii1",
  linkedin: "https://www.linkedin.com/in/gent-krasniqi-19736a355",
  portfolioUrl: "https://gent-portfolio.vercel.app",
  cvPath: "/documents/cv.pdf",
  cvLastUpdated: "[YOUR CV LAST UPDATED]",
  availableForWork: true,
  languages: [
    { name: "Albanian", proficiency: "Native" },
    { name: "English", proficiency: "Professional" },
  ],
};
