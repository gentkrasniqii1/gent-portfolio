import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectGridProps = {
  projects: Project[];
  className?: string;
  emptyMessage?: string;
  titleAs?: "h2" | "h3";
  /** Number of leading cards whose images load eagerly (above the fold). */
  eagerCount?: number;
  /**
   * "scroll" staggers the cards in when the grid scrolls into view (below the
   * fold). "load" plays a CSS entrance straight away, for grids at the top of
   * a page whose first images are LCP candidates.
   */
  reveal?: "scroll" | "load";
  /** Give the first project a full-width, side-by-side card. */
  leadFirst?: boolean;
};

const GRID_CLASSES = "grid gap-6 sm:grid-cols-2";

export function ProjectGrid({
  projects,
  className,
  emptyMessage = "No projects to show yet.",
  titleAs = "h3",
  eagerCount = 0,
  reveal = "scroll",
  leadFirst = false,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
        {emptyMessage}
      </p>
    );
  }

  const cards = projects.map((project, index) => {
    const lead = leadFirst && index === 0 && projects.length > 1;
    return {
      key: project.id,
      itemClassName: cn("h-full", lead && "sm:col-span-2"),
      card: (
        <ProjectCard
          project={project}
          titleAs={titleAs}
          imageLoading={index < eagerCount ? "eager" : "lazy"}
          layout={lead ? "wide" : "stacked"}
        />
      ),
    };
  });

  if (reveal === "load") {
    return (
      <ul className={cn(GRID_CLASSES, className)}>
        {cards.map(({ key, card, itemClassName }, index) => (
          <FadeIn
            key={key}
            as="li"
            delay={120 + index * 70}
            className={itemClassName}
          >
            {card}
          </FadeIn>
        ))}
      </ul>
    );
  }

  return (
    <StaggerChildren as="ul" className={cn(GRID_CLASSES, className)}>
      {cards.map(({ key, card, itemClassName }) => (
        <StaggerItem key={key} as="li" className={itemClassName}>
          {card}
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
