// Generates the featured showcase thumbnail for Shelby — autonomous AI agent.
// AI/terminal motif on a dark violet-to-indigo gradient.
// Output: public/img/shelby.webp (4:3 to match regular showcase cards)
import sharp from "sharp";

const W = 800;
const H = 600;
const A = "#0d0a1f"; // deep indigo-black
const B = "#130a2e"; // deep violet
const AC = "#a78bfa"; // violet accent
const AC2 = "#f0abfc"; // fuchsia accent

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${A}"/>
      <stop offset="1" stop-color="${B}"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="22%" r="60%">
      <stop offset="0" stop-color="${AC}" stop-opacity="0.45"/>
      <stop offset="0.5" stop-color="${AC}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${AC}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="20%" cy="80%" r="45%">
      <stop offset="0" stop-color="${AC2}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${AC2}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- terminal window (right side) -->
  <g transform="translate(390, 120)">
    <rect width="370" height="320" rx="12" fill="#1a1033" fill-opacity="0.85" stroke="${AC}" stroke-opacity="0.25" stroke-width="1.5"/>
    <!-- titlebar -->
    <rect width="370" height="36" rx="12" fill="#221842"/>
    <rect y="24" width="370" height="12" fill="#221842"/>
    <circle cx="18" cy="18" r="6" fill="#ff5f57"/>
    <circle cx="38" cy="18" r="6" fill="#ffbd2e"/>
    <circle cx="58" cy="18" r="6" fill="#28c840"/>
    <text x="185" y="23" text-anchor="middle" font-family="monospace" font-size="11" fill="#ffffff" fill-opacity="0.4">shelby — production</text>
    <!-- terminal lines -->
    <text x="20" y="68" font-family="monospace" font-size="12" fill="${AC}" fill-opacity="0.9">&gt; shelby.run()</text>
    <text x="20" y="92" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.55">↳ Heartbeat loop active [12:04 UTC]</text>
    <text x="20" y="118" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.55">↳ Memory: ChromaDB — 847 vectors</text>
    <text x="20" y="144" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.55">↳ Tool use: web_search, time, rag</text>
    <text x="20" y="172" font-family="monospace" font-size="12" fill="${AC2}" fill-opacity="0.85">&gt; "Remind me tomorrow at 9am"</text>
    <text x="20" y="198" font-family="monospace" font-size="11" fill="#ffffff" fill-opacity="0.4">  Scheduled via Telegram · ✓ confirmed</text>
    <text x="20" y="226" font-family="monospace" font-size="12" fill="${AC}" fill-opacity="0.9">&gt; eval.run(faithfulness=0.94)</text>
    <text x="20" y="252" font-family="monospace" font-size="11" fill="#ffffff" fill-opacity="0.4">  LangChain evals · relevance: 0.91</text>
    <!-- blinking cursor -->
    <rect x="20" y="272" width="8" height="14" fill="${AC}" fill-opacity="0.8" rx="1"/>
  </g>

  <!-- text (left) -->
  <g font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    <!-- live badge -->
    <circle cx="46" cy="128" r="6" fill="#34d399"/>
    <text x="62" y="134" font-size="14" letter-spacing="3" font-weight="700" fill="#86efac">LIVE PROJECT</text>
    <!-- title -->
    <text x="40" y="240" font-size="86" font-weight="800" fill="#ffffff" letter-spacing="-3">Shelby</text>
    <!-- tagline -->
    <text x="42" y="290" font-size="18" letter-spacing="1.5" font-weight="600" fill="#ffffff" fill-opacity="0.5">AUTONOMOUS AI AGENT</text>
    <!-- stack chips -->
    <g transform="translate(40, 330)">
      <rect width="110" height="28" rx="14" fill="${AC}" fill-opacity="0.18" stroke="${AC}" stroke-opacity="0.4" stroke-width="1"/>
      <text x="55" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC}">Claude API</text>
    </g>
    <g transform="translate(162, 330)">
      <rect width="90" height="28" rx="14" fill="${AC2}" fill-opacity="0.14" stroke="${AC2}" stroke-opacity="0.35" stroke-width="1"/>
      <text x="45" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC2}">FastAPI</text>
    </g>
    <g transform="translate(264, 330)">
      <rect width="100" height="28" rx="14" fill="${AC}" fill-opacity="0.14" stroke="${AC}" stroke-opacity="0.3" stroke-width="1"/>
      <text x="50" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC}" fill-opacity="0.9">ChromaDB</text>
    </g>
    <g transform="translate(40, 375)">
      <rect width="80" height="28" rx="14" fill="${AC2}" fill-opacity="0.14" stroke="${AC2}" stroke-opacity="0.3" stroke-width="1"/>
      <text x="40" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC2}" fill-opacity="0.9">RAG</text>
    </g>
    <g transform="translate(132, 375)">
      <rect width="120" height="28" rx="14" fill="${AC}" fill-opacity="0.12" stroke="${AC}" stroke-opacity="0.25" stroke-width="1"/>
      <text x="60" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC}" fill-opacity="0.85">LangChain</text>
    </g>
    <g transform="translate(264, 375)">
      <rect width="96" height="28" rx="14" fill="${AC2}" fill-opacity="0.12" stroke="${AC2}" stroke-opacity="0.22" stroke-width="1"/>
      <text x="48" y="18.5" text-anchor="middle" font-size="12" font-weight="600" fill="${AC2}" fill-opacity="0.8">Telegram</text>
    </g>
  </g>

  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5"/>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile("public/img/shelby.webp");
console.log("✓ public/img/shelby.webp");
