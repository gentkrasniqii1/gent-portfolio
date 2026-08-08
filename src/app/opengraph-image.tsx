import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f2f3f1",
        color: "#12181e",
        padding: "72px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0f766e",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {profile.role}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 84, lineHeight: 1.05 }}>{profile.name}</div>
        <div
          style={{
            fontSize: 32,
            color: "#5c6670",
            maxWidth: 900,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            lineHeight: 1.35,
          }}
        >
          {profile.headline}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
