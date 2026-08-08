/**
 * Design system companion config (Tailwind CSS v4).
 *
 * Source of truth for colors, type, radius, and shadows:
 *   `src/app/globals.css` → `:root` / `.dark` + `@theme inline`
 *
 * Components must use semantic utilities only, e.g.:
 *   bg-background, text-foreground, text-primary, bg-accent,
 *   font-sans, font-display, rounded-md, shadow-sm
 *
 * Do not put ad-hoc hex colors in components.
 *
 * @type {import("tailwindcss").Config}
 */
const config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-xs)",
        md: "var(--shadow-s)",
        lg: "var(--shadow-l)",
      },
      spacing: {
        section: "var(--spacing-section)",
        "section-lg": "var(--spacing-section-lg)",
        gutter: "var(--spacing-gutter)",
        "gutter-lg": "var(--spacing-gutter-lg)",
      },
    },
  },
};

export default config;
