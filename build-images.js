/**
 * Build script: generate WebP images and compress hero for performance.
 * Run: node build-images.js (requires: npm install sharp)
 * - Hero profile.png → profile.webp (target <200KB)
 * - Featured project PNGs → WebP in same folder
 */

const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error("Run: npm install sharp");
  process.exit(1);
}

const HERO_MAX_KB = 120;
const HERO_QUALITY = 80;
const HERO_MAX_WIDTH = 480;
const ROOT = __dirname;

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function toWebP(inputPath, outputPath, options = {}) {
  if (!fs.existsSync(inputPath)) {
    console.warn("Skip (not found):", inputPath);
    return;
  }
  const pipeline = sharp(inputPath);
  if (options.maxWidth) pipeline.resize({ width: options.maxWidth });
  if (options.quality !== undefined) pipeline.webp({ quality: options.quality });
  else pipeline.webp({ quality: 85 });
  await pipeline.toFile(outputPath);
  const stat = fs.statSync(outputPath);
  console.log("Created:", outputPath, "(" + Math.round(stat.size / 1024) + " KB)");
}

async function compressHero() {
  const src = path.join(ROOT, "profile.png");
  const dest = path.join(ROOT, "profile.webp");
  if (!fs.existsSync(src)) {
    console.warn("Hero image not found: profile.png");
    return;
  }
  let quality = HERO_QUALITY;
  let out = await sharp(src)
    .resize({ width: HERO_MAX_WIDTH })
    .webp({ quality })
    .toBuffer();
  while (out.length > HERO_MAX_KB * 1024 && quality > 40) {
    quality -= 10;
    out = await sharp(src).resize({ width: HERO_MAX_WIDTH }).webp({ quality }).toBuffer();
  }
  fs.writeFileSync(dest, out);
  console.log("Hero:", dest, "(" + Math.round(out.length / 1024) + " KB, quality " + quality + ")");
}

async function featuredWebP() {
  const projects = [
    { dir: "MWF", file: "MedWorkFlow.png" },
    { dir: "GoCafeCo", file: "Projects Logo.png" },
    { dir: "Pronto", file: "Logo.png" },
    { dir: "InPlan", file: "Logo.png" },
    { dir: "WiseWeb", file: "Logo.png" },
  ];
  for (const p of projects) {
    const base = path.join(ROOT, "featured-projects", p.dir);
    const src = path.join(base, p.file);
    const outName = p.file.replace(/\.(png|jpe?g)$/i, ".webp");
    const dest = path.join(base, outName);
    await toWebP(src, dest, { quality: 82 });
  }
}

(async () => {
  console.log("Building WebP images...");
  await compressHero();
  await featuredWebP();
  console.log("Done.");
})();
