import { ImageResponse } from "next/og";
import { isPlaceholder } from "@/lib/seo";
import { profile } from "@/data/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

function markLabel() {
  if (isPlaceholder(profile.name)) return "GP";
  const parts = profile.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "GP";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

export default function AppleIcon() {
  const label = markLabel();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#143746",
        color: "#5eead4",
        fontSize: label.length > 1 ? 72 : 96,
        fontWeight: 700,
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        letterSpacing: label.length > 1 ? "-0.04em" : "0",
      }}
    >
      {label}
    </div>,
    { ...size },
  );
}
