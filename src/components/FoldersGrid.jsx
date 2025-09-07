// src/components/FoldersGrid.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects as folders } from "../data/projects";

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
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="folders-section" id="folders">
      <div className="folders-grid" role="list">
        {folders.map((f, idx) => {
          const isOpen = openIdx === idx;
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
              onHoverStart={() => setOpenIdx(idx)}
              onHoverEnd={() => setOpenIdx(null)}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              tabIndex={0}
              onFocus={() => setOpenIdx(idx)}
              onBlur={() => setOpenIdx(null)}
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

                {/* +N badge if more screenshots exist */}
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
                <a className="viewAll" href={f.href} target="_blank" rel="noreferrer">
                  View Project ↗
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
