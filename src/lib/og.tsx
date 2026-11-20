import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { profile } from "@/data/profile";

export const OG_SIZE = { width: 1200, height: 630 };

/** Dark theme tokens from globals.css, so shared links match the site. */
const COLORS = {
  background: "#0e1216",
  card: "#151a1f",
  foreground: "#ebe8e2",
  muted: "#9aa3ad",
  accent: "#2dd4bf",
  primary: "#7eb6c4",
  border: "#2a323a",
};

const PORTRAIT = "public/images/profile/gent-portrait.jpg";

/** Reads an image from /public, resized and inlined as a data URL. */
async function inlineImage(relativePath: string, width: number) {
  const source = await readFile(path.join(process.cwd(), relativePath));
  const resized = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${resized.toString("base64")}`;
}

type OgImageInput = {
  eyebrow: string;
  title: string;
  description: string;
  /** Project cover under /public; without it the portrait is the hero. */
  cover?: string;
};

/**
 * Branded 1200×630 share image: grid backdrop, accent glow, eyebrow, title
 * and description, with the portrait (site pages) or the project cover.
 */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  cover,
}: OgImageInput) {
  const portrait = await inlineImage(PORTRAIT, 360);
  const coverImage = cover
    ? await inlineImage(path.join("public", cover), 760)
    : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: COLORS.background,
        color: COLORS.foreground,
        backgroundImage: `linear-gradient(to right, rgba(235,232,226,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(235,232,226,0.05) 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background:
            "radial-gradient(circle at center, rgba(45,212,191,0.26) 0%, rgba(45,212,191,0) 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 64px 72px",
          width: coverImage ? 600 : 720,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: COLORS.accent,
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: coverImage ? 68 : 80,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.4,
              color: COLORS.muted,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait}
              alt=""
              width={52}
              height={52}
              style={{
                borderRadius: 9999,
                border: `2px solid ${COLORS.accent}`,
              }}
            />
          ) : null}
          {coverImage ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>
                {profile.name}
              </div>
              <div
                style={{ display: "flex", fontSize: 20, color: COLORS.muted }}
              >
                {`${profile.shortRole} · ${profile.location}`}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", fontSize: 22, color: COLORS.muted }}>
              {profile.portfolioUrl.replace(/^https?:\/\//, "")}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingRight: coverImage ? 56 : 72,
        }}
      >
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt=""
            width={500}
            height={312}
            style={{
              borderRadius: 18,
              border: `1px solid ${COLORS.border}`,
              objectFit: "cover",
              boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              padding: 6,
              borderRadius: 9999,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary} 55%, rgba(126,182,196,0.2))`,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 8,
                borderRadius: 9999,
                background: COLORS.background,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portrait}
                alt=""
                width={316}
                height={316}
                style={{ borderRadius: 9999 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
