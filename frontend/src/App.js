import React from "react";
import "./App.css";
import CinematicHero from "./components/CinematicHero";
import JourneyTimeline from "./components/JourneyTimeline";
import CaseStudies from "./components/CaseStudies";
import Toolkit from "./components/Toolkit";
import Contact from "./components/Contact";
import GlobalBackground from "./components/GlobalBackground";

const scrollStyles = `
  html { scroll-behavior: smooth; scroll-padding-top: 80px; }
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #1e293b; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #10b981, #f59e0b, #3b82f6); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #059669, #d97706, #2563eb); }
  ::selection { background: rgba(16,185,129,0.3); color: white; }
  section { position: relative; overflow: hidden; }
`;

function App() {
  return (
    <div className="App" data-testid="app-root">
      <GlobalBackground />
      <style>{scrollStyles}</style>

      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10" data-testid="navbar">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl" data-testid="navbar-brand">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Portfolio</span>
            </div>
            <div className="hidden md:flex space-x-8" data-testid="navbar-links">
              <a href="#hero" data-testid="nav-home-link" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a>
              <a href="#story" data-testid="nav-story-link" className="text-gray-300 hover:text-white transition-colors duration-300">My Journey</a>
              <a href="#portfolio" data-testid="nav-projects-link" className="text-gray-300 hover:text-white transition-colors duration-300">Case Studies</a>
              <a href="#skills" data-testid="nav-skills-link" className="text-gray-300 hover:text-white transition-colors duration-300">Toolkit &amp; Expertise</a>
              <a href="#contact" data-testid="nav-contact-link" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <main data-testid="main-content">
        <section id="hero" data-testid="section-hero"><CinematicHero /></section>
        <section id="story" data-testid="section-journey"><JourneyTimeline /></section>
        <section id="portfolio" data-testid="section-case-studies"><CaseStudies /></section>
        <section id="skills" data-testid="section-toolkit"><Toolkit /></section>
        <section id="contact" data-testid="section-contact"><Contact /></section>
      </main>

      <footer className="bg-slate-900 border-t border-white/10 py-12" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="border-t border-white/10 pt-4">
              <p className="text-gray-500 text-sm">© 2025 Ahmed Mostafa. Crafted with passion and precision.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;