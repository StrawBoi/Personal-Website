import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video (same as before)
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

const FeaturedProject = () => {
  const sectionRef = useRef(null); // outer section with tall height (pin duration)
  const stickyRef = useRef(null); // inner sticky container
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // Scroll progress for the takeover section (0..1 across 300vh)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Video scale/width animation: 0 -> 1 -> 0 back
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  // Scrub video with scroll
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      try {
        setDuration(v.duration || 0);
        v.pause(); // ensure we are in manual scrubbing mode
        v.currentTime = 0;
        v.muted = true;
        v.playsInline = true;
      } catch (e) {}
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    let raf;
    const unsub = scrollYProgress.on('change', (p) => {
      const v = videoRef.current;
      if (!v || !duration) return;
      const t = Math.max(0, Math.min(duration, p * duration));
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        try { v.currentTime = t; } catch (e) {}
      });
    });
    return () => { if (unsub) unsub(); if (raf) cancelAnimationFrame(raf); };
  }, [scrollYProgress, duration]);

  return (
    <section id="featured-project" ref={sectionRef} className="relative" style={{ height: '300vh' }} data-testid="section-featured-project">
      {/* Sticky container pinned during the takeover */}
      <div ref={stickyRef} className="sticky top-0 flex items-center justify-center h-screen">
        <motion.div
          style={{ scale }}
          className="w-[70vw] max-w-[1280px] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(20,184,166,0.15)]"
          data-testid="featured-video-frame"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-full object-cover bg-black"
            preload="auto"
            muted
            playsInline
          />
        </motion.div>
      </div>
      {/* Contextual heading above and spacer below for flow */}
      <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="text-white text-2xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Featured Project</h2>
        <p className="text-gray-300 text-sm">Tackle — Your solution to pricing intelligently</p>
      </div>
      {/* After takeover ends, content continues normally (spacer not needed due to 300vh) */}
    </section>
  );
};

export default FeaturedProject;