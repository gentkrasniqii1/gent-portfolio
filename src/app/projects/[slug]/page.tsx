import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/project-details";
import { Container } from "@/components/layout/container";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import {
  getAllProjectSlugs,
  getNextProject,
  getProjectBySlug,
} from "@/lib/projects";
import { createMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: "Project not found",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: project.headline ?? project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-section">
      <ScrollProgress />
      <Container>
        <ProjectDetails
          project={project}
          nextProject={getNextProject(project.slug)}
        />
      </Container>
    </div>
  );
}
