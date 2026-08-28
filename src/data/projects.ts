import type { Project } from "@/types/project";

/**
 * Portfolio projects — add a new object here to show it in the UI.
 * Assets: `public/images/projects/`.
 */
export const projects: Project[] = [
  {
    id: "skillmatch",
    slug: "skillmatch",
    title: "SkillMatch",
    cvFullTitle: "SkillMatch - AI-Powered Job Matching & Recruitment Platform",
    shortDescription:
      "AI-powered recruitment platform that matches candidates to jobs by skills, with scheduling, notifications, and employer pipeline tools.",
    description:
      "Architected a full-stack recruitment platform matching candidates to jobs by skill, with employer applicant pipelines, interview scheduling, and real-time notifications. Implemented secure JWT authentication with email verification, 2FA, and Google/LinkedIn OAuth, plus role-based candidate/employer/admin dashboards. Integrated Google Calendar/Zoom for auto-generated meeting links and Resend for transactional email delivery.",
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
    githubUrl: "https://github.com/gentkrasniqii1",
    featured: true,
    year: 2026,
    status: "completed",
    cvHighlights: [
      "Architected a full-stack recruitment platform matching candidates to jobs by skill, with employer applicant pipelines, interview scheduling, and real-time notifications",
      "Built with React 18, Vite, Tailwind CSS, Node.js/Express, MongoDB, and Socket.IO for real-time chat and live updates",
      "Implemented secure JWT authentication with email verification, 2FA, and Google/LinkedIn OAuth, plus role-based candidate/employer/admin dashboards",
      "Integrated Google Calendar/Zoom for auto-generated meeting links and Resend for transactional email delivery",
    ],
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
  {
    id: "prizren-smart-city",
    slug: "prizren-smart-city",
    title: "Prizren Smart City",
    cvFullTitle:
      "Prizren Smart City - AI-Powered Civic Issue Reporting Platform",
    shortDescription:
      "AI-powered civic issue reporting platform for citizens to report municipal issues with photo upload, geolocation, and an interactive live map.",
    description:
      "Building a citizen platform for reporting municipal issues (roads, lighting, waste) with photo upload, geolocation, and an interactive live map of reports. Implementing AI-powered issue classification (category + severity) using Claude Vision API. Developing an admin dashboard for municipal departments to filter, manage, and resolve citizen reports.",
    category: "fullstack",
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "PostGIS",
      "Prisma",
    ],
    image: "/images/projects/prizren-smart-city/cover.png",
    gallery: [],
    liveUrl: "https://www.prizrensmartcity.com/",
    githubUrl: "https://github.com/gentkrasniqii1/prizren-smart-city",
    featured: true,
    year: 2026,
    status: "completed",
    cvHighlights: [
      "Built a citizen reporting platform for municipal issues (roads, lighting, waste) featuring photo upload, GPS geolocation, and an interactive live map with clustering",
      "Implemented AI-powered issue classification (category, severity, confidence scoring) using Claude Vision API, with admin review and override",
      "Designed an admin-configurable institution-routing engine assigning reports to departments based on category, priority, and SLA rules",
      "Implemented secure JWT authentication with refresh tokens, Google/Facebook OAuth, 2FA, and email verification via Resend",
    ],
    cvStack: "Next.js, TypeScript, NestJS, PostgreSQL/PostGIS, Prisma",
    role: "Frontend Developer",
    architecture: [],
    challenges: [],
    solutions: [],
    results: [],
  },
];
