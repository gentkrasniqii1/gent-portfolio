import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/project-details";
import { Container } from "@/components/layout/container";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
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
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    image: project.image || undefined,
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
      <Container>
        <ProjectDetails project={project} />
      </Container>
    </div>
  );
}
