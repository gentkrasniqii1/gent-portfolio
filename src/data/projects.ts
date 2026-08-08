import type { Project } from "@/types/project";

/**
 * Portfolio projects — add a new object here to show it in the UI.
 * Assets: `public/images/projects/`.
 *
 * Example shape (replace with real details when ready — do not invent):
 * {
 *   id: "1",
 *   slug: "example-app",
 *   title: "Example App",
 *   shortDescription: "One-line summary.",
 *   description: "Longer overview.",
 *   category: "fullstack",
 *   technologies: ["Next.js", "TypeScript"],
 *   image: "/images/projects/example-app/cover.jpg",
 *   gallery: [],
 *   liveUrl: "https://…",
 *   githubUrl: "https://github.com/…",
 *   featured: true,
 *   year: 2026,
 *   status: "completed",
 *   challenges: [],
 *   solutions: [],
 *   results: [],
 *   architecture: [],
 *   role: "Full-Stack Developer",
 * }
 */
export const projects: Project[] = [
  {
    id: "skillmatch",
    slug: "skillmatch",
    title: "SkillMatch",
    shortDescription:
      "AI-powered recruitment platform that matches candidates to jobs by skills, with scheduling, notifications, and employer pipeline tools.",
    description:
      "SkillMatch is a full-stack recruitment platform connecting candidates and employers through skill-based job matching. It includes ranked match scoring, job discovery with filters and alerts, a complete applications pipeline, interview scheduling with auto-generated Google Meet/Zoom links, real-time notifications, in-app messaging, and role-based dashboards for candidates, employers, and admins.",
    category: "fullstack",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
      "Stripe",
      "i18next",
    ],
    image: "/images/projects/skillmatch/cover.png",
    gallery: [],
    liveUrl: "https://www.skillmatchapp.com/",
    featured: true,
    year: 2026,
    status: "completed",
    role: "Full-Stack Developer",
    architecture: [
      "MVC + feature-module Express API (config, controllers, middleware, models, modules, routes, validators, services) paired with a separate React + Vite SPA frontend. Dockerized with multi-stage builds — nginx serving the built frontend, Node running the production API.",
    ],
    challenges: [
      "Building real-time interview scheduling with auto-generated Google Meet and Zoom links when no manual link is provided",
      "Securing authentication across multiple methods (JWT, TOTP 2FA, Google/LinkedIn OAuth) without compromising UX",
      "Delivering real-time notifications and in-app chat at scale via Socket.IO",
      "Supporting a fully bilingual (English/Albanian) interface across candidate, employer, and admin experiences",
    ],
    solutions: [
      "Integrated Google Calendar API and Zoom Server-to-Server OAuth to auto-generate meeting links when the manual field is left blank",
      "Combined JWT sessions, TOTP-based 2FA, and Passport OAuth strategies behind a unified auth layer with bcrypt hashing and Helmet security headers",
      "Used Socket.IO for a live notification feed and messaging system decoupled from the REST API",
      "Implemented i18next for a bilingual UI shared consistently across all three dashboard roles",
    ],
    results: [],
  },
];
