import React from "react";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CursorEffects from "./effects/CursorEffects";
import BackgroundFX from "./effects/BackgroundFX";
import FeaturedShowcase from "./components/FeaturedShowcase";

import FoldersGrid from "./components/FoldersGrid";

export default function AppleStylePage() {
  return (
    <main id="main">
      {/* ⬇️ Mount the background once, behind all content */}
      <BackgroundFX />

      <NavigationBar />
      <HeroSection />

      {/* Make #work a real anchor target for the nav */}
      <section id="work">
        <FeaturedShowcase />
        <FoldersGrid />
      </section>

      {/* AboutSection and ContactSection own their own #about / #contact ids */}
      <AboutSection />
      <ContactSection />

      <CursorEffects />
    </main>
  );
}
