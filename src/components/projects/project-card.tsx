import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { TechBadge } from "@/components/shared/tech-badge";
import { PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const hasImage = Boolean(project.image);

  return (
    <article
      className={cn(
        "border-border group flex h-full flex-col overflow-hidden border-b pb-8 sm:border sm:rounded-lg sm:pb-0",
        className,
      )}
    >
      <div className="bg-muted relative aspect-[16/10] overflow-hidden sm:rounded-t-lg">
        {hasImage ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center px-4 text-center font-mono text-xs uppercase tracking-widest">
            {project.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 pt-5 sm:p-5">
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

        <div className="space-y-2">
          <h3 className="font-display text-foreground text-2xl tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {project.technologies.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent inline-flex items-center gap-1 text-sm font-medium transition-colors"
            >
              Live demo
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
