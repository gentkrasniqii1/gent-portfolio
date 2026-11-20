import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

type CaseStudySectionProps = {
  id: string;
  /** Position among the sections shown, rendered as "01", "02"… */
  index: number;
  title: string;
  children: ReactNode;
};

export function CaseStudySection({
  id,
  index,
  title,
  children,
}: CaseStudySectionProps) {
  const headingId = `${id}-heading`;

  return (
    <Reveal
      as="section"
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-24"
    >
      <p
        aria-hidden
        className="text-accent font-mono text-xs tracking-[0.18em] uppercase"
      >
        {String(index).padStart(2, "0")}
      </p>
      <h2
        id={headingId}
        className="font-display text-foreground mt-2 text-3xl tracking-tight md:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}
