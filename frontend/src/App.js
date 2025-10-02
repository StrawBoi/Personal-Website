import React, { useState } from "react";
import "./App.css";
import TerminalLanding from "./components/TerminalLanding";
import CinematicHero from "./components/CinematicHero";
import InteractiveJourney from "./components/InteractiveJourney";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import MyStory from "./components/MyStory";
import WorkExperience from "./components/WorkExperience";
import ScrollAnimation from "./components/ScrollAnimation";

// Enhanced scrolling and animation CSS
const scrollStyles = `
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Account for fixed nav */
  }
  
  /* Smooth scroll with easing */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1e293b;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #10b981, #f59e0b, #3b82f6);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #059669, #d97706, #2563eb);
  }
  
  /* Selection color */
  ::selection {
    background: rgba(16, 185, 129, 0.3);
    color: white;
  }
  
  ::-moz-selection {
    background: rgba(16, 185, 129, 0.3);
    color: white;
  }
  
  /* Section spacing */
  section {
    position: relative;
    overflow: hidden;
  }
`;

function App() {
  const [showMainSite, setShowMainSite] = useState(true); // Disabled landing page - set to false to re-enable

  // Landing page disabled - uncomment below to re-enable
  // if (!showMainSite) {
  //   return <TerminalLanding onComplete={() => setShowMainSite(true)} />;
  // }

  return (
    <div className="App">
      <style>{scrollStyles}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-bold text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                Portfolio
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a 
                href="#hero" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Home
              </a>
              <a 
                href="#story" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                My Story
              </a>
              <a 
                href="#experience" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Experience
              </a>
              <a 
                href="#portfolio" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>
        {/* Hero Section - No animation needed, always visible */}
        <section id="hero">
          <CinematicHero />
        </section>

        {/* My Story Section */}
        <ScrollAnimation>
          <section id="story">
            <MyStory />
          </section>
        </ScrollAnimation>

        {/* Experience/Case Studies Section */}
        <ScrollAnimation>
          <section id="experience">
            <WorkExperience />
          </section>
        </ScrollAnimation>

        {/* Projects/Portfolio Section */}
        <ScrollAnimation>
          <section id="portfolio">
            <Portfolio />
          </section>
        </ScrollAnimation>

        {/* Skills Section */}
        <ScrollAnimation>
          <section id="skills">
            <Skills />
          </section>
        </ScrollAnimation>

        {/* Contact Section */}
        <ScrollAnimation>
          <section id="contact">
            <Contact />
          </section>
        </ScrollAnimation>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400">
                  Let's Build Something Amazing Together
                </span>
              </h3>
              <p className="text-gray-400">
                Combining customer empathy, technical excellence, and business strategy
              </p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="mailto:Ahmed.ha.mahmoud@outlook.com" 
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/ahmed-mahmoud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
              >
                Back to Top
              </a>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-500 text-sm">
                © 2024 Ahmed Mostafa. Crafted with passion and precision.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;