import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";

// put screenshots under /public/img/ if you have them
const projects = [
  {
    title: "Logiastro",
    desc: "Next.js + PostgreSQL logistics news with geo filters.",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.jpg",
  },
  {
    title: "BLE Tracking",
    desc: "Raspberry Pi + MERN telemetry with live dashboards.",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.jpg",
  },
  {
    title: "HoliHealth",
    desc: "Laravel ops monitoring with audits & reports.",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.jpg",
  },
];
export default function PortfolioGallery() {
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const o1 = useTransform(scrollYProgress, [0.0, 0.2, 0.35], [1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.65, 0.8, 1.0], [0, 1, 1]);

  return (
    <>
      <section ref={stickyRef} className="sticky-wrap" id="work" aria-label="Sticky product section">
        <div className="sticky-viewport">
          <motion.div className="device" style={{ scale }}>
            <div className="device-screen" />
          </motion.div>
          <div className="copy">
            <motion.p style={{ opacity:o1 }}>Blazing-fast UIs with motion that feels invisible.</motion.p>
            <motion.p style={{ opacity:o2 }}>Robust APIs, clean data models, and safe deployments.</motion.p>
            <motion.p style={{ opacity:o3 }}>Built for reliability: monitoring, CI/CD, accessibility.</motion.p>
          </div>
        </div>
      </section>

      {/* <section className="cards" aria-labelledby="projects-heading">
        <div className="container">
          <h2 id="projects-heading" style={{ letterSpacing:"-.02em", margin:"0 0 14px" }}>Projects</h2>
          <div className="grid">
            {projects.map((p, i) => <ProjectCard key={p.title} {...p} delay={i*0.1} />)}
          </div>
        </div>
      </section> */}
      
    </>
  );
}
