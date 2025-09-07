import React, { useState } from "react";
import ImageModal from "./ImageModal";

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


export default function FoldersGrid() {
  const [open, setOpen] = useState(null); // holds the project object

  return (
    <section className="folders-section" id="work">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="folders-grid">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className="folderCard"
              onClick={() => setOpen(p)}
              aria-label={`Open ${p.title} gallery`}
            >
              <div className="folderShape" aria-hidden>
                <div className="folderTab" />
                <div className="folderPocket" />
              </div>

              <div className="folderMeta">
                <h3 className="folderTitle">{p.title}</h3>
                <p className="folderDesc">{p.desc}</p>
                <div className="folderChips">
                  {p.tags.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* “peek” image sitting inside the folder */}
              <div className="folder-media">
                <img src={p.thumb} alt="" loading="lazy" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal viewer */}
      {open && (
        <ImageModal
          project={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
