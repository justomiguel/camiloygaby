import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_PHOTO = resolve(ROOT, "public/fotos/pareja-arbol.jpg");
const FONT_DIR = resolve(ROOT, "scripts/fonts");
const OUT_DIR = resolve(ROOT, "public");
const OUT_OG = resolve(OUT_DIR, "og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

const cormorantItalic = readFileSync(
  resolve(FONT_DIR, "CormorantGaramond-Italic.ttf"),
).toString("base64");
const cormorantLight = readFileSync(
  resolve(FONT_DIR, "CormorantGaramond-Light.ttf"),
).toString("base64");
const greatVibes = readFileSync(resolve(FONT_DIR, "GreatVibes-Regular.ttf")).toString(
  "base64",
);

const overlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style type="text/css"><![CDATA[
      @font-face {
        font-family: 'Cormorant Italic';
        src: url(data:font/ttf;base64,${cormorantItalic}) format('truetype');
        font-style: italic;
        font-weight: 400;
      }
      @font-face {
        font-family: 'Cormorant Light';
        src: url(data:font/ttf;base64,${cormorantLight}) format('truetype');
        font-style: normal;
        font-weight: 300;
      }
      @font-face {
        font-family: 'Great Vibes';
        src: url(data:font/ttf;base64,${greatVibes}) format('truetype');
        font-style: normal;
        font-weight: 400;
      }
      .label { font-family: 'Cormorant Light', serif; fill: #d4b87a; letter-spacing: 14px; }
      .names { font-family: 'Cormorant Italic', serif; fill: #faf7f2; }
      .amp { font-family: 'Great Vibes', cursive; fill: #d4b87a; }
      .accent { font-family: 'Cormorant Italic', serif; fill: #faf7f2; opacity: 0.95; }
      .venue { font-family: 'Cormorant Light', serif; fill: #faf7f2; opacity: 0.78; letter-spacing: 6px; }
    ]]></style>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.18)"/>
      <stop offset="55%" stop-color="rgba(0,0,0,0.55)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.86)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g text-anchor="middle">
    <text class="label" x="${WIDTH / 2}" y="375" font-size="30">19 · DICIEMBRE · 2026</text>
    <text class="names" x="${WIDTH / 2}" y="492" font-size="106">
      <tspan>Gabriela </tspan>
      <tspan class="amp" font-size="120">&amp;</tspan>
      <tspan> Juan Camilo</tspan>
    </text>
    <text class="accent" x="${WIDTH / 2}" y="552" font-size="34" font-style="italic">¡Nos casamos!</text>
    <text class="venue" x="${WIDTH / 2}" y="600" font-size="18">ROUTE G25 · SAN JOSE DE MAIPO</text>
  </g>
</svg>
`;

async function run() {
  mkdirSync(OUT_DIR, { recursive: true });

  const baseBuffer = readFileSync(SRC_PHOTO);

  const resized = await sharp(baseBuffer)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: sharp.strategy.attention })
    .modulate({ brightness: 0.92 })
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toBuffer();

  writeFileSync(OUT_OG, resized);
  console.log(
    `OG image generada: public/og-image.jpg (${(resized.byteLength / 1024).toFixed(1)} KB)`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
