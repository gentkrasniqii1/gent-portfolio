import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { ButtonLink } from "@/components/shared/button-link";
import { GitHubIcon } from "@/components/shared/icons";
import { TechBadge } from "@/components/shared/tech-badge";
import {
  formatProjectDate,
  PROJECT_CATEGORY_LABELS,
  PROJECT_STATUS_LABELS,
} from "@/lib/projects";
import type { Project } from "@/types/project";

type ProjectHeaderProps = {
  project: Project;
};

/** Case-study hero: title, one-liner, key facts, stack, links and cover. */
export function ProjectHeader({ project }: ProjectHeaderProps) {
  const facts = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: formatProjectDate(project) },
    { label: "Type", value: PROJECT_CATEGORY_LABELS[project.category] },
    { label: "Status", value: PROJECT_STATUS_LABELS[project.status] },
  ];

  return (
    <header>
      <FadeIn>
        <Link
          href="/projects"
          className="group/back text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/back:-translate-x-0.5"
            aria-hidden
          />
          All projects
        </Link>
      </FadeIn>

      <FadeIn delay={45} className="mt-6">
        <p className="text-accent font-mono text-xs tracking-[0.18em] uppercase">
          Case study
        </p>
        <h1 className="text-display text-foreground mt-3 max-w-3xl break-words">
          {project.title}
        </h1>
        <p className="text-foreground/80 mt-5 max-w-2xl text-lg leading-relaxed md:text-xl">
          {project.shortDescription}
        </p>
      </FadeIn>

      <FadeIn delay={90}>
        <dl className="border-border mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y py-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
                {fact.label}
              </dt>
              <dd className="text-foreground mt-1.5 text-sm font-medium">
                {fact.label === "Status" && project.status === "live" ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="bg-accent size-1.5 rounded-full"
                    />
                    {fact.value}
                  </span>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>

      <FadeIn
        delay={135}
        className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        {project.technologies.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {project.liveUrl ? (
            <ButtonLink href={project.liveUrl} external>
              Visit live site
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          ) : null}
          {project.githubUrl ? (
            <ButtonLink href={project.githubUrl} external variant="secondary">
              <GitHubIcon className="size-4" />
              View code
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn delay={180} variant="scale" className="mt-10">
        <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden rounded-xl border shadow-md">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center font-mono text-xs tracking-widest uppercase">
              {project.title}
            </div>
          )}
        </div>
      </FadeIn>
    </header>
  );
}
