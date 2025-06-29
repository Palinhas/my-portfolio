import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          fontSize: 18,
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 6,
          fontWeight: "bold",
          fontFamily: "system-ui",
        },
      },
      "CB"
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
