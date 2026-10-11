import { ImageResponse } from "next/og";

export const alt = "AURELIS — Time, Crafted Differently.";
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
          justifyContent: "flex-end",
          background: "#080807",
          color: "#F1E9DC",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 10, color: "#C7A56A" }}>AURELIS</div>
        <div style={{ fontSize: 84, lineHeight: 0.9, marginTop: 24 }}>Time, crafted differently.</div>
      </div>
    ),
    { ...size },
  );
}
