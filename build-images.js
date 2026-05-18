/**
 * Build script: generate WebP images and compress hero for performance.
 * Run: node build-images.js (requires: npm install)
 * - main_favicon.png → favicon.ico, favicon-16/32, apple-touch-icon (see build-favicon.js)
 * - (Optional) python trim-featured-logos.py — crop logo PNG margins first
 * - Hero profile.png → profile.webp (target <200KB)
 * - Featured project PNGs → WebP in same folder
 */

const fs = require("fs");
const path = require("path");
const { buildFavicons } = require("./build-favicon");

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error("Run: npm install");
  process.exit(1);
}

const HERO_MAX_KB = 120;
const HERO_QUALITY = 80;
const HERO_MAX_WIDTH = 480;
const ROOT = __dirname;

/** PNGs under featured-projects/ — run `python trim-featured-logos.py` to crop margins, then this rebuilds WebP. */
const FEATURED_LOGOS = [
  { dir: "MWF", file: "MedWorkFlow.png" },
  { dir: "GoCafeCo", file: "Projects Logo.png" },
  { dir: "Pronto", file: "Logo.png" },
  { dir: "InPlan", file: "Logo.png" },
  { dir: "WiseWeb", file: "Logo.png" },
  { dir: "OpenRole", file: "logo.png" },
];

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

/** Essay hero thumb for Work grid */
async function insightsCoverWebP() {
  const src = path.join(ROOT, "insights", "prompt-engineering", "images", "image2.png");
  const dest = path.join(ROOT, "insights", "prompt-engineering", "images", "cover.webp");
  await toWebP(src, dest, { maxWidth: 400, quality: 82 });
}

async function promptWorkbenchTileWebP() {
  const src = path.join(ROOT, "featured-projects", "PromptWorkbench", "screenshot.png");
  const dest = path.join(ROOT, "featured-projects", "PromptWorkbench", "hero-tile.webp");
  await toWebP(src, dest, { maxWidth: 560, quality: 82 });
}

async function shakespeareTileWebP() {
  const src = path.join(ROOT, "featured-projects", "portfolio_Shakespeare", "cover.png");
  const dest = path.join(ROOT, "featured-projects", "portfolio_Shakespeare", "hero-tile.webp");
  await toWebP(src, dest, { maxWidth: 800, quality: 82 });
}

async function tierupTileWebP() {
  const src = path.join(ROOT, "featured-projects", "portfolio_TierUp", "cover.png");
  const dest = path.join(ROOT, "featured-projects", "portfolio_TierUp", "hero-tile.webp");
  await toWebP(src, dest, { maxWidth: 800, quality: 82 });
}

async function howLlmsWorkCoverWebP() {
  const src = path.join(ROOT, "insights", "How LLM Work's", "cover.png");
  const dest = path.join(ROOT, "insights", "How LLM Work's", "cover.webp");
  await toWebP(src, dest, { maxWidth: 400, quality: 82 });
}

async function featuredWebP() {
  for (const p of FEATURED_LOGOS) {
    const base = path.join(ROOT, "featured-projects", p.dir);
    const src = path.join(base, p.file);
    const outName = p.file.replace(/\.(png|jpe?g)$/i, ".webp");
    const dest = path.join(base, outName);
    await toWebP(src, dest, { quality: 82 });
  }
}

(async () => {
  console.log("Building images...");
  await buildFavicons();
  await compressHero();
  await featuredWebP();
  await insightsCoverWebP();
  await howLlmsWorkCoverWebP();
  await promptWorkbenchTileWebP();
  await shakespeareTileWebP();
  await tierupTileWebP();
  console.log("Done.");
})();
