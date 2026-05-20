import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Gabriela y Juan Camilo — 19 de diciembre 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const fontsDir = join(root, "public", "og-fonts");

  const wedding = readFileSync(join(fontsDir, "Wedding.otf"));
  const greatVibes = readFileSync(join(fontsDir, "GreatVibes-Regular.ttf"));
  const cormorantItalic = readFileSync(join(fontsDir, "CormorantGaramond-Italic.ttf"));
  const cormorantLight = readFileSync(join(fontsDir, "CormorantGaramond-Light.ttf"));

  const photoBuffer = readFileSync(join(root, "public", "og-bg.jpg"));
  const photoDataUri = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1f1d1c",
          color: "#faf7f2",
        }}
      >
        <img
          src={photoDataUri}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            filter: "brightness(0.55) saturate(0.92)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 1200,
            height: 630,
            padding: "60px 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Cormorant Light",
              fontSize: 30,
              letterSpacing: 16,
              color: "#d4b87a",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            19 · Diciembre · 2026
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Wedding",
              fontSize: 130,
              lineHeight: 1.05,
              color: "#faf7f2",
              marginTop: 12,
              textShadow: "0 4px 24px rgba(0,0,0,0.65)",
            }}
          >
            <span>Gabriela</span>
            <span
              style={{
                fontFamily: "Great Vibes",
                fontSize: 128,
                color: "#d4b87a",
                margin: "0 18px",
                lineHeight: 1,
              }}
            >
              &amp;
            </span>
            <span>Juan Camilo</span>
          </div>

          <div
            style={{
              fontFamily: "Cormorant Italic",
              fontSize: 36,
              fontStyle: "italic",
              marginTop: 18,
              color: "rgba(250,247,242,0.97)",
              textShadow: "0 2px 12px rgba(0,0,0,0.55)",
            }}
          >
            ¡Nos casamos!
          </div>

          <div
            style={{
              fontFamily: "Cormorant Light",
              fontSize: 18,
              letterSpacing: 8,
              color: "rgba(250,247,242,0.85)",
              textTransform: "uppercase",
              marginTop: 30,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Route G25 · San José de Maipo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Wedding", data: wedding, weight: 400, style: "normal" },
        { name: "Great Vibes", data: greatVibes, weight: 400, style: "normal" },
        { name: "Cormorant Italic", data: cormorantItalic, weight: 400, style: "italic" },
        { name: "Cormorant Light", data: cormorantLight, weight: 300, style: "normal" },
      ],
    },
  );
}
