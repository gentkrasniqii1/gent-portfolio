/**
 * Tailwind CSS v4 uses CSS-first configuration via `@theme` in `src/app/globals.css`.
 * Design tokens (colors, typography, spacing, radius, shadows) will be defined there
 * in Phase 2 (light-editorial direction). Keep this file for any future JS plugins
 * or content scanning options — do not put ad-hoc component colors here.
 *
 * @type {import("tailwindcss").Config}
 */
const config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
};

export default config;
