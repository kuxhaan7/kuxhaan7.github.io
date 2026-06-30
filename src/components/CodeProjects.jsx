// src/components/CodeProjects.jsx
import React from "react";
import { m } from "framer-motion";
import { Bot, Activity, ScanLine, BrainCircuit, Workflow, FileText, ArrowUpRight } from "lucide-react";
import { codeProjects } from "../data/codeProjects";

const ICONS = {
  bot: Bot,
  activity: Activity,
  scan: ScanLine,
  brain: BrainCircuit,
  workflow: Workflow,
  file: FileText,
};

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

// opacity stays 1 in both states — cards must never be invisible if the
// scroll-reveal observer doesn't run (matches the rest of the site).
const card = {
  hidden: { opacity: 1, y: 34, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 21, mass: 0.7 },
  },
};

export default function CodeProjects() {
  return (
    <section className="code-section" id="code" aria-label="Code and AI projects">
      <div className="container">
        <h2 className="section-title">Code &amp; AI</h2>
        <p className="section-sub">
          Agents, ML pipelines, and automation — the engineering behind the screens.
        </p>

        <m.div
          className="code-grid"
          role="list"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {codeProjects.map((p) => {
            const Icon = ICONS[p.icon] || Bot;
            return (
              <m.a
                role="listitem"
                key={p.title}
                className="codeCard"
                href={p.href}
                target="_blank"
                rel="noreferrer"
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                aria-label={`${p.title} — view on GitHub`}
              >
                <div className="codeTop">
                  <span className="codeIcon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <ArrowUpRight className="codeArrow" size={18} aria-hidden="true" />
                </div>

                <h3 className="codeTitle">{p.title}</h3>
                <p className="codeDesc">{p.desc}</p>

                <div className="codeTags">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </m.a>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
