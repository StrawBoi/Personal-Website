import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

// Simple techy background pattern (transparent-ish)
const TechBack = () => (
  <div className="absolute inset-0 opacity-60 pointer-events-none" style={{
    backgroundImage: `radial-gradient(circle at 20% 30%, rgba(20,184,166,0.06) 0%, transparent 40%),
                      radial-gradient(circle at 80% 70%, rgba(56,189,248,0.06) 0%, transparent 45%),
                      linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.04) 75%, transparent 75%, transparent)` ,
    backgroundSize: '160px 160px, 160px 160px, 40px 40px'
  }} />
);

const FlipCard = ({ title, bullets, Icon }) => (
  <div className="relative [transform-style:preserve-3d] group h-[220px] rounded-2xl border border-white/10 overflow-hidden">
    {/* Back face (default) */}
    <div className="absolute inset-0 bg-black/50 [backface-visibility:hidden] [transform:rotateY(0deg)] flex items-center justify-center">
      <TechBack />
      <div className="text-white/80 text-lg font-medium flex items-center gap-2 z-10">
        {Icon ? <Icon /> : null}
        <span>{title}</span>
      </div>
    </div>
    {/* Front face (info) */}
    <div className="absolute inset-0 bg-black/80 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="p-5">
        <h5 className="text-white font-semibold mb-2">{title}</h5>
        <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
          {bullets.map((b, idx) => (<li key={idx}>{b}</li>))}
        </ul>
      </div>
    </div>
    {/* flip on hover */}
    <style>{`.group:hover > div:first-child{transform:rotateY(-180deg)} .group:hover > div:last-child{transform:rotateY(0deg)}`}</style>
  </div>
);

// Minimal inline SVG icons (transparent-friendly)
const IconData = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/></svg>);
const IconViz = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18V6m5 12V9m5 9V4m5 14V12" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/></svg>);
const IconAI = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="rgba(20,184,166,0.9)" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/></svg>);
const IconTools = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l10 10M17 7L7 17" stroke="rgba(20,184,166,0.9)" strokeWidth="2" strokeLinecap="round"/></svg>);

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

      {/* After takeover: spacing + question + flip cards */}
      <div className="container mx-auto px-6 mt-24 md:mt-28" data-testid="post-video-content">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="max-w-5xl mx-auto text-center mb-12">
          <h3 className="text-white text-xl md:text-2xl font-medium">
            How can we transition from reactive, manual purchasing to a proactive, data-driven procurement strategy that maximizes savings and provides a real-time competitive edge?
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <FlipCard
            title="Module 1: Data Collection Core"
            bullets={["Automated product price & stock tracking from URLs", "Continuous updates for real-time market view"]}
            Icon={IconData}
          />
          <FlipCard
            title="Module 2: Analysis & Visualization Hub"
            bullets={["Historical Price Trend (line)", "Competitor Price Comparison (bar)", "Category Trend (area)", "Price vs Popularity (scatter)"]}
            Icon={IconViz}
          />
          <FlipCard
            title="Module 3: AI Insight Layer"
            bullets={["Anomaly detection", "Trend analysis & simple forecasting", "Actionable recommendations"]}
            Icon={IconAI}
          />
          <FlipCard
            title="Module 4: User-Centric Tools"
            bullets={["User accounts & saved products", "Smart alerts & email notifications", "CSV data export"]}
            Icon={IconTools}
          />
        </div>

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