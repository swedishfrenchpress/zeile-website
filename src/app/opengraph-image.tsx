import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 640 };
export const contentType = "image/png";
export const alt = "zeile · leave a little note";

// The share card: the app icon's rose gradient carrying a giant lowercase
// wordmark and the one-line pitch. Satori renders a small CSS subset —
// keep this to plain flexbox.
export default async function OpengraphImage() {
  const nunito = await readFile(
    join(process.cwd(), "src/assets/fonts/Nunito-ExtraBold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f2517f 0%, #d63864 100%)",
          fontFamily: "Nunito",
        }}
      >
        <div
          style={{
            fontSize: 220,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          zeile
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 46,
            fontWeight: 800,
            color: "#ffffff",
            opacity: 0.94,
            letterSpacing: "-0.01em",
          }}
        >
          Leave a little note.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nunito", data: nunito, weight: 800, style: "normal" }],
    }
  );
}
