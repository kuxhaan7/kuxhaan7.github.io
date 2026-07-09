// src/components/HeroSection.jsx
import { m, useScroll, useTransform } from "framer-motion";
import Magnetic from "../effects/Magnetic";

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
  // Scroll-linked parallax: the hero content drifts up and fades as it leaves.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -90]);
  const opacity = useTransform(scrollY, [0, 460], [1, 0]);

  const scrollToProjects = () => {
    const target =
      document.querySelector("#projects") ||
      document.querySelector("#gallery") ||
      document.querySelector("#work");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-wrap">
      <m.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y, opacity }}
      >
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

        {/* CTA — magnetic pull toward the cursor for a tactile feel */}
        <m.div className="hero-cta" variants={fade}>
          <Magnetic strength={26} className="mag-cta">
            <button className="cta-primary" onClick={scrollToProjects}>
              View Projects
            </button>
          </Magnetic>
          <Magnetic strength={22} className="mag-cta">
            <a className="cta-secondary" href="#contact">
              Contact
            </a>
          </Magnetic>
        </m.div>
      </m.div>
    </section>
  );
}
