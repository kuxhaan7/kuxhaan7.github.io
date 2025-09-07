// src/components/FoldersGrid.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects as folders } from "../data/projects";
import ImageModal from "./ImageModal"; // <— add this (we'll use the portal modal)

const burstContainer = {
  closed: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  open:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardUp = (i) => ({
  closed: { y: 6, opacity: 0, scale: 0.92, rotate: 0, filter: "blur(4px)" },
  open: {
    y: -70 - i * 40,
    opacity: 1,
    scale: 1,
    rotate: [-4, -2, 2, 4][i % 4],
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
});

export default function FoldersGrid() {
  // one state to control which folder is hovered (for the burst preview)
  const [hoverIdx, setHoverIdx] = useState(null);
  // one state to control the modal viewer (project object or null)
  const [viewer, setViewer] = useState(null);

  return (
    <section className="folders-section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="folders-grid" role="list">
          {folders.map((f, idx) => {
            const isOpen = hoverIdx === idx;
            const previews = f.images?.slice(0, 4) ?? [];
            const extra = Math.max(0, (f.images?.length || 0) - previews.length);

            return (
              <motion.article
                role="listitem"
                key={f.title}
                className="folderCard"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                whileHover="open"
                onHoverStart={() => setHoverIdx(idx)}
                onHoverEnd={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(idx)}
                onBlur={(e) => {
                  // only clear when focus leaves the card entirely
                  if (!e.currentTarget.contains(e.relatedTarget)) setHoverIdx(null);
                }}
                // CLICK OPENS MODAL
                onClick={() => setViewer(f)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setViewer(f);
                  }
                }}
                aria-expanded={isOpen}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                {/* Folder shape */}
                <div className="folderShape" aria-hidden>
                  <div className="folderTab" />
                  <div className="folderPocket" />
                </div>

                {/* Floating burst */}
                <motion.div className="burstWrap" variants={burstContainer} aria-hidden>
                  {previews.map((src, i) => (
                    <motion.div
                      key={src + i}
                      className="burstCard"
                      variants={cardUp(i)}
                      style={{ left: `${28 + i * 72}px`, zIndex: 5 + i }}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </motion.div>
                  ))}
                  {extra > 0 && (
                    <motion.div
                      className="burstCard moreBadge"
                      variants={cardUp(previews.length)}
                      style={{ left: `${28 + previews.length * 72}px`, zIndex: 50 }}
                    >
                      +{extra}
                    </motion.div>
                  )}
                </motion.div>

                {/* Meta */}
                <div className="folderMeta">
                  <div className="folderTitle">{f.title}</div>
                  <div className="folderChips">
                    {f.chips?.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>

                  {/* Keep external link if you like; modal opens on whole card anyway */}
                  {f.href && (
                    <a className="viewAll" href={f.href} target="_blank" rel="noreferrer">
                      Open Repo ↗
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Modal viewer (portal) */}
      {viewer && (
        <ImageModal
          project={{
            title: viewer.title,
            desc: viewer.desc || viewer.subtitle || "",
            images: viewer.images || [],
          }}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
