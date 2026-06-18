import { ImageResponse } from "next/og";

import { siteConfig } from "@/constants/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Comparador de Isapres, AFP y Seguros en Chile`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const interBold = fetch(
    "https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap",
  ).then((res) => res.text());

  const css = await interBold;
  const fontMatch = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  const fontUrl = fontMatch?.[1];

  let fontData: ArrayBuffer | undefined;
  if (fontUrl) {
    fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #111214 0%, #1a1a1a 45%, #2a1508 100%)",
          padding: "64px 72px",
          fontFamily: fontData ? "Inter" : "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#f58220",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "white",
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
          <p
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Compara Isapres, AFP y Seguros
          </p>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#f58220",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Cotiza gratis y elige el mejor plan en Chile
          </p>
        </div>

        <p style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.45)", margin: 0 }}>
          cotizaloantes.cl
        </p>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Inter", data: fontData, style: "normal", weight: 800 }]
        : [],
    },
  );
}
