import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** 3D tilt + parallax for cards (GPU only) */
export default function TiltCard({ children, maxTilt = 10, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 15 });
  const sy = useSpring(my, { stiffness: 200, damping: 15 });

  const rx = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const ry = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
