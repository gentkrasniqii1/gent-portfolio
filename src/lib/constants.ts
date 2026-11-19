/**
 * Site-wide constants.
 */

export const SITE_NAME = "Gent Krasniqi";

export const SITE_DESCRIPTION =
  "Portfolio of Gent Krasniqi, a frontend-focused full-stack developer building production web apps with Next.js, React, TypeScript, NestJS, Node.js, and PostgreSQL.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SOCIAL_LINKS = {
  github: "https://github.com/gentkrasniqii1",
  linkedin: "https://www.linkedin.com/in/gent-krasniqi-19736a355",
  email: "gentkrass21@gmail.com",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
