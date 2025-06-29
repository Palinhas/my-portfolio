import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 24,
          fontWeight: "bold",
          fontFamily: "system-ui",
        }}
      >
        CB
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}
