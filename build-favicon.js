/**
 * Generate site favicons from main_favicon.png (single source of truth).
 * Run: npm run build:favicon
 *
 * Outputs at repo root:
 *   favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
 */

const fs = require("fs");
const path = require("path");

let sharp;
let toIco;
try {
  sharp = require("sharp");
  toIco = require("to-ico");
} catch {
  console.error("Run: npm install");
  process.exit(1);
}

const ROOT = __dirname;
const SOURCE = path.join(ROOT, "main_favicon.png");

const PNG_OUTPUTS = [
  { size: 16, file: "favicon-16x16.png" },
  { size: 32, file: "favicon-32x32.png" },
  { size: 180, file: "apple-touch-icon.png" },
];

const ICO_SIZES = [16, 32, 48];

const RESIZE_OPTS = {
  fit: "contain",
  background: { r: 255, g: 255, b: 255 },
  kernel: sharp.kernel.nearest,
};

function renderSquare(size) {
  return sharp(SOURCE)
    .rotate()
    .resize(size, size, RESIZE_OPTS)
    .png();
}

async function buildFavicons() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing source file: main_favicon.png");
    return false;
  }

  const meta = await sharp(SOURCE).metadata();
  console.log(
    `Source: main_favicon.png (${meta.width}×${meta.height}, ${meta.format})`
  );

  for (const { size, file } of PNG_OUTPUTS) {
    await renderSquare(size).toFile(path.join(ROOT, file));
    console.log(`Created: ${file} (${size}×${size})`);
  }

  const icoBuffers = await Promise.all(
    ICO_SIZES.map((size) => renderSquare(size).toBuffer())
  );
  fs.writeFileSync(path.join(ROOT, "favicon.ico"), await toIco(icoBuffers));
  console.log(`Created: favicon.ico (${ICO_SIZES.join(", ")}px)`);

  return true;
}

if (require.main === module) {
  buildFavicons()
    .then((ok) => process.exit(ok ? 0 : 1))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { buildFavicons };
