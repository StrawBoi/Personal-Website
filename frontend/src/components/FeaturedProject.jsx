import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

export default function FeaturedProject() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    try { v.muted = true; v.playsInline = true; v.loop = true; v.autoplay = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch {}
  }, []);

  return (
    <section id="featured-project" className="relative py-24" data-testid="section-featured-project">
      <div className="container mx-auto px-6">
        <div className="mx-auto" style={{ maxWidth: 'calc(100vw - 8rem)' }}>
          <div className="relative mx-auto" style={{ maxWidth: 'min(1200px, calc(100vw - 8rem))' }}>
            {/* Neon amber border and constrained width */}
            <div className="relative rounded-xl" style={{ boxShadow: '0 0 0 2px rgba(245,158,11,0.9), 0 0 24px rgba(245,158,11,0.5)' }}>
              {/* black belonging layer */}
              <div className="absolute inset-0 bg-black/65 pointer-events-none rounded-xl" />
              <video ref={videoRef} src={VIDEO_SRC} className="w-full h-auto block rounded-xl" preload="auto" autoPlay muted loop playsInline />
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-5xl mx-auto text-center mt-10">
            <h3 className="text-white text-xl md:text-2xl font-bold">
              How can we transition from reactive, manual purchasing to a proactive, data-driven procurement strategy that maximizes savings and provides a real-time competitive edge?
            </h3>
          </div>

          {/* Cards moved below without pinning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
            <div className="rounded-2xl border border-amber-500/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 1: Data Collection Core</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Automated product price & stock tracking from URLs</li>
                <li>Continuous updates for real-time market view</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 2: Analysis & Visualization Hub</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Historical Price Trend (line)</li>
                <li>Competitor Comparison (bar)</li>
                <li>Category Trend (area)</li>
                <li>Price vs Popularity (scatter)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 3: AI Insight Layer</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>Anomaly detection</li>
                <li>Trend analysis & forecasting</li>
                <li>Actionable recommendations</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/50 bg-black/40 p-5 text-white">
              <h5 className="font-semibold mb-2">Module 4: User-Centric Tools</h5>
              <ul className="text-gray-300 list-disc pl-5 space-y-1 text-sm">
                <li>User accounts & saved products</li>
                <li>Smart alerts & email notifications</li>
                <li>CSV data export</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <a href="#contact" className="px-5 py-2 rounded border border-amber-500 text-white hover:bg-amber-500/10" data-testid="cta-learn-more">Learn more / Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}