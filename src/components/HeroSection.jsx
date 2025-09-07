// src/components/HeroSection.jsx
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToProjects = () => {
    const target =
      document.querySelector("#folders") ||
      document.querySelector("#projects") ||
      document.querySelector("#work");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-wrap">
      {/* Name + role */}
      <motion.div
        className="hero-id"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
      
      </motion.div>

      {/* Big headline */}
      <motion.h1
        className="hero-title"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        I craft tools<br />
        that hustle as hard<br />
        as you do
      </motion.h1>

      {/* Subhead */}
      <motion.p
        className="hero-sub"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.35 }}
      >
        I design innovative solutions that captivate audiences,<br />
        and every interaction inspires action
      </motion.p>

      {/* CTA */}
      <motion.div
        className="hero-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <button className="cta-primary" onClick={scrollToProjects}>
          View Projects
        </button>
        <a className="cta-secondary" href="#contact">Contact</a>
      </motion.div>
    </section>
  );
}
