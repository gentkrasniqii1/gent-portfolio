import { profile } from "@/data/profile";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  PROJECT_CATEGORY_LABELS,
} from "@/lib/projects";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderOgImage({
      eyebrow: "Portfolio",
      title: profile.name,
      description: profile.tagline,
    });
  }

  return renderOgImage({
    eyebrow: `Case study · ${PROJECT_CATEGORY_LABELS[project.category]}`,
    title: project.title,
    description: project.shortDescription,
    cover: project.image || undefined,
  });
}
