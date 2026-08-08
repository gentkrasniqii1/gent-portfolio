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
    "Selected software projects by [YOUR NAME] — case studies, demos, and source code.",
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
            A living archive of work. Add a project object in{" "}
            <code className="text-foreground font-mono text-sm">
              src/data/projects.ts
            </code>{" "}
            to publish it here.
          </p>
        </div>

        <ProjectFilters active={category} />

        <ProjectGrid
          projects={filtered}
          titleAs="h2"
          emptyMessage={
            projects.length === 0
              ? "No projects yet. Add your first entry to src/data/projects.ts."
              : "No projects match this category."
          }
        />
      </Container>
    </div>
  );
}
