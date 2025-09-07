import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Global cursor ring + glow that follows the pointer */
export default function CursorEffects() {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  const gx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.8 });
  const gy = useSpring(y, { stiffness: 120, damping: 30, mass: 0.8 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const down = () => document.documentElement.classList.add("is-clicking");
    const up   = () => document.documentElement.classList.remove("is-clicking");
    const hoverOn = (e) => {
      const target = e.target.closest("a,button,.magnet,.card");
      document.documentElement.classList.toggle("cursor-hover", !!target);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", hoverOn);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", hoverOn);
    };
  }, [x, y]);

  return (
    <>
      {/* ring */}
      <motion.div
        className="cursor-ring"
        style={{ translateX: sx, translateY: sy }}
        aria-hidden
      />
      {/* glow */}
      <motion.div
        className="cursor-glow"
        style={{ translateX: gx, translateY: gy }}
        aria-hidden
      />
    </>
  );
}
