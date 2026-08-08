import { ProjectGrid } from "@/components/projects/project-grid";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="border-border border-t py-section"
    >
      <Container className="space-y-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="featured-projects-heading"
              eyebrow="Projects"
              title="Featured work"
              description="Selected projects that best represent how I build."
            />
            <ButtonLink
              href="/projects"
              variant="secondary"
              className="shrink-0"
            >
              View all projects
            </ButtonLink>
          </div>
        </Reveal>

        <ProjectGrid
          projects={featured}
          emptyMessage="Featured projects will appear here once published."
        />
      </Container>
    </section>
  );
}
