import type { ReactNode } from "react";
import { ArchitectureList } from "@/components/projects/case-study/architecture-list";
import { CaseStudySection } from "@/components/projects/case-study/case-study-section";
import { ChallengeList } from "@/components/projects/case-study/challenge-list";
import { CheckList } from "@/components/projects/case-study/check-list";
import { FeatureGrid } from "@/components/projects/case-study/feature-grid";
import { NextProject } from "@/components/projects/case-study/next-project";
import { ScreenshotGallery } from "@/components/projects/case-study/screenshot-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import type { Project } from "@/types/project";

type ProjectDetailsProps = {
  project: Project;
  nextProject?: Project;
};

type Section = {
  id: string;
  title: string;
  content: ReactNode;
};

/**
 * One template for every case study. Sections without data are left out (and
 * the remaining ones renumbered), so a project can ship before every part of
 * its story is written.
 */
export function ProjectDetails({ project, nextProject }: ProjectDetailsProps) {
  const candidates: Array<Section | false> = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <p className="text-foreground/85 max-w-[68ch] text-lg leading-relaxed">
          {project.description}
        </p>
      ),
    },
    project.responsibilities.length > 0 && {
      id: "role",
      title: "My role",
      content: (
        <div className="space-y-5">
          <p className="text-foreground text-lg font-medium">{project.role}</p>
          <CheckList items={project.responsibilities} />
        </div>
      ),
    },
    project.features.length > 0 && {
      id: "features",
      title: "Key features",
      content: <FeatureGrid features={project.features} />,
    },
    project.architecture.length > 0 && {
      id: "architecture",
      title: "Architecture & stack",
      content: <ArchitectureList items={project.architecture} />,
    },
    project.challenges.length > 0 && {
      id: "challenges",
      title: "Challenges & solutions",
      content: <ChallengeList items={project.challenges} />,
    },
    project.results.length > 0 && {
      id: "results",
      title: "Results",
      content: <CheckList items={project.results} />,
    },
    project.gallery.length > 0 && {
      id: "screenshots",
      title: "Screenshots",
      content: (
        <ScreenshotGallery title={project.title} shots={project.gallery} />
      ),
    },
  ];
  const sections = candidates.filter((section): section is Section =>
    Boolean(section),
  );

  return (
    <article>
      <ProjectHeader project={project} />

      <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="Case study sections" className="hidden lg:block">
          <ul className="sticky top-24 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted-foreground hover:text-foreground flex min-h-11 items-center gap-2.5 rounded-md transition-colors"
                >
                  <span className="font-mono text-[11px]" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-16 md:space-y-20">
          {sections.map((section, index) => (
            <CaseStudySection
              key={section.id}
              id={section.id}
              index={index + 1}
              title={section.title}
            >
              {section.content}
            </CaseStudySection>
          ))}
        </div>
      </div>

      {nextProject ? (
        <div className="border-border mt-20 border-t pt-12 md:mt-24">
          <NextProject project={nextProject} />
        </div>
      ) : null}
    </article>
  );
}
