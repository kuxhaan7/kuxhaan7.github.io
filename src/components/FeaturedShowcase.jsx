import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const features = [
  {
    title: "Logiastro",
    subtitle: "Logistics news with geo filters — Next.js + PostgreSQL",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.jpg",
    
  },
  {
    title: "BLE Tracking",
    subtitle: "Raspberry Pi + MERN telemetry dashboards",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.jpg",
    
  },
  {
    title: "HoliHealth",
    subtitle: "Ops monitoring with audits & reports — Laravel",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.jpg",
    
  },
  {
    title: "Mega-Auto",
    subtitle: "Car bidding monorepo — Nuxt, Nest, TS, MongoDB",
    link: "https://github.com/kuxhaan7/Mega-Auto",
    img: "/img/megaauto.jpg",
  },
];

export default function FeaturedShowcase() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  // Work out which card is currently “active” in the sticky band
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(features.length - 1, Math.max(0, Math.floor(v * features.length)));
    setActive(idx);
  });

  return (
    <section className="stack-section" id="projects">
      <div className="container">
        <h2 className="stack-heading">Featured Work</h2>
      </div>

      <div className="stack-outer" ref={wrapRef} aria-label="Featured projects">
        <div className="stack-sticky">
          {features.map((p, i) => (
            <StackCard
              key={p.title}
              p={p}
              i={i}
              total={features.length}
              progress={scrollYProgress}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ p, i, total, progress, active }) {
  const band = 1 / total;
  const start = i * band;
  const end = (i + 1) * band;

  // Only one card “alive” at a time
  const opacity = useTransform(
    progress,
    [start, start + band * 0.08, end - band * 0.08, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [0.96, 1]);
  const y = useTransform(progress, [start, end], [60, -20]);
  const x = useTransform(progress, [start, start + band * 0.3, end], [i % 2 ? 70 : -70, 0, 0]);

  // Give the active card the top z-index and pointer events
  const isActive = i === active;
  const z = isActive ? 999 : 1;
  const pe = isActive ? "auto" : "none"; // enables hover only on the active card

  return (
    <motion.article
      className="stack-card"
      style={{ opacity, scale, y, x, zIndex: z, pointerEvents: pe }}
      initial={false}
      whileHover={{ scale: 1.01 }}
    >
      <div className="stack-media">
        <img src={p.img} alt={`${p.title} screenshot`} loading="lazy" />
      </div>

      {/* Hover pill — will appear even if the card is only partially in view */}
      <div className="stack-pill">
        <div className="pill-id">
          {p.logo ? (
            <img className="pill-logo" src={p.logo} alt="" />
          ) : (
            <div className="pill-logo fallback">{p.title[0]}</div>
          )}
          <div className="pill-text">
            <div className="pill-name">{p.title}</div>
            <div className="pill-sub">{p.subtitle}</div>
          </div>
        </div>
        <a className="pill-cta" href={p.link} target="_blank" rel="noreferrer">
          View Project ↗
        </a>
      </div>
    </motion.article>
  );
}
