// Generates the hero banner for Shelby — 2.4:1 to match RouteRx wide format.
// Output: public/img/shelby.webp  (1560×650)
import sharp from "sharp";

const W = 1560;
const H = 650;

const BG1 = "#08061a";
const BG2 = "#0f0826";
const AC  = "#8b5cf6";
const AC2 = "#ec4899";
const AC3 = "#06b6d4";

function chip(x, y, w, text, color) {
  return `<g transform="translate(${x},${y})">
    <rect width="${w}" height="30" rx="15" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-opacity="0.45" stroke-width="1.5"/>
    <text x="${w/2}" y="20" text-anchor="middle" font-size="12" font-weight="600" fill="${color}">${text}</text>
  </g>`;
}

// Hex layout: 6 satellites around (1150, 325) at radius 200
const CX = 1150, CY = 325, R = 200;
const s3 = Math.round(R * Math.sqrt(3) / 2); // ≈173
const half = Math.round(R / 2);               // = 100

// [cx, cy, r, label1, label2, color]
const satellites = [
  [CX,        CY - R,    34, "Claude", "API",    AC ],   // top
  [CX + s3,   CY - half, 30, "Tavily", "",       AC3],   // top-right
  [CX + s3,   CY + half, 30, "Fast",   "API",    AC2],   // bottom-right
  [CX,        CY + R,    34, "Chroma", "DB",     AC3],   // bottom
  [CX - s3,   CY + half, 30, "Tele",   "gram",   AC2],   // bottom-left
  [CX - s3,   CY - half, 30, "RAG",    "",       AC ],   // top-left
];

function spoke(sx, sy, nodeR, cx2, cy2, color) {
  // draw from center hub edge toward satellite, let circles overlap
  return `<line x1="${sx}" y1="${sy}" x2="${cx2}" y2="${cy2}" stroke="${color}" stroke-width="1.5" stroke-opacity="0.38" stroke-dasharray="4 8"/>`;
}

const HUB_R = 60;

const spokes = satellites.map(([nx, ny, , , , col]) => {
  const dx = nx - CX, dy = ny - CY;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const x1 = Math.round(CX + (dx / dist) * HUB_R);
  const y1 = Math.round(CY + (dy / dist) * HUB_R);
  return spoke(x1, y1, 0, nx, ny, col);
}).join("\n  ");

const nodesSvg = satellites.map(([nx, ny, nr, l1, l2, col]) => {
  const dy1 = l2 ? "-4" : "5";
  const line2 = l2 ? `<text text-anchor="middle" dy="10" font-family="monospace" font-size="12" font-weight="700" fill="${col}">${l2}</text>` : "";
  return `<g transform="translate(${nx},${ny})">
    <circle r="${nr}" fill="${col}" fill-opacity="0.16" stroke="${col}" stroke-width="1.5" stroke-opacity="0.70"/>
    <text text-anchor="middle" dy="${dy1}" font-family="monospace" font-size="12" font-weight="700" fill="${col}">${l1}</text>
    ${line2}
  </g>`;
}).join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"   stop-color="${BG1}"/>
      <stop offset="0.6" stop-color="${BG2}"/>
      <stop offset="1"   stop-color="#100420"/>
    </linearGradient>
    <radialGradient id="gA" cx="28%" cy="42%" r="58%">
      <stop offset="0" stop-color="${AC}"  stop-opacity="0.34"/>
      <stop offset="1" stop-color="${AC}"  stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gB" cx="76%" cy="55%" r="48%">
      <stop offset="0" stop-color="${AC2}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${AC2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gC" cx="72%" cy="16%" r="38%">
      <stop offset="0" stop-color="${AC3}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${AC3}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#fff" fill-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#gA)"/>
  <rect width="${W}" height="${H}" fill="url(#gB)"/>
  <rect width="${W}" height="${H}" fill="url(#gC)"/>

  <!-- ── Agent diagram ─────────────────────────────────────────────── -->
  <!-- orbit ring -->
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${AC}" stroke-width="1" stroke-opacity="0.13" stroke-dasharray="4 12"/>

  <!-- spokes -->
  ${spokes}

  <!-- central hub -->
  <circle cx="${CX}" cy="${CY}" r="${HUB_R}" fill="${AC}" fill-opacity="0.12" stroke="${AC}" stroke-width="2" stroke-opacity="0.50"/>
  <circle cx="${CX}" cy="${CY}" r="${HUB_R - 18}" fill="${AC}" fill-opacity="0.22"/>
  <text x="${CX}" y="${CY + 6}" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="15" font-weight="800" fill="#fff">AGENT</text>

  <!-- satellite nodes -->
  ${nodesSvg}

  <!-- ── Left text block ───────────────────────────────────────────── -->
  <g font-family="-apple-system, Segoe UI, Helvetica Neue, sans-serif">
    <!-- LIVE badge -->
    <circle cx="72" cy="118" r="7" fill="#22c55e"/>
    <text x="88" y="124" font-size="14" letter-spacing="3" font-weight="700" fill="#86efac">LIVE PROJECT</text>

    <!-- Title -->
    <text x="64" y="230" font-size="100" font-weight="800" fill="#ffffff" letter-spacing="-3">Shelby</text>

    <!-- Tagline -->
    <text x="66" y="270" font-size="19" letter-spacing="3.5" font-weight="600" fill="#ffffff" fill-opacity="0.42">AUTONOMOUS AI AGENT</text>

    <!-- Divider -->
    <line x1="66" y1="298" x2="530" y2="298" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>

    <!-- Description -->
    <text x="66" y="332" font-size="17" fill="#ffffff" fill-opacity="0.58">Persistent agent with tool use, RAG memory,</text>
    <text x="66" y="357" font-size="17" fill="#ffffff" fill-opacity="0.58">LangChain evals. Deployed on Railway.</text>

    <!-- Chip row 1 -->
    ${chip( 66, 392, 140, "Claude Opus API", AC)}
    ${chip(218, 392, 100, "FastAPI",          AC2)}
    ${chip(330, 392, 116, "ChromaDB",         AC3)}
    ${chip(458, 392,  76, "RAG",              AC)}

    <!-- Chip row 2 -->
    ${chip( 66, 438, 116, "LangChain",  AC2)}
    ${chip(194, 438, 100, "Telegram",   AC3)}
    ${chip(306, 438,  86, "Tavily",     AC)}
    ${chip(404, 438, 120, "ElevenLabs", AC2)}
  </g>

  <rect width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5"/>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile("public/img/shelby.webp");
console.log("✓ public/img/shelby.webp");
