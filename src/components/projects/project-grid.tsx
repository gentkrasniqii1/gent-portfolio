"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectGridProps = {
  projects: Project[];
  className?: string;
  emptyMessage?: string;
  titleAs?: "h2" | "h3";
  /** Number of leading cards whose images load eagerly (above the fold). */
  eagerCount?: number;
};

export function ProjectGrid({
  projects,
  className,
  emptyMessage = "No projects to show yet.",
  titleAs = "h3",
  eagerCount = 0,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
        {emptyMessage}
      </p>
    );
  }

  return (
    <Stagger
      as="ul"
      className={cn(
        "grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2",
        className,
      )}
    >
      {projects.map((project, index) => (
        <StaggerItem key={project.id} as="li" className="h-full">
          <ProjectCard
            project={project}
            titleAs={titleAs}
            imageLoading={index < eagerCount ? "eager" : "lazy"}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
