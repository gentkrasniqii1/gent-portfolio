import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { TechBadge } from "@/components/shared/tech-badge";
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS } from "@/lib/projects";
import type { Project } from "@/types/project";

type ProjectHeaderProps = {
  project: Project;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const hasImage = Boolean(project.image);

  return (
    <header className="space-y-8">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All projects
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono uppercase tracking-widest text-muted-foreground">
            {project.year}
          </span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span className="text-muted-foreground">
            {PROJECT_CATEGORY_LABELS[project.category]}
          </span>
          <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-medium">
            {PROJECT_STATUS_LABELS[project.status]}
          </span>
        </div>

        <h1 className="text-display text-foreground max-w-3xl">
          {project.title}
        </h1>

        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {project.shortDescription}
        </p>

        <p className="text-muted-foreground text-sm">
          Role: <span className="text-foreground">{project.role}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium shadow-sm transition-colors"
          >
            Live demo
            <ArrowUpRight className="ml-2 size-4" aria-hidden />
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-background text-foreground hover:bg-muted inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium transition-colors"
          >
            <GitHubIcon className="size-4" />
            View code
          </a>
        ) : null}
      </div>

      <div className="border-border bg-muted relative aspect-[16/9] overflow-hidden rounded-lg border">
        {hasImage ? (
          <Image
            src={project.image}
            alt={`${project.title} cover`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest">
            {project.title}
          </div>
        )}
      </div>

      {project.technologies.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechBadge>{tech}</TechBadge>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
