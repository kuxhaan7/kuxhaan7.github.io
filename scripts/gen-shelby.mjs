// Generates the hero banner for Shelby — catchy poster style, full canvas.
// Output: public/img/shelby.webp  (1600×900, 16:9)
import sharp from "sharp";

const W = 1600;
const H = 900;

const BG1 = "#08061a";
const BG2 = "#0f0826";
const AC  = "#8b5cf6";
const AC2 = "#ec4899";
const AC3 = "#06b6d4";

function chip(x, y, w, text, color) {
  return `
  <g transform="translate(${x},${y})">
    <rect width="${w}" height="34" rx="17" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-opacity="0.45" stroke-width="1.5"/>
    <text x="${w/2}" y="22" text-anchor="middle" font-size="13" font-weight="600" fill="${color}">${text}</text>
  </g>`;
}

function node(cx, cy, r, label1, label2, color) {
  const secondLine = label2
    ? `<text text-anchor="middle" dy="10" font-family="monospace" font-size="11" font-weight="700" fill="${color}">${label2}</text>`
    : "";
  const dy1 = label2 ? "-4" : "5";
  return `
  <g transform="translate(${cx},${cy})">
    <circle r="${r}" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="1.5" stroke-opacity="0.7"/>
    <text text-anchor="middle" dy="${dy1}" font-family="monospace" font-size="11" font-weight="700" fill="${color}">${label1}</text>
    ${secondLine}
  </g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"   stop-color="${BG1}"/>
      <stop offset="0.5" stop-color="${BG2}"/>
      <stop offset="1"   stop-color="#100420"/>
    </linearGradient>
    <radialGradient id="gA" cx="28%" cy="38%" r="55%">
      <stop offset="0" stop-color="${AC}"  stop-opacity="0.32"/>
      <stop offset="1" stop-color="${AC}"  stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gB" cx="78%" cy="52%" r="48%">
      <stop offset="0" stop-color="${AC2}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${AC2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gC" cx="70%" cy="18%" r="36%">
      <stop offset="0" stop-color="${AC3}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${AC3}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#fff" fill-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#gA)"/>
  <rect width="${W}" height="${H}" fill="url(#gB)"/>
  <rect width="${W}" height="${H}" fill="url(#gC)"/>

  <!-- ── Agent diagram (right side, cx=1190, cy=460) ─────────────── -->

  <!-- orbit ring -->
  <circle cx="1190" cy="460" r="172" fill="none" stroke="${AC}" stroke-width="1" stroke-opacity="0.14" stroke-dasharray="4 12"/>

  <!-- spoke lines to satellites -->
  <line x1="1190" y1="420" x2="1190" y2="292" stroke="${AC}"  stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="3 7"/>
  <line x1="1332" y1="460" x2="1230" y2="460" stroke="${AC2}" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="3 7"/>
  <line x1="1300" y1="590" x2="1232" y2="508" stroke="${AC3}" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="3 7"/>
  <line x1="1080" y1="590" x2="1148" y2="508" stroke="${AC2}" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="3 7"/>
  <line x1="1316" y1="322" x2="1228" y2="396" stroke="${AC3}" stroke-width="1.5" stroke-opacity="0.30" stroke-dasharray="3 7"/>
  <line x1="1064" y1="322" x2="1152" y2="396" stroke="${AC}"  stroke-width="1.5" stroke-opacity="0.30" stroke-dasharray="3 7"/>

  <!-- central hub -->
  <circle cx="1190" cy="460" r="72"  fill="${AC}" fill-opacity="0.12" stroke="${AC}" stroke-width="2" stroke-opacity="0.55"/>
  <circle cx="1190" cy="460" r="48"  fill="${AC}" fill-opacity="0.20"/>
  <text x="1190" y="466" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="17" font-weight="800" fill="#fff">AGENT</text>

  <!-- satellite nodes -->
  ${node(1190, 278, 38, "Claude", "API",   AC)}
  ${node(1370, 460, 38, "Fast",  "API",    AC2)}
  ${node(1318, 604, 36, "Chroma","DB",     AC3)}
  ${node(1062, 604, 36, "Tele",  "gram",   AC2)}
  ${node(1330, 314, 32, "Tavily","",       AC3)}
  ${node(1050, 314, 32, "RAG",   "",       AC)}

  <!-- ── Left text block ─────────────────────────────────────────── -->
  <g font-family="-apple-system, Segoe UI, Helvetica Neue, sans-serif">
    <!-- LIVE badge -->
    <circle cx="68" cy="170" r="7" fill="#22c55e"/>
    <text x="84" y="176" font-size="14" letter-spacing="3" font-weight="700" fill="#86efac">LIVE PROJECT</text>

    <!-- Main title -->
    <text x="60" y="335" font-size="148" font-weight="800" fill="#ffffff" letter-spacing="-5">Shelby</text>

    <!-- Tagline -->
    <text x="64" y="392" font-size="21" letter-spacing="3.5" font-weight="600" fill="#ffffff" fill-opacity="0.42">AUTONOMOUS AI AGENT</text>

    <!-- Divider -->
    <line x1="64" y1="428" x2="528" y2="428" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>

    <!-- Description -->
    <text x="64" y="472" font-size="18" fill="#ffffff" fill-opacity="0.58">Persistent agent with tool use, RAG memory,</text>
    <text x="64" y="500" font-size="18" fill="#ffffff" fill-opacity="0.58">LangChain evals. Live on Railway.</text>

    <!-- chip row 1 -->
    ${chip( 64, 542, 144, "Claude Opus API", AC)}
    ${chip(220, 542, 104, "FastAPI",          AC2)}
    ${chip(336, 542, 122, "ChromaDB",         AC3)}
    ${chip(470, 542,  82, "RAG",              AC)}

    <!-- chip row 2 -->
    ${chip( 64, 592, 120, "LangChain",  AC2)}
    ${chip(196, 592, 106, "Telegram",   AC3)}
    ${chip(314, 592,  90, "Tavily",     AC)}
    ${chip(416, 592, 126, "ElevenLabs", AC2)}
  </g>

  <!-- border -->
  <rect width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5"/>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile("public/img/shelby.webp");
console.log("✓ public/img/shelby.webp");
