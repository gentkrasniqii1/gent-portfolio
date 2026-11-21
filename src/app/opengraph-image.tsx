import { profile } from "@/data/profile";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.shortRole}, ${profile.location}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: `${profile.shortRole} · ${profile.location}`,
    title: profile.name,
    description: profile.tagline,
  });
}
