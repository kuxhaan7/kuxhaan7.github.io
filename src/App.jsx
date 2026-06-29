import { ReactLenis } from "lenis/react";
import AppleStylePage from "./AppleStylePage";
import "./index.css";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  return (
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
  );
}
