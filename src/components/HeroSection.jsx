// src/components/HeroSection.jsx
import { m } from "framer-motion";

// Premium staggered entrance — each line rises out from behind a mask.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const line = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { type: "spring", stiffness: 140, damping: 20, mass: 0.6 },
  },
};
const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.8, 0.26, 0.99] } },
};

export default function HeroSection() {
  const scrollToProjects = () => {
    const target =
      document.querySelector("#projects") ||
      document.querySelector("#gallery") ||
      document.querySelector("#work");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-wrap">
      <m.div variants={container} initial="hidden" animate="show">
        {/* Big headline — line-masked reveal */}
        <h1 className="hero-title">
          {["I craft tools", "that hustle as hard", "as you do"].map((t) => (
            <span className="hero-line" key={t}>
              <m.span className="hero-line-inner" variants={line}>
                {t}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <m.p className="hero-sub" variants={fade}>
          I design innovative solutions that captivate audiences,
          <br />
          and every interaction inspires action
        </m.p>

        {/* CTA */}
        <m.div className="hero-cta" variants={fade}>
          <button className="cta-primary" onClick={scrollToProjects}>
            View Projects
          </button>
          <a className="cta-secondary" href="#contact">
            Contact
          </a>
        </m.div>
      </m.div>
    </section>
  );
}
