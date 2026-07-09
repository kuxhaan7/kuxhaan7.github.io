// src/effects/Reveal.jsx
import { m } from "framer-motion";

/**
 * Scroll-reveal wrapper: content focuses in (fade + blur + rise) as it enters
 * the viewport. Transform/opacity only, so it degrades gracefully. Used across
 * the site to give a continuous, smooth reveal cadence while scrolling.
 */
export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 28,
  once = true,
}) {
  const Tag = m[as] || m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.7, ease: [0.22, 0.8, 0.26, 0.99], delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Heading mask-reveal: the text rises out from behind a clip mask. Best for
 * short, single-line headings (wrapping would be clipped).
 */
export function MaskReveal({ children, className, delay = 0 }) {
  return (
    <span className={`reveal-mask ${className || ""}`}>
      <m.span
        className="reveal-mask-inner"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 130, damping: 20, mass: 0.7, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}
