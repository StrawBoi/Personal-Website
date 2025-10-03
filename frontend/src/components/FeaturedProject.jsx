import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

/**
 * Edge-to-edge Parallax Takeover with Title Overlay (Apple-like)
 * - When section top hits 80% viewport, begin takeover
 * - Expand frame from 70vw to 100vw quickly, remove rounded corners at full bleed
 * - Keep title card overlay while expanding, fade it away as the video continues
 * - Scrub video with scroll; apply subtle parallax shift on the video content
 */
const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });

  // Width animation: quick expand to 100vw, hold, then ease back to 80vw near the end
  const widthMV = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.8, 1], ["70vw", "100vw", "100vw", "90vw", "80vw"]);
  // Border radius: rounded -> square at full bleed -> rounded again
  const radiusMV = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [16, 0, 12, 16]);
  // Opacity: slight dip at the very end for cinematic exit
  const opacityMV = useTransform(scrollYProgress, [0.85, 1], [1, 0.6]);
  // Title overlay fade in/out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.6], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [20, 0]);
  // Parallax inside video
  const videoY = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);

  // Prepare video scrubbing
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      setDuration(v.duration || 0);
      v.pause(); v.currentTime = 0; v.muted = true; v.playsInline = true;
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  // Scrub video time with scroll
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
    return () => { unsub && unsub(); if (raf) cancelAnimationFrame(raf); };
  }, [scrollYProgress, duration]);

  return (
    <section id="featured-project" ref={sectionRef} className="relative" style={{ height: '320vh' }} data-testid="section-featured-project">
      {/* Sticky pinned to viewport edge-to-edge */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ width: widthMV, borderRadius: radiusMV, opacity: opacityMV }}
          className="max-w-[1600px] aspect-video overflow-hidden border border-white/10 bg-black"
          data-testid="featured-video-frame"
        >
          <motion.video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-full object-cover"
            style={{ y: videoY }}
            preload="auto"
            muted
            playsInline
          />
        </motion.div>

        {/* Title card overlay (Apple-like) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2 className="text-white text-4xl md:text-6xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Tackle</h2>
          <p className="text-gray-300 mt-3 md:text-xl">Your solution to pricing intelligently</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProject;