// src/effects/BackgroundFX.jsx
import { useEffect, useRef } from "react";

/**
 * Ultra-light BG:
 * - 2 small CSS radial blobs (no blur, no blend)
 * - a faint lamp that activates only while the pointer moves (then fades & sleeps)
 * - transform-only (GPU) updates, throttled with rAF and idle timeout
 * - auto-disables on touch devices / reduced motion
 */
export default function BackgroundFX() {
  const rootRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion & touch devices (cheapest path)
    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia?.("(pointer: coarse)").matches;
    if (prefersReduce || isTouch) return;

    const root = rootRef.current;
    if (!root) return;

    const lamp = root.querySelector(".lamp-lite");
    let raf = 0;
    let idleTimer;

    const onMove = (e) => {
      // wake up lamp briefly
      lamp.style.opacity = "1";
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => (lamp.style.opacity = "0"), 900);

      // throttle to one rAF tick
      cancelAnimationFrame(raf);
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      raf = requestAnimationFrame(() => {
        // update CSS vars (cheap)
        root.style.setProperty("--x", x + "%");
        root.style.setProperty("--y", y + "%");
      });
    };

    // stop work when hidden
    const onVis = () => { if (document.hidden) lamp.style.opacity = "0"; };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div className="bg-lite" ref={rootRef} aria-hidden>
      <div className="blob-lite b1" />
      <div className="blob-lite b2" />
      <div className="lamp-lite" />
    </div>
  );
}
