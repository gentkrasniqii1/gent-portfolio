import type { Metadata } from "next";
import {
  ProjectFilters,
  resolveCategoryParam,
} from "@/components/projects/project-filters";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Container } from "@/components/layout/container";
import { projects } from "@/data/projects";
import { getProjects } from "@/lib/projects";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Selected software projects by Gent Krasniqi — case studies, demos, and source code.",
  path: "/projects",
});

type ProjectsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const category = resolveCategoryParam(params.category);
  const filtered = getProjects(category);

  return (
    <div className="py-section">
      <Container className="space-y-10">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-display text-foreground">Projects</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {projects.length === 0
              ? "Selected work will appear here as projects are published."
              : "A living archive of selected software projects and case studies."}
          </p>
        </div>

        <ProjectFilters active={category} />

        <ProjectGrid
          projects={filtered}
          titleAs="h2"
          emptyMessage={
            projects.length === 0
              ? "No projects published yet."
              : "No projects match this category."
          }
        />
      </Container>
    </div>
  );
}
