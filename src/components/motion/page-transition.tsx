"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * True once the app has hydrated. The first page a visitor lands on renders
 * without this transition, so its content (and LCP) never waits; later
 * client-side navigations remount the template and play a CSS fade-and-rise.
 */
let hasHydrated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const animateIn = hasHydrated;

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        animateIn && "motion-safe:animate-page-enter",
      )}
    >
      {children}
    </div>
  );
}
