"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} aria-labelledby={ariaLabelledBy}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      className={className}
      aria-labelledby={ariaLabelledBy}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

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
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <article className={className} {...(props as ComponentProps<"article">)}>
        {children}
      </article>
    );
  }

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
