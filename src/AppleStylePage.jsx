import React, { useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import PortfolioGallery from "./components/PortfolioGallery";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
// import ProjectsGrid from "./components/ProjectsGrid";
import CursorEffects from "./effects/CursorEffects";
import BackgroundFX from "./effects/BackgroundFX";
import FeaturedShowcase from "./components/FeaturedShowcase";

import FoldersGrid from "./components/FoldersGrid";

export default function AppleStylePage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  return (
    <div id="main">
      {/* ⬇️ Mount the background once, behind all content */}
      <BackgroundFX />

      <NavigationBar />
      <HeroSection />

      {/* Make #work a real anchor target for the nav */}
      <section id="work">
        <FeaturedShowcase />
        <FoldersGrid />
      </section>

      {/* Ensure these anchors exist too */}
      <section id="about"><AboutSection /></section>
      <section id="contact"><ContactSection /></section>

      <CursorEffects />
    </div>
  );
}
