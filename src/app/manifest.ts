import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.shortRole}`,
    short_name: profile.name,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#f2f3f1",
    theme_color: "#143746",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
