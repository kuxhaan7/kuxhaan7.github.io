// src/components/FoldersGrid.jsx
import React, { Suspense, lazy, useState } from "react";
import { m } from "framer-motion";
import { projects } from "../data/projects";

// The modal is only needed once a card is opened — split it out of the
// critical path so it never blocks first paint.
const ImageModal = lazy(() => import("./ImageModal"));

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// opacity stays 1 in both states on purpose — project cards must never be
// invisible even if the scroll-reveal observer doesn't run. We animate a
// subtle rise + scale, so a paused/failed reveal still shows full content.
const card = {
  hidden: { opacity: 1, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 130, damping: 20, mass: 0.7 },
  },
};

export default function FoldersGrid() {
  const [viewer, setViewer] = useState(null);

  return (
    <section className="projects-section" id="gallery">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          Tap any project to flip through the full set of screenshots.
        </p>

        <m.div
          className="projects-grid"
          role="list"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((p) => {
            const cover = p.images?.[0];
            const count = p.images?.length || 0;
            return (
              <m.article
                role="listitem"
                key={p.title}
                className="projectCard"
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onClick={() => setViewer(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setViewer(p);
                  }
                }}
                tabIndex={0}
                aria-label={`${p.title} — open ${count} screenshots`}
              >
                <div className="projectMedia">
                  {cover && (
                    <img
                      src={cover}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="projectShine" aria-hidden="true" />
                  <span className="projectCount" aria-hidden="true">
                    {count} {count === 1 ? "shot" : "shots"}
                  </span>
                </div>

                <div className="projectBody">
                  <div className="projectInfo">
                    <h3 className="projectTitle">{p.title}</h3>
                    <div className="projectChips">
                      {p.chips?.slice(0, 3).map((c) => (
                        <span key={c} className="chip">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  {p.href && (
                    <a
                      className="projectRepo"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${p.title} repository on GitHub`}
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </m.article>
            );
          })}
        </m.div>
      </div>

      {viewer && (
        <Suspense fallback={null}>
          <ImageModal
            project={{
              title: viewer.title,
              desc: viewer.desc || viewer.subtitle || "",
              images: viewer.images || [],
            }}
            onClose={() => setViewer(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
