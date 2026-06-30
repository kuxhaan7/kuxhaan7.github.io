import { ReactLenis } from "lenis/react";
import { LazyMotion, domAnimation } from "framer-motion";
import AppleStylePage from "./AppleStylePage";
import "./index.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  return (
    // LazyMotion + the `m` components (used throughout) load a curated feature
    // set (incl. whileInView) — leaner than eagerly importing the full `motion`.
    <LazyMotion features={domAnimation} strict>
      <ReactLenis
        root
        options={{
          // Buttery smooth scroll; fully disabled for reduced-motion users (a11y).
          smoothWheel: !prefersReducedMotion,
          lerp: prefersReducedMotion ? 1 : 0.1,
          duration: 1.1,
          wheelMultiplier: 1,
          anchors: true, // smooth-scroll in-page #hash links (nav, hero CTA)
        }}
      >
        <AppleStylePage />
      </ReactLenis>
    </LazyMotion>
  );
}
