import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = resolve(ROOT, "public/fotos/pareja-arbol.jpg");
const OUT = resolve(ROOT, "public/og-bg.jpg");

const buf = readFileSync(SRC);
const out = await sharp(buf)
  .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
  .modulate({ brightness: 0.88 })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toBuffer();

writeFileSync(OUT, out);
console.log(`OG background generated: public/og-bg.jpg (${(out.byteLength / 1024).toFixed(1)} KB)`);
