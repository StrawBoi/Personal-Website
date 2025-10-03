import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Progress window (begin interaction when top hits 80%)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });

  // Width/radius animation for edge-to-edge then ease down
  const widthMV = useTransform(scrollYProgress, [0, 0.15, 0.7, 1], ["72vw", "100vw", "100vw", "88vw"]);
  const radiusMV = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [18, 0, 12, 16]);
  const vignetteOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.9], [0, 0.35, 0.35, 0.1]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = true; v.playsInline = true; v.loop = true; v.autoplay = true;
      const play = v.play(); if (play && typeof play.catch === 'function') play.catch(() => {});
    } catch (e) {}
  }, []);

  return (
    <section id="featured-project" ref={sectionRef} className="relative" style={{ height: '240vh' }} data-testid="section-featured-project">
      {/* Sticky pinned full viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ width: widthMV, borderRadius: radiusMV }}
          className="max-w-[1920px] aspect-video overflow-hidden border border-white/10 bg-black relative"
          data-testid="featured-video-frame"
        >
          {/* Constant 15-20% dim layer */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-full object-cover"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Subtle vignette for cinematic feel */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ opacity: vignetteOpacity }}
          >
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)'
            }} />
          </motion.div>
        </motion.div>
      </div>

      {/* After the parallax takeover ends: headline bump and feature cards */}
      <div className="container mx-auto px-6 -mt-10 md:-mt-16" data-testid="post-video-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <h3 className="text-white text-xl md:text-2xl font-medium">
            How can we transition from reactive, manual purchasing to a proactive, data-driven procurement strategy that maximizes savings and provides a real-time competitive edge?
          </h3>
        </motion.div>

        {/* Feature cards summarizing modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Module 1 */}
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold">Module 1: Data Collection Core</h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Automated tracking of product price and stock from given URLs</li>
              <li>Continuous updates for accurate, real-time market view</li>
            </ul>
          </div>
          {/* Module 2 */}
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold">Module 2: Analysis & Visualization Hub</h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Historical Price Trend (interactive line chart)</li>
              <li>Competitor Price Comparison (bar chart)</li>
              <li>Category Trend Analysis (area chart)</li>
              <li>Price vs. Popularity (scatter for value ranking)</li>
            </ul>
          </div>
          {/* Module 3 */}
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold">Module 3: AI Insight Layer</h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Anomaly detection for outlier price events</li>
              <li>Trend analysis & simple forecasting</li>
              <li>Strategic recommendations (e.g., "3-month low: buy now")</li>
            </ul>
          </div>
          {/* Module 4 */}
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h4 className="text-white text-lg font-semibold">Module 4: User-Centric Tools</h4>
            <ul className="text-gray-300 mt-2 list-disc pl-5 space-y-1">
              <li>Secure user accounts to save tracked products</li>
              <li>Smart alerts & email notifications</li>
              <li>Export tracked data (CSV)</li>
            </ul>
          </div>
        </div>

        {/* Story linkage */}
        <div className="max-w-5xl mx-auto text-center mt-10 text-gray-300">
          <p>
            This product narrative connects directly to my journey: from understanding customers' needs to engineering robust systems and delivering strategic outcomes. It brings together operations, analytics, and AI-driven recommendations—turning raw data into action.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;