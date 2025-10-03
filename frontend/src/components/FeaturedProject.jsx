import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

const IconData = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconViz = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M4 18V6m5 12V9m5 9V4m5 14V12" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconAI = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="8" stroke="rgba(20,184,166,0.9)" strokeWidth="2"/>
    <path d="M8 12h8M12 8v8" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconTools = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M7 7l10 10M17 7L7 17" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });
  const widthMV = useTransform(scrollYProgress, [0, 0.15, 0.7, 1], ["72vw", "100vw", "100vw", "88vw"]);
  const radiusMV = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [18, 0, 12, 16]);
  const vignetteOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.9], [0, 0.35, 0.35, 0.1]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try { v.muted = true; v.playsInline = true; v.loop = true; v.autoplay = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch {}
  }, []);

  return (
    <section id="featured-project" ref={sectionRef} className="relative" style={{ height: '240vh' }} data-testid="section-featured-project">
      {/* Sticky pinned full viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div style={{ width: widthMV, borderRadius: radiusMV }} className="max-w-[1920px] aspect-video overflow-hidden border border-white/10 bg-black relative" data-testid="featured-video-frame">
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
          <video ref={videoRef} src={VIDEO_SRC} className="w-full h-full object-cover" preload="auto" autoPlay muted loop playsInline />
          <motion.div className="pointer-events-none absolute inset-0 z-20" style={{ opacity: vignetteOpacity }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)' }} />
          </motion.div>
        </motion.div>
      </div>

      {/* After takeover: headline and feature cards with SVG icons */}
      <div className="container mx-auto px-6 mt-24 md:mt-28" data-testid="post-video-content">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="max-w-5xl mx-auto text-center mb-10">
          <h3 className="text-white text-xl md:text-2xl font-medium">
            How can we transition from reactive, manual purchasing to a proactive, data-driven procurement strategy that maximizes savings and provides a real-time competitive edge?
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold flex items-center gap-2"><IconData /> <span>Module 1: Data Collection Core</span></h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Automated tracking of product price and stock from given URLs</li>
              <li>Continuous updates for accurate, real-time market view</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold flex items-center gap-2"><IconViz /> <span>Module 2: Analysis & Visualization Hub</span></h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Historical Price Trend (interactive line chart)</li>
              <li>Competitor Price Comparison (bar chart)</li>
              <li>Category Trend Analysis (area chart)</li>
              <li>Price vs. Popularity (scatter for value ranking)</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold flex items-center gap-2"><IconAI /> <span>Module 3: AI Insight Layer</span></h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Anomaly detection for outlier price events</li>
              <li>Trend analysis & simple forecasting</li>
              <li>Strategic recommendations (e.g., "3-month low: buy now")</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold flex items-center gap-2"><IconTools /> <span>Module 4: User-Centric Tools</span></h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Secure user accounts to save tracked products</li>
              <li>Smart alerts & email notifications</li>
              <li>Export tracked data (CSV)</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a href="#contact" className="px-5 py-2 rounded border border-teal-500 text-white hover:bg-teal-500/20" data-testid="cta-learn-more">
            Learn more / Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;