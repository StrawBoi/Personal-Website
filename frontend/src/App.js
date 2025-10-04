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

      <footer className="border-t border-white/10 py-14" style={{ background: '#000000' }} data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-white font-semibold text-lg mb-3" style={{ color: '#14b8a6' }}>About</p>
              <p className="text-gray-400 mt-2 leading-relaxed">Creative technologist bridging customer insight, engineering and strategy to deliver measurable outcomes.</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-3" style={{ color: '#14b8a6' }}>Contact</p>
              <ul className="mt-2 space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:Ahmed.ha.mahmoud@outlook.com" className="hover:text-teal-400 transition-colors">Ahmed.ha.mahmoud@outlook.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+32490364804" className="hover:text-teal-400 transition-colors">+32 490 36 48 04</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/ahmed-mohsen-hanafy/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">linkedin.com/in/ahmed-mohsen-hanafy</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-3" style={{ color: '#14b8a6' }}>Quick Links</p>
              <ul className="mt-2 space-y-2 text-gray-300">
                <li><a href="#story" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">→</span>My Journey</a></li>
                <li><a href="#featured-project" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">→</span>Featured Project</a></li>
                <li><a href="#portfolio" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">→</span>Case Studies</a></li>
                <li><a href="#contact" className="hover:text-teal-400 transition-colors flex items-center gap-2"><span className="text-teal-400">→</span>Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-gray-600 text-xs text-center">
            <p>© 2025 Ahmed Mostafa. Crafted with passion and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;