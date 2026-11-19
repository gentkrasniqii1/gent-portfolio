"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Server and client always render the same `motion.*` element. Reduced motion
 * is handled globally by `MotionProvider` (`reducedMotion="user"`), so there is
 * no markup branch that could cause a hydration mismatch.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealTag = "div" | "section" | "li" | "article";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  "aria-labelledby"?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  "aria-labelledby": ariaLabelledBy,
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      aria-labelledby={ariaLabelledBy}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}

/**
 * True once the app has hydrated. The first page is rendered without an
 * entrance animation so its content (and LCP) never waits on JavaScript.
 */
let hasHydrated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const animateIn = hasHydrated;

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type MotionCardProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLMotionProps<"article">, "children" | "className">;

export function MotionCard({ className, children, ...props }: MotionCardProps) {
  return (
    <motion.article
      className={cn(className)}
      whileHover={{ y: -4, boxShadow: "var(--shadow-hover)" }}
      whileFocus={{ y: -4, boxShadow: "var(--shadow-hover)" }}
      initial={{ boxShadow: "var(--shadow-xs)" }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
