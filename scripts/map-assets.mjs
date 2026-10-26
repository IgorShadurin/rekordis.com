import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const dist = dirname(fileURLToPath(import.meta.resolve("maplibre-gl")));
const target = "public/maplibre/6.9.0";
await mkdir(target, { recursive: true });
// The v6 worker imports its shared sibling. Serve both untransformed so the
// browser can resolve that import independently of Turbopack's module graph.
for (const name of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"])
  await copyFile(join(dist, name), join(target, name));

// Render the social-card layout from text and the existing local map previews.
// Keep the public filenames stable for existing links; no map-network requests.
const { default: sharp } = await import("sharp");
for (const locale of ["en", "ru"]) {
  const ru = locale === "ru";
  const lines = ru
    ? [
        "Ваши поездки.",
        "На одной карте.",
        "Маршруты для велосипеда и самоката",
        "GPS-треки, заметки и ссылки",
      ]
    : [
        "Your rides.",
        "On one map.",
        "Bike &amp; scooter routes",
        "GPS tracks, ride notes &amp; sharing",
      ];
  const layout =
    Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f8f9f5"/>
    <g font-family="Arial, sans-serif" fill="#233f34">
      <text x="48" y="80" font-size="26" font-weight="700">Rekordis</text>
      <text x="48" y="252" font-size="52" font-weight="700">${lines[0]}</text>
      <text x="48" y="316" font-size="52" font-weight="700" fill="#758673">${lines[1]}</text>
      <text x="48" y="394" font-size="21" fill="#506956">${lines[2]}</text>
      <text x="48" y="429" font-size="21" fill="#506956">${lines[3]}</text>
      <text x="48" y="566" font-size="16">${ru ? "ru." : ""}rekordis.com</text>
      <text x="1180" y="619" text-anchor="end" font-size="10">© OpenStreetMap contributors · openstreetmap.org</text>
    </g>
  </svg>`);
  const map = await sharp(
    `public/maps/${ru ? "moscow-gorky" : "london-c3"}.webp`,
  )
    .resize(620, 580, { fit: "cover" })
    .toBuffer();
  await sharp(layout)
    .composite([{ input: map, left: 570, top: 20 }])
    .png()
    .toFile(`public/maps/social-${locale}.png`);
}
