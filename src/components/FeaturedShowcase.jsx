import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Logiastro",
    subtitle: "Logistics news with geo filters — Next.js + PostgreSQL",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.jpg",
    logo: "/img/logiastro-logo.jpg",
  },
  {
    title: "BLE Tracking",
    subtitle: "Raspberry Pi + MERN telemetry dashboards",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.jpg",
    logo: "/img/ble-logo.jpg",
  },
  {
    title: "HoliHealth",
    subtitle: "Ops monitoring with audits & reports — Laravel",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.jpg",
    logo: "/img/holihealth-logo.jpg",
  },
  {
    title: "Mega-Auto",
    subtitle: "Car bidding monorepo — Nuxt, Nest, TS, MongoDB",
    link: "https://github.com/kuxhaan7/Mega-Auto",
    img: "/img/megaauto.jpg",
  },
];

// scroll reveal (stagger) for the stack
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
};

// hover states controlled by the parent article
const imgV = {
  rest: { scale: 1 },
  hover: {
    scale: 0.96,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};
const barV = {
  rest: { opacity: 0, y: 12, filter: "blur(8px)" },
  hover: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function FeaturedShowcase() {
  return (
    <section className="feature-section" id="projects">
      <motion.div
        className="container feature-wrap"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {features.map((p) => (
          <motion.article
            key={p.title}
            className="feature-card"
            variants={item}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <div className="feature-media">
              <motion.img
                src={p.img}
                alt={`${p.title} screenshot`}
                loading="lazy"
                variants={imgV}
              />
            </div>

            {/* pill bar – appears on hover */}
            <motion.div className="feature-bar" variants={barV}>
              <div className="feature-id">
                {p.logo ? (
                  <img className="feature-logo" src={p.logo} alt="" />
                ) : (
                  <div className="feature-logo fallback">{p.title[0]}</div>
                )}
                <div className="feature-text">
                  <div className="feature-name">{p.title}</div>
                  <div className="feature-sub">{p.subtitle}</div>
                </div>
              </div>
              <a
                className="feature-cta"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                View Project ↗
              </a>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
