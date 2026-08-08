import Image from "next/image";
import { ProjectSection } from "@/components/projects/project-section";

type ProjectGalleryProps = {
  title: string;
  images: string[];
};

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <ProjectSection id="project-gallery" title="Screenshots">
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((src, index) => (
          <li
            key={src}
            className="border-border bg-muted relative aspect-[16/10] overflow-hidden rounded-lg border"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              quality={80}
            />
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}
