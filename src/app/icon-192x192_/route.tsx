import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const response = new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
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
      width: 192,
      height: 192,
    }
  );

  // Adicionar headers para PWA compatibility
  response.headers.set("Content-Type", "image/png");
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return response;
}
