import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PROJECT_CATEGORY_LABELS } from "@/lib/projects";
import type { Project } from "@/types/project";

export function NextProject({ project }: { project: Project }) {
  return (
    <Reveal as="section" aria-labelledby="next-project-heading">
      <h2
        id="next-project-heading"
        className="text-muted-foreground font-mono text-xs font-normal tracking-[0.18em] uppercase"
      >
        Next project
      </h2>
      <Link
        href={`/projects/${project.slug}`}
        className="group/next border-border bg-card mt-4 grid overflow-hidden rounded-xl border shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
      >
        <span className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <span className="text-muted-foreground text-sm">
            {PROJECT_CATEGORY_LABELS[project.category]} · {project.year}
          </span>
          <span className="font-display text-foreground group-hover/next:text-primary text-3xl tracking-tight transition-colors md:text-4xl">
            {project.title}
          </span>
          <span className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {project.shortDescription}
          </span>
          <span className="text-foreground mt-2 inline-flex items-center gap-1.5 text-sm font-medium">
            Read the case study
            <ArrowRight
              aria-hidden
              className="motion-safe:ease-out-expo size-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/next:translate-x-1"
            />
          </span>
        </span>
        <span className="bg-muted relative block aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 100vw"
              className="motion-safe:ease-out-expo object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover/next:scale-[1.04]"
            />
          ) : null}
        </span>
      </Link>
    </Reveal>
  );
}
