/**
 * Site-wide constants.
 */

export const SITE_NAME = "Gent Krasniqi";

export const SITE_DESCRIPTION =
  "Frontend / Full Stack Developer portfolio — projects, skills, and contact.";

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
