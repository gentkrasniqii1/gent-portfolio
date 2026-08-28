import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/motion";

type ProjectSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function ProjectSection({ id, title, children }: ProjectSectionProps) {
  return (
    <Reveal as="section" className="space-y-4" aria-labelledby={id}>
      <h2
        id={id}
        className="font-display text-foreground text-2xl tracking-tight"
      >
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

type ProjectListSectionProps = {
  id: string;
  title: string;
  items: string[];
};

export function ProjectListSection({
  id,
  title,
  items,
}: ProjectListSectionProps) {
  if (items.length === 0) return null;

  return (
    <ProjectSection id={id} title={title}>
      <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-base leading-relaxed">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ProjectSection>
  );
}
