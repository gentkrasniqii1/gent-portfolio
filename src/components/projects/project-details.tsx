import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHeader } from "@/components/projects/project-header";
import {
  ProjectListSection,
  ProjectSection,
} from "@/components/projects/project-section";
import type { Project } from "@/types/project";

type ProjectDetailsProps = {
  project: Project;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <article className="space-y-14">
      <ProjectHeader project={project} />

      <ProjectSection id="project-overview" title="Overview">
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed whitespace-pre-line">
          {project.description}
        </p>
      </ProjectSection>

      <ProjectListSection
        id="project-challenges"
        title="Challenges"
        items={project.challenges}
      />

      <ProjectListSection
        id="project-solutions"
        title="Solutions"
        items={project.solutions}
      />

      <ProjectListSection
        id="project-architecture"
        title="Architecture"
        items={project.architecture}
      />

      <ProjectListSection
        id="project-results"
        title="Results"
        items={project.results}
      />

      <ProjectGallery title={project.title} images={project.gallery} />
    </article>
  );
}
