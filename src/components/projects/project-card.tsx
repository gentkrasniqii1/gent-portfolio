import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleCheck } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { TechBadge } from "@/components/shared/tech-badge";
import {
  formatProjectDate,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_STYLES,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  className?: string;
  titleAs?: "h2" | "h3";
  /** Use "eager" for cards that render above the fold. */
  imageLoading?: "eager" | "lazy";
  /** "wide" puts the image beside the text from `lg` up (a lead project). */
  layout?: "stacked" | "wide";
};

const MAX_BADGES = 4;

/**
 * Whole-card link to the case study (a stretched link on the title), with
 * separate Live / GitHub links layered above it.
 *
 * Hover and keyboard focus lift the card, zoom the image and fade in a deeper
 * shadow and an accent edge. Every effect animates transform or opacity only;
 * with reduced motion only the opacity fades remain.
 */
export function ProjectCard({
  project,
  className,
  titleAs: TitleTag = "h3",
  imageLoading = "lazy",
  layout = "stacked",
}: ProjectCardProps) {
  const wide = layout === "wide";
  const href = `/projects/${project.slug}`;
  const extraBadges = project.technologies.length - MAX_BADGES;

  return (
    <article
      className={cn(
        "group/card border-border bg-card relative isolate flex h-full flex-col rounded-xl border shadow-sm",
        "motion-safe:ease-out-expo motion-safe:transition-transform motion-safe:duration-500",
        "motion-safe:hover:-translate-y-1 motion-safe:has-[a:focus-visible]:-translate-y-1",
        wide && "lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
        className,
      )}
    >
      {/* Deeper shadow and accent edge, faded in rather than animated. */}
      <span
        aria-hidden
        className="shadow-hover pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-has-[a:focus-visible]/card:opacity-100"
      />
      <span
        aria-hidden
        className="border-accent/45 pointer-events-none absolute -inset-px z-20 rounded-[inherit] border opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />

      <div
        className={cn(
          "bg-muted relative aspect-[16/10] overflow-hidden rounded-t-[calc(var(--radius-xl)-1px)]",
          wide &&
            "lg:aspect-auto lg:h-full lg:min-h-80 lg:rounded-tr-none lg:rounded-l-[calc(var(--radius-xl)-1px)]",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            loading={imageLoading}
            className="motion-safe:ease-out-expo object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover/card:scale-[1.04]"
            sizes={
              wide
                ? "(min-width: 1024px) 540px, (min-width: 640px) 90vw, 100vw"
                : "(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
            }
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center px-4 text-center font-mono text-xs tracking-widest uppercase">
            {project.title}
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-5 sm:p-6",
          wide && "lg:p-8",
        )}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-mono tracking-widest uppercase">
            {formatProjectDate(project)}
          </span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span className="text-muted-foreground">
            {PROJECT_CATEGORY_LABELS[project.category]}
          </span>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 font-medium",
              PROJECT_STATUS_STYLES[project.status],
            )}
          >
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className="space-y-1.5">
          <TitleTag className="font-display text-foreground text-2xl tracking-tight break-words">
            <Link
              href={href}
              aria-label={`${project.title} case study`}
              className={cn(
                "group-hover/card:text-primary transition-colors",
                // Stretch the link over the whole card.
                "after:absolute after:inset-0 after:z-0 after:rounded-xl after:content-['']",
                // Draw the focus ring around the card instead of the title.
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background",
              )}
            >
              {project.title}
            </Link>
          </TitleTag>
          <p className="text-muted-foreground text-sm">
            <span className="sr-only">Role: </span>
            {project.role}
          </p>
        </div>

        <p className="text-foreground/80 line-clamp-3 max-w-prose text-sm leading-relaxed">
          {project.shortDescription}
        </p>

        {project.outcome ? (
          <p className="text-foreground flex gap-2 text-sm leading-snug font-medium">
            <CircleCheck
              className="text-accent mt-px size-4 shrink-0"
              aria-hidden
            />
            <span>
              <span className="sr-only">Outcome: </span>
              {project.outcome}
            </span>
          </p>
        ) : null}

        {project.technologies.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.slice(0, MAX_BADGES).map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
            {extraBadges > 0 ? (
              <li>
                <TechBadge className="bg-transparent text-muted-foreground">
                  +{extraBadges}
                </TechBadge>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="border-border mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t pt-2">
          <span
            aria-hidden
            className="text-foreground inline-flex min-h-11 items-center gap-1.5 text-sm font-medium"
          >
            Case study
            <ArrowRight className="motion-safe:ease-out-expo size-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/card:translate-x-1" />
          </span>

          <div className="relative z-10 flex items-center gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/live text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center gap-1 text-sm transition-colors"
              >
                Live
                <ArrowUpRight
                  className="size-3.5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/live:translate-x-0.5 motion-safe:group-hover/live:-translate-y-0.5"
                  aria-hidden
                />
                <span className="sr-only">
                  {" "}
                  site for {project.title} (opens in a new tab)
                </span>
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 text-sm transition-colors"
              >
                <GitHubIcon className="size-3.5" />
                Code
                <span className="sr-only">
                  {" "}
                  for {project.title} on GitHub (opens in a new tab)
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
