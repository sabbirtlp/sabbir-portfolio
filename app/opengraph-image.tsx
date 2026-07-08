import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sabbir Hossain — Web Developer & Conversion Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1208 45%, #2d1a0a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#f97316",
            }}
          />
          <span style={{ fontSize: 22, color: "#f97316", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Available for Projects
          </span>
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 900, marginBottom: 24 }}>
          Sabbir Hossain
        </div>
        <div style={{ fontSize: 36, color: "#e5e7eb", lineHeight: 1.3, maxWidth: 900, marginBottom: 40 }}>
          Web Developer & Conversion Specialist
        </div>
        <div style={{ fontSize: 24, color: "#9ca3af", maxWidth: 900 }}>
          WordPress · WooCommerce · Landing Pages · Technical SEO · CRO
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 72,
            fontSize: 28,
            color: "#f97316",
            fontWeight: 700,
          }}
        >
          sabbir.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
