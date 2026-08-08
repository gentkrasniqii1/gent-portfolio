/**
 * Site-wide constants. Personal values use [YOUR X] placeholders until provided.
 */

export const SITE_NAME = "[YOUR NAME]";

export const SITE_DESCRIPTION =
  "Professional full-stack developer portfolio — projects, skills, and contact.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SOCIAL_LINKS = {
  github: "[YOUR GITHUB]",
  linkedin: "[YOUR LINKEDIN]",
  email: "[YOUR EMAIL]",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
