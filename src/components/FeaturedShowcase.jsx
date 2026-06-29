import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Logiastro",
    subtitle: "Logistics news with geo filters — Next.js + PostgreSQL",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.webp",
  },
  {
    title: "BLE Tracking",
    subtitle: "Raspberry Pi + MERN telemetry dashboards",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.webp",
  },
  {
    title: "HoliHealth",
    subtitle: "Ops monitoring with audits & reports — Laravel",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.webp",
  },
  {
    title: "Mega-Auto",
    subtitle: "Car bidding monorepo — Nuxt, Nest, TS, MongoDB",
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
  hidden: { opacity: 1, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 18 },
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
        <motion.div
          className="showcase-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((p) => (
            <motion.article
              className="showcase-card"
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
                aria-label={`${p.title} — view on GitHub`}
              >
                <div className="showcase-media">
                  <img
                    src={p.img}
                    alt={`${p.title} project screenshot`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="showcase-shine" aria-hidden="true" />
                </div>
                <div className="showcase-body">
                  <div className="showcase-text">
                    <h3 className="showcase-title">{p.title}</h3>
                    <p className="showcase-desc">{p.subtitle}</p>
                  </div>
                  <span className="showcase-cta">View Project ↗</span>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
