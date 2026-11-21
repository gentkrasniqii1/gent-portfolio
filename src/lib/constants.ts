/**
 * Site-wide constants.
 */

export const SITE_NAME = "Gent Krasniqi";

export const SITE_DESCRIPTION =
  "Portfolio of Gent Krasniqi, a frontend-focused full-stack developer building production web apps with Next.js, React, TypeScript, NestJS, Node.js, and PostgreSQL.";

/**
 * Canonical origin for metadata, the sitemap and JSON-LD. Falls back to the
 * production domain Vercel exposes at build time, so absolute URLs stay
 * correct even if NEXT_PUBLIC_SITE_URL is not set.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SOCIAL_LINKS = {
  github: "https://github.com/gentkrasniqii1",
  linkedin: "https://www.linkedin.com/in/gent-krasniqi-19736a355",
  /** Public address shown on the site. Messages from the contact form go to
   * CONTACT_TO_EMAIL (server-side only) instead. */
  email: "hello@gentkrasniqi.dev",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;
