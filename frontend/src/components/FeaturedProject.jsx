import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

export default function FeaturedProject() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });
  // Animate scale (expand) within rails, and corner radius
  const scaleMV = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.96]);
  const radiusMV = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [18, 8, 8, 14]);
  const vignetteOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.95], [0, 0.3, 0.3, 0.1]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    try { v.muted = true; v.playsInline = true; v.loop = true; v.autoplay = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch {}
  }, []);

  return (
    <section id="featured-project" ref={sectionRef} className="relative" style={{ height: '200vh' }} data-testid="section-featured-project">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative mx-auto" style={{ maxWidth: 'min(1200px, calc(100vw - 8rem))', width: '100%' }}>
          {/* guide rails */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[1px]" style={{ background: 'rgba(20,184,166,0.6)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[1px]" style={{ background: 'rgba(20,184,166,0.6)' }} />

          {/* frame */}
          <motion.div ref={frameRef} style={{ scale: scaleMV, borderRadius: radiusMV }} className="relative aspect-video overflow-hidden rounded-xl" data-testid="featured-video-frame">
            <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: '0 0 0 2px rgba(20,184,166,0.95), 0 0 28px rgba(20,184,166,0.6)' }} />
            <div className="absolute inset-0 bg-black/65 pointer-events-none rounded-xl" />
            <video ref={videoRef} src={VIDEO_SRC} className="w-full h-full object-cover rounded-xl" preload="auto" autoPlay muted loop playsInline />
            <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: vignetteOpacity }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)' }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Post-video content (not pinned) */}
      <div className="container mx-auto px-6 mt-24 md:mt-28" data-testid="post-video-content">
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
          <a href="#contact" className="px-5 py-2 rounded border border-emerald-400 text-white hover:bg-emerald-400/10" data-testid="cta-learn-more">Learn more / Get in touch</a>
        </div>
      </div>
    </section>
  );
}