import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Wrap any element to give it a subtle magnetic pull toward the cursor */
export default function Magnetic({ children, strength = 24, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block", translateX: sx, translateY: sy }}
      className={className || "magnet"}
    >
      {children}
    </motion.span>
  );
}
