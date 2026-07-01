// Generates the wide hero thumbnail for the RouteRx + DelRX featured tile.
// Route/map motif (dashed path, stops, truck, proof-of-delivery check) on a
// branded gradient. Output: public/img/routerx.webp (2.4:1 to match the hero).
import sharp from "sharp";

const W = 1560;
const H = 650;
const A = "#052a2a"; // deep teal
const B = "#06203a"; // deep blue
const AC = "#2dd4bf"; // teal accent
const AC2 = "#38bdf8"; // blue accent

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${A}"/>
      <stop offset="1" stop-color="${B}"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="18%" r="65%">
      <stop offset="0" stop-color="${AC}" stop-opacity="0.5"/>
      <stop offset="0.55" stop-color="${AC}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${AC}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fill-opacity="0.05"/>
    </pattern>
    <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${AC}"/>
      <stop offset="1" stop-color="${AC2}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- route motif (right side) -->
  <g fill="none">
    <path d="M 880 500 C 1010 500 1030 350 1160 340 S 1380 200 1478 176"
          stroke="url(#route)" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="2 20" opacity="0.95"/>
    <!-- stops -->
    <g>
      <circle cx="880" cy="500" r="17" fill="${AC}"/>
      <circle cx="880" cy="500" r="7" fill="#06203a"/>
      <circle cx="1160" cy="340" r="14" fill="${AC2}"/>
      <circle cx="1160" cy="340" r="6" fill="#06203a"/>
    </g>
  </g>

  <!-- package / truck near the first stop -->
  <g transform="translate(812,430)" stroke="${AC}" stroke-width="3" fill="none">
    <rect x="0" y="14" width="46" height="34" rx="5" fill="${AC}" fill-opacity="0.16"/>
    <path d="M46 22 h18 l14 14 v12 h-32 z" fill="${AC}" fill-opacity="0.16"/>
    <circle cx="14" cy="52" r="7" fill="#06203a"/>
    <circle cx="66" cy="52" r="7" fill="#06203a"/>
  </g>

  <!-- proof-of-delivery check badge at the destination -->
  <g transform="translate(1478,176)">
    <circle r="26" fill="${AC}"/>
    <path d="M -11 1 L -3 10 L 13 -9" stroke="#06203a" stroke-width="5"
          fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- text (left) -->
  <g font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">
    <circle cx="78" cy="163" r="7" fill="#34d399"/>
    <text x="98" y="170" font-size="22" letter-spacing="3" font-weight="700" fill="#9becd8">LIVE PROJECT</text>
    <text x="66" y="340" font-size="82" font-weight="800" fill="#ffffff" letter-spacing="-2">RouteRx + DelRX</text>
    <text x="70" y="415" font-size="24" letter-spacing="2.5" font-weight="600" fill="#ffffff" fill-opacity="0.66">ROUTE OPTIMIZATION · PROOF OF DELIVERY</text>
  </g>

  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
</svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile("public/img/routerx.webp");
console.log("✓ public/img/routerx.webp");
