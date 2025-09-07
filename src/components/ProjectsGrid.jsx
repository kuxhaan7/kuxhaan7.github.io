import React from "react";
import { motion } from "framer-motion";
import TiltCard from "../effects/TiltCard";

const projects = [
  {
    title: "Logiastro",
    desc: "AI-assisted logistics news. Next.js + Prisma + PostgreSQL.",
    link: "https://github.com/kuxhaan7/Logiastro",
    img: "/img/logiastro.webp",
  },
  {
    title: "BLE Tracking",
    desc: "Raspberry Pi + MERN telemetry with live dashboards.",
    link: "https://github.com/kuxhaan7/BLE-tracking-system",
    img: "/img/ble.webp",
  },
  {
    title: "HoliHealth",
    desc: "Warehouse ops monitoring with audits & reports.",
    link: "https://github.com/kuxhaan7/Holihealth",
    img: "/img/holihealth.webp",
  },
  {
    title: "Mega-Auto",
    desc: "Car bidding monorepo: Nuxt, Nest, TypeScript, MongoDB.",
    link: "https://github.com/kuxhaan7/Mega-Auto",
    img: "/img/megaauto.webp",
  },
  {
    title: "Taurus Testing",
    desc: "YAML-driven load tests on top of JMeter/Locust.",
    link: "#",
    img: "/img/taurus.webp",
  },
  {
    title: "Locust Scenarios",
    desc: "Python load tests with user flows & charts.",
    link: "#",
    img: "/img/locust.webp",
  },
  {
    title: "Swift Weather",
    desc: "SwiftUI app with live forecast & geolocation.",
    link: "#",
    img: "/img/weather.webp",
  },
  {
    title: "Expense Tracker (Swift)",
    desc: "SwiftUI + CoreData budgets & analytics.",
    link: "#",
    img: "/img/expense.webp",
  },
];

export default function ProjectsGrid() {
  return (
    <section className="projects-section" aria-labelledby="grid-heading">
      <div className="container">
        <h2 id="grid-heading" style={{ letterSpacing: "-.02em", margin: "0 0 16px" }}>
          Projects
        </h2>

        <div className="tiles">
          {projects.map((p, i) => (
            <TiltCard key={p.title} className="tile">
              <motion.a
                href={p.link}
                target={p.link === "#" ? "_self" : "_blank"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="tile-inner"
              >
                <img
                  src={p.img}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="tile-img"
                />
                <div className="tile-body">
                  <h3 className="tile-title">{p.title}</h3>
                  <p className="tile-desc">{p.desc}</p>
                  <span className="tile-cta">Open →</span>
                </div>
              </motion.a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
