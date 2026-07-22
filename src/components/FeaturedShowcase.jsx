import React from "react";
import { m } from "framer-motion";

const features = [
  // ── Live products ─────────────────────────────────────────────────────────
  {
    title: "Shelby — Autonomous AI Agent",
    subtitle:
      "Persistent AI agent built on Claude API with tool use, ChromaDB RAG memory, and LangChain evals. Talks over Telegram · FastAPI backend deployed on Railway.",
    link: "https://shelby-ai-production.up.railway.app/",
    img: "/img/shelby.webp",
    cta: "View Live App ↗",
    hero: true,
  },
  {
    title: "RouteRx + DelRX",
    subtitle:
      "Live delivery system — RouteRx (React · Vite · Firebase) optimizes dispatch routes; DelRX captures signed proof-of-delivery via signature_pad on Firestore.",
    link: "https://rowdyroad7.github.io/",
    img: "/img/routerx.webp",
    cta: "View Live App ↗",
    wide: true,
  },
  // ── Selected projects ──────────────────────────────────────────────────────
  {
    title: "Logiastro",
    subtitle: "Logistics news hub with geo filters — Next.js + PostgreSQL",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.webp",
  },
  {
    title: "BLE Tracking",
    subtitle: "Raspberry Pi + MERN IoT telemetry dashboards for 200+ workers",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.webp",
  },
  {
    title: "HoliHealth",
    subtitle: "Ops monitoring with audits & automated reports — Laravel",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.webp",
  },
  {
    title: "Mega-Auto",
    subtitle: "Car bidding monorepo — Nuxt UI, NestJS, TypeScript, MongoDB",
    link: "https://github.com/kuxhaan7/Mega-Auto",
    img: "/img/megaauto.webp",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// NOTE: opacity stays 1 in both states on purpose — the cards must never be
// invisible even if the entrance animation doesn't run. We animate a subtle
// slide + scale only, so a failed/paused animation still shows full content.
const cardVariant = {
  hidden: { opacity: 1, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20, mass: 0.7 },
  },
};

export default function FeaturedShowcase() {
  return (
    <section className="showcase" id="projects">
      <div className="container">
        <h2 className="showcase-heading">Featured Work</h2>
        <p className="showcase-sub">
          A selection of products I&apos;ve designed, built, and shipped.
        </p>

        {/* Mount-based staggered entrance — guaranteed to reveal (no dependency
            on a scroll trigger that could leave cards invisible). */}
        <m.div
          className="showcase-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((p) => {
            const cardClass = `showcase-card${
              p.hero ? " showcase-card--hero" : p.wide ? " showcase-card--wide" : ""
            }`;
            const isFullWidth = p.hero || p.wide;
            return (
              <m.article
                className={cardClass}
                key={p.title}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <a
                  className="showcase-link"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.title} — ${p.cta ? "open live app" : "view on GitHub"}`}
                >
                  <div className="showcase-media">
                    <img
                      src={p.img}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="showcase-shine" aria-hidden="true" />
                  </div>
                  <div className="showcase-body">
                    <div className="showcase-text">
                      {/* hero/wide cards show their title in the thumbnail */}
                      {!isFullWidth && <h3 className="showcase-title">{p.title}</h3>}
                      <p className="showcase-desc">{p.subtitle}</p>
                    </div>
                    <span className="showcase-cta">{p.cta || "View Project ↗"}</span>
                  </div>
                </a>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
