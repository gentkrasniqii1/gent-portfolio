import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Milliseconds before this element starts, used to stagger siblings. */
  delay?: number;
  /** "rise" fades up; "scale" fades in from slightly smaller. */
  variant?: "rise" | "scale";
  as?: "div" | "span" | "li";
};

/**
 * Entrance animation for above-the-fold content.
 *
 * Pure CSS keyframes (no client JavaScript), so the content paints with the
 * first frame instead of waiting for hydration and never delays LCP. With
 * reduced motion the `motion-safe:` variant drops the animation entirely.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  variant = "rise",
  as: Tag = "div",
}: FadeInProps) {
  return (
    <Tag
      className={cn(
        variant === "scale"
          ? "motion-safe:animate-enter-scale"
          : "motion-safe:animate-enter",
        className,
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
