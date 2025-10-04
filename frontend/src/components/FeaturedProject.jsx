import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

export default function FeaturedProject() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Apple-style scroll expansion: video starts smaller and expands smoothly as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1.02, 1.02, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [32, 12, 12, 28]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.4]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    try { 
      v.muted = true; 
      v.playsInline = true; 
      v.loop = true; 
      v.autoplay = true; 
      const p = v.play(); 
      if (p && p.catch) p.catch(() => {}); 
    } catch {}
  }, []);

  return (
    <section id="featured-project" ref={sectionRef} className="relative bg-black" style={{ minHeight: '250vh' }} data-testid="section-featured-project">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          ref={frameRef} 
          style={{ 
            scale, 
            borderRadius,
            opacity
          }} 
          className="relative w-[min(1400px,92vw)] aspect-video overflow-hidden"
          data-testid="featured-video-frame"
        >
          {/* Black background layer */}
          <div className="absolute inset-0 bg-black -z-10" />
          
          {/* Teal border with glow */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              border: '3px solid rgb(20,184,166)',
              borderRadius: 'inherit',
              boxShadow: '0 0 30px rgba(20,184,166,0.7), 0 0 60px rgba(20,184,166,0.4), inset 0 0 30px rgba(20,184,166,0.2)'
            }} 
          />
          
          {/* Video */}
          <video 
            ref={videoRef} 
            src={VIDEO_SRC} 
            className="w-full h-full object-cover" 
            style={{ borderRadius: 'inherit' }}
            preload="auto" 
            autoPlay 
            muted 
            loop 
            playsInline 
          />
          
          {/* Subtle vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)',
              borderRadius: 'inherit'
            }} 
          />
        </motion.div>
      </div>

      {/* Post-video content (not pinned) */}
      <div className="relative bg-black pt-20 pb-16">
        <div className="container mx-auto px-6" data-testid="post-video-content">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h3 className="text-white text-xl md:text-2xl font-bold">
              How can we transition from reactive, manual purchasing to a proactive, data-driven procurement strategy that maximizes savings and provides a real-time competitive edge?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-emerald-400/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 1: Data Collection Core</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Automated product price & stock tracking from URLs</li>
                <li>Continuous updates for real-time market view</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-400/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 2: Analysis & Visualization Hub</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Historical Price Trend (line)</li>
                <li>Competitor Comparison (bar)</li>
                <li>Category Trend (area)</li>
                <li>Price vs Popularity (scatter)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-400/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 3: AI Insight Layer</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Anomaly detection</li>
                <li>Trend analysis & forecasting</li>
                <li>Actionable recommendations</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-400/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 4: User-Centric Tools</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>User accounts & saved products</li>
                <li>Smart alerts & email notifications</li>
                <li>CSV data export</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <a href="#contact" className="px-5 py-2 rounded border border-emerald-400 text-white hover:bg-emerald-400/10 transition-colors" data-testid="cta-learn-more">Learn more / Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}