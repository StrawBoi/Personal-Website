import React, { useRef } from "react";
import "./App.css";
import CinematicHero from "./components/CinematicHero";
import JourneyPortalsStatic from "./components/JourneyPortalsStatic";
import FeaturedProject from "./components/FeaturedProject";
import CaseStudies from "./components/CaseStudies";
import Toolkit from "./components/Toolkit";
import Contact from "./components/Contact";
import GlobalBackground from "./components/GlobalBackground";
import DataStream from "./components/DataStream";

const scrollStyles = `
  html { scroll-behavior: smooth; scroll-padding-top: 80px; }
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #10b981, #0891b2); border-radius: 4px; }
  ::selection { background: rgba(16,185,129,0.3); color: white; }
  section { position: relative; overflow: visible; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

function App() {
  const mainRef = useRef(null);
  const sectionIds = ["hero", "story", "featured-project", "portfolio", "skills", "contact"];

  return (
    <div className="App" data-testid="app-root">
      <GlobalBackground />
      <style>{scrollStyles}</style>

      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10" data-testid="navbar">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl" data-testid="navbar-brand">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Portfolio</span>
            </div>
            <div className="hidden md:flex space-x-8" data-testid="navbar-links">
              <a href="#hero" data-testid="nav-home-link" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
              <a href="#story" data-testid="nav-story-link" className="text-gray-300 hover:text-white transition-colors duration-300">My Journey</a>
              <a href="#featured-project" data-testid="nav-featured-link" className="text-gray-300 hover:text-white transition-colors duration-300">Featured Project</a>
              <a href="#portfolio" data-testid="nav-projects-link" className="text-gray-300 hover:text-white transition-colors duration-300">Case Studies</a>
              <a href="#skills" data-testid="nav-skills-link" className="text-gray-300 hover:text-white transition-colors duration-300">Toolkit &amp; Expertise</a>
              <a href="#contact" data-testid="nav-contact-link" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <DataStream mainRef={mainRef} sectionIds={sectionIds} />

      <main ref={mainRef} className="relative" data-testid="main-content">
        <section id="hero" data-testid="section-hero"><CinematicHero /></section>
        <section id="story" data-testid="section-journey"><JourneyPortalsStatic /></section>
        <section id="featured-project" data-testid="section-featured-project"><FeaturedProject /></section>
        <section id="portfolio" data-testid="section-case-studies"><CaseStudies /></section>
        <section id="skills" data-testid="section-toolkit"><Toolkit /></section>
        <section id="contact" data-testid="section-contact"><Contact /></section>
      </main>

      <footer className="bg-black border-t border-white/10 py-14" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold text-lg">About</p>
              <p className="text-gray-400 mt-2">Creative technologist bridging customer insight, engineering and strategy to deliver measurable outcomes.</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Contact</p>
              <ul className="mt-2 space-y-1 text-gray-300">
                <li><a href="mailto:Ahmed.ha.mahmoud@outlook.com" className="hover:text-teal-400">Ahmed.ha.mahmoud@outlook.com</a></li>
                <li><a href="tel:+32490364804" className="hover:text-teal-400">+32 490 36 48 04</a></li>
                <li><a href="https://www.linkedin.com/in/ahmed-mohsen-hanafy/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">linkedin.com/in/ahmed-mohsen-hanafy</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Links</p>
              <ul className="mt-2 space-y-1 text-gray-300">
                <li><a href="#story" className="hover:text-teal-400">My Journey</a></li>
                <li><a href="#featured-project" className="hover:text-teal-400">Featured Project</a></li>
                <li><a href="#portfolio" className="hover:text-teal-400">Case Studies</a></li>
                <li><a href="#contact" className="hover:text-teal-400">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-gray-600 text-xs">© 2025 Ahmed Mostafa. Crafted with passion and precision.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;