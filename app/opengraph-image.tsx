import { ImageResponse } from "next/og";

export const alt = "Midnite Systems, AI Consultancy & Deployment Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#06080f",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: "#F5A800",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#7a7f94",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Midnite Systems
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: "#eef0f6",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            AI consultancy and deployment for growing businesses.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              color: "#7a7f94",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            We map your operation, build the AI that fits, and run it for
            you as a managed service.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 220,
              height: 4,
              backgroundColor: "#F5A800",
              borderRadius: 9999,
            }}
          />
          <div style={{ fontSize: 26, color: "#7a7f94" }}>
            midnitesystems.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
