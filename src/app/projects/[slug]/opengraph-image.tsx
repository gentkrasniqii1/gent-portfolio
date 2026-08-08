import { ImageResponse } from "next/og";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { profile } from "@/data/profile";

export const alt = "Project";
export const size = {
  width: 1200,
  height: 630,
};
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

  const title = project?.title ?? "Project";
  const description =
    project?.shortDescription ?? `${profile.name} — portfolio project`;
  const year = project?.year?.toString() ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#143746",
        color: "#f4f6f5",
        padding: "72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#2dd4bf",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <span>{profile.name}</span>
        <span>{year}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 72, lineHeight: 1.05 }}>{title}</div>
        <div
          style={{
            fontSize: 28,
            color: "#c5d0d6",
            maxWidth: 920,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            lineHeight: 1.35,
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
