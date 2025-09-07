import React from "react";
import { motion } from "framer-motion";
import TiltCard from "../effects/TiltCard";

export default function ProjectCard({ title, desc, link, img, delay=0 }) {
  return (
    <TiltCard className="card">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, delay }}
      >
        {img ? (
          <img src={img} alt={`${title} screenshot`} loading="lazy"
               style={{ width:"100%", borderRadius:12, border:"1px solid var(--border)", marginBottom:12, transform: "translateZ(30px)" }} />
        ) : null}
        <h3 style={{ transform: "translateZ(20px)" }}>{title}</h3>
        <p style={{ transform: "translateZ(18px)" }}>{desc}</p>
        <a className="link" href={link} target="_blank" rel="noreferrer" style={{ transform: "translateZ(18px)" }}>
          Open →
        </a>
      </motion.div>
    </TiltCard>
  );
}
