// Generates optimized WebP siblings for every raster image in public/img.
// Originals are kept (git-safe); refs are switched to .webp in source.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const DIR = "public/img";
const MAXW = 1400; // covers the largest display context (~1100px) at ~1.3x
const Q = 80;

const files = await readdir(DIR);
let before = 0,
  after = 0,
  count = 0;

for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
  const src = join(DIR, f);
  const out = join(DIR, basename(f, ext) + ".webp");
  const s = await stat(src);
  const img = sharp(src);
  const meta = await img.metadata();
  const pipeline = meta.width > MAXW ? img.resize({ width: MAXW }) : img;
  await pipeline.webp({ quality: Q }).toFile(out);
  const os = await stat(out);
  before += s.size;
  after += os.size;
  count++;
  console.log(
    `${f.padEnd(18)} ${(s.size / 1024).toFixed(0).padStart(5)}KB -> ${basename(out).padEnd(18)} ${(os.size / 1024).toFixed(0).padStart(4)}KB`
  );
}
console.log(
  `\n${count} images: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB WebP`
);
