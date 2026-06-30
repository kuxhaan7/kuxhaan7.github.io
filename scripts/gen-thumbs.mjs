// Generates branded thumbnail images for the "Code & AI" projects that have no
// real UI screenshots. Dark, premium "engineering" look: gradient + motif +
// title. Output: public/img/code/<id>.webp (16:10).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const W = 1000;
const H = 625;
const OUT = "public/img/code";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// A faint dot grid + accent glow shared by every thumbnail.
const base = (a, b, accent) => `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="60%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fill-opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
`;

// Per-project decorative motif (top-right area), drawn with the accent color.
const motifs = {
  shelby: (c) => `
    <g stroke="${c}" stroke-width="2.5" fill="none" opacity="0.9" transform="translate(720,150)">
      <circle cx="60" cy="60" r="46" fill="${c}" fill-opacity="0.12"/>
      <circle cx="60" cy="60" r="46"/>
      <circle cx="60" cy="60" r="10" fill="${c}" stroke="none"/>
      <circle cx="60" cy="60" r="78" stroke-opacity="0.4"/>
      <circle cx="138" cy="60" r="7" fill="${c}" stroke="none"/>
      <circle cx="-18" cy="60" r="7" fill="${c}" stroke="none"/>
      <circle cx="60" cy="138" r="7" fill="${c}" stroke="none"/>
      <line x1="106" y1="60" x2="131" y2="60"/>
      <line x1="14" y1="60" x2="-11" y2="60"/>
      <line x1="60" y1="106" x2="60" y2="131"/>
    </g>`,
  nor: (c) => `
    <g stroke="${c}" stroke-width="3" fill="none" transform="translate(690,120)">
      <polyline points="0,140 40,90 80,120 120,40 160,80 200,10 240,60"/>
      <circle cx="120" cy="40" r="6" fill="${c}" stroke="none"/>
      <circle cx="200" cy="10" r="6" fill="${c}" stroke="none"/>
      <line x1="0" y1="170" x2="240" y2="170" stroke-opacity="0.25"/>
    </g>`,
  scan: (c) => `
    <g transform="translate(700,110)">
      <rect x="0" y="0" width="220" height="220" rx="14" fill="none" stroke="${c}" stroke-width="2.5" stroke-opacity="0.7"/>
      ${[30, 70, 110, 150, 190]
        .map(
          (y) =>
            `<line x1="18" y1="${y}" x2="202" y2="${y}" stroke="${c}" stroke-width="2" stroke-opacity="0.35"/>`
        )
        .join("")}
      <rect x="0" y="96" width="220" height="26" fill="${c}" fill-opacity="0.18"/>
    </g>`,
  brain: (c) => `
    <g stroke="${c}" stroke-width="2.5" transform="translate(700,120)">
      ${[
        [20, 30],
        [20, 110],
        [20, 190],
        [120, 60],
        [120, 160],
        [220, 110],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${c}"/>`)
        .join("")}
      <g stroke-opacity="0.45" fill="none">
        <line x1="20" y1="30" x2="120" y2="60"/><line x1="20" y1="110" x2="120" y2="60"/>
        <line x1="20" y1="110" x2="120" y2="160"/><line x1="20" y1="190" x2="120" y2="160"/>
        <line x1="120" y1="60" x2="220" y2="110"/><line x1="120" y1="160" x2="220" y2="110"/>
      </g>
    </g>`,
  workflow: (c) => `
    <g stroke="${c}" stroke-width="2.5" fill="none" transform="translate(690,140)">
      <rect x="0" y="60" width="64" height="44" rx="10" fill="${c}" fill-opacity="0.15"/>
      <rect x="120" y="0" width="64" height="44" rx="10" fill="${c}" fill-opacity="0.15"/>
      <rect x="120" y="120" width="64" height="44" rx="10" fill="${c}" fill-opacity="0.15"/>
      <rect x="240" y="60" width="64" height="44" rx="10" fill="${c}" fill-opacity="0.15"/>
      <path d="M64 82 H92 V22 H120" stroke-opacity="0.6"/>
      <path d="M64 82 H92 V142 H120" stroke-opacity="0.6"/>
      <path d="M184 22 H212 V82 H240" stroke-opacity="0.6"/>
      <path d="M184 142 H212 V82 H240" stroke-opacity="0.6"/>
    </g>`,
  file: (c) => `
    <g transform="translate(740,120)">
      <path d="M0 0 H120 L170 50 V230 H0 Z" fill="${c}" fill-opacity="0.12" stroke="${c}" stroke-width="2.5"/>
      <path d="M120 0 V50 H170" fill="none" stroke="${c}" stroke-width="2.5"/>
      ${[80, 110, 140, 170, 200]
        .map(
          (y, i) =>
            `<line x1="26" y1="${y}" x2="${i % 2 ? 120 : 144}" y2="${y}" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.5"/>`
        )
        .join("")}
    </g>`,
};

// id, two-line title, tech label, gradient a/b, accent, motif key
const items = [
  ["shelby", ["Shelby", "AI Agent"], "CLAUDE · TOOL USE · FASTAPI", "#12152b", "#241a3f", "#a78bfa", "shelby"],
  ["nor", ["Network Outage", "Reporting"], "TYPESCRIPT · ML FORECASTING", "#0a1626", "#0c2233", "#38bdf8", "nor"],
  ["chest-xray", ["Chest X-Ray", "Detection"], "PYTORCH · TRANSFER LEARNING", "#06201d", "#0a2b2b", "#2dd4bf", "scan"],
  ["cats-dogs", ["Cats vs Dogs", "Classifier"], "PYTORCH · CNN · VISION", "#241226", "#2a1530", "#f472b6", "brain"],
  ["n8n", ["n8n Automation", "Workflows"], "n8n · LLM · AUTOMATION", "#261707", "#2b1d0a", "#fb923c", "workflow"],
  ["md-gdocs", ["Markdown to", "Google Docs"], "PYTHON · DOCS API", "#0c1f12", "#0e2a18", "#4ade80", "file"],
];

const svg = ([t1, t2], tech, a, b, accent, motif) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${base(a, b, accent)}
  ${motifs[motif](accent)}
  <g font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    <text x="64" y="118" font-size="22" letter-spacing="3" font-weight="700" fill="${accent}">PROJECT</text>
    <text x="60" y="330" font-size="84" font-weight="800" fill="#ffffff" letter-spacing="-2">${esc(t1)}</text>
    <text x="60" y="430" font-size="84" font-weight="800" fill="#ffffff" letter-spacing="-2">${esc(t2)}</text>
    <text x="64" y="540" font-size="24" letter-spacing="2.5" font-weight="600" fill="#ffffff" fill-opacity="0.62">${esc(tech)}</text>
  </g>
  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
</svg>`;

await mkdir(OUT, { recursive: true });
for (const [id, title, tech, a, b, accent, motif] of items) {
  const buf = Buffer.from(svg(title, tech, a, b, accent, motif));
  await sharp(buf).webp({ quality: 88 }).toFile(`${OUT}/${id}.webp`);
  console.log(`✓ ${OUT}/${id}.webp`);
}
console.log("done");
