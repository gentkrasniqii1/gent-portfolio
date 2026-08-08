import type { ReactNode } from "react";

type ProjectSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function ProjectSection({ id, title, children }: ProjectSectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="text-foreground text-2xl">
        {title}
      </h2>
      {children}
    </section>
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
