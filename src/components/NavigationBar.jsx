import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, FileDown, Menu, X } from "lucide-react";
import Magnetic from "../effects/Magnetic";

const NAV_LINKS = [
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Scroll progress (thin line)
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });

  // Hide-on-scroll (down hides, up shows)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y < 50) setHidden(false);
      else setHidden(y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy (which section is in view)
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <m.nav
      className={`nav ${hidden ? "nav-hide" : ""}`}
      aria-label="Primary"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <a href="#main" className="skip-link">Skip to content</a>

      {/* progress line */}
      <m.div className="nav-progress" style={{ scaleX: width }} />

      <div className="container inner">
        {/* Brand + availability */}
        <Magnetic strength={14}>
          <a href="#main" className="brand">
            Kushaan Kaushik
            <span className="avail">
              <span className="dot" /> Open to work
            </span>
          </a>
        </Magnetic>

        {/* Desktop links */}
        <div className="links">
          {NAV_LINKS.map((l) => (
            <Magnetic key={l.id}>
              <a
                href={l.href}
                data-active={active === l.id}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="actions">
          <a
            className="icon-btn"
            href="https://github.com/kuxhaan7"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            className="icon-btn"
            href="https://www.linkedin.com/in/kushaankaushik/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a className="cta-resume" href="./resume/KKRESUME2026.pdf" target="_blank" rel="noreferrer">
            <FileDown size={16} /> Resume
          </a>
          {/* <button
        //     className="icon-btn hide-sm"
        //     aria-label="Toggle theme"
        //     onClick={() => setDark((v) => !v)}
        //   >
        //     {dark ? <Sun size={18} /> : <Moon size={18} />}
        //   </button> */}

          {/* Mobile toggle */}
          <button
            className="hamburger show-sm"
            aria-expanded={open}
            aria-controls="mobile-panel"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-panel"
            className="mobile-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            onClick={() => setOpen(false)}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={l.href} data-active={active === l.id}>
                {l.label}
              </a>
            ))}
            <a href="./resume/KKRESUME2026.pdf" target="_blank" rel="noreferrer">
              <FileDown size={16} /> Resume
            </a>
            <a href="https://github.com/kuxhaan7" target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kushaankaushik/" target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );
}
