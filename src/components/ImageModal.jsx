// src/components/ImageModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal({ project, onClose }) {
  const panelRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1); // grid view first

  useEffect(() => setMounted(true), []);

  // lock scroll + esc/arrow keys
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (focusIdx >= 0) {
        if (e.key === "ArrowRight") setFocusIdx((i) => Math.min(i + 1, project.images.length - 1));
        if (e.key === "ArrowLeft") setFocusIdx((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [focusIdx, onClose, project.images.length]);

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  // subtle 3D tilt on thumbnails
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 7;
    el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const backdrop = (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        onMouseDown={handleBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="lightbox-panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} images`}
          ref={panelRef}
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 0.8, 0.26, 0.99] }}
        >
          <div className="lightbox-top">
            <div className="lb-meta">
              <div className="lb-logo">{project.title[0]}</div>
              <div>
                <h3 className="lb-title">{project.title}</h3>
                <div className="lb-sub">{project.desc}</div>
              </div>
            </div>
            <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {focusIdx === -1 ? (
            <div className="lightbox-grid">
              {project.images.map((src, idx) => (
                <motion.button
                  key={src}
                  className="lb-card"
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                  onClick={() => setFocusIdx(idx)}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.24, delay: idx * 0.05 }}
                  aria-label={`Open image ${idx + 1}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="lb-frame">
                    <img className="lb-img" src={src} alt={`${project.title} ${idx + 1}`} loading="lazy" />
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="lightbox-focus">
              <button className="nav prev" onClick={() => setFocusIdx(Math.max(0, focusIdx - 1))} aria-label="Previous">‹</button>
              <motion.div
                key={project.images[focusIdx]}
                className="focus-frame"
                initial={{ opacity: 0, rotateX: 8, scale: 0.98 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: -8, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img src={project.images[focusIdx]} alt={`${project.title} ${focusIdx + 1}`} />
              </motion.div>
              <button className="nav next" onClick={() => setFocusIdx(Math.min(project.images.length - 1, focusIdx + 1))} aria-label="Next">›</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(backdrop, document.body);
}
