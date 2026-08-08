/**
 * Analytics wiring lives in the root layout via:
 * - `@vercel/analytics` (page views)
 * - `@vercel/speed-insights` (Core Web Vitals)
 *
 * Both activate automatically on Vercel production deployments.
 * No API keys are required in client env for the default setup.
 */

export const ANALYTICS = {
  enabled: process.env.NODE_ENV === "production",
} as const;
