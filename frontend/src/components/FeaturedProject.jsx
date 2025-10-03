import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

/**
 * Edge-to-edge Parallax Takeover (Auto-play, longer pin, vignette)
 * - Start at 80% viewport; pin for a while (section height 240vh)
 * - Expand to edge-to-edge quickly, keep auto-playing loop, then gently ease smaller with a vignette
 * - No scroll-scrubbing of time
 */
const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Progress window (begin interaction when top hits 80%)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });

  // Width and radius animation
  const widthMV = useTransform(scrollYProgress, [0, 0.15, 0.6, 1], ["72vw", "100vw", "100vw", "88vw"]);
  const radiusMV = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [18, 0, 12, 16]);
  // Vignette overlay intensity (subtle during full-bleed)
  const vignetteOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.9], [0, 0.35, 0.35, 0.1]);
  // Title overlay appear then fade out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.65], [0, 1, 1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.autoplay = true;
      const play = v.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
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
            className="pointer-events-none absolute inset-0"
            style={{ opacity: vignetteOpacity }}
          >
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)'
            }} />
          </motion.div>

          {/* Title overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: titleOpacity }}
          >
            <h2 className="text-white text-4xl md:text-6xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Tackle</h2>
            <p className="text-gray-300 mt-3 md:text-xl">Your solution to pricing intelligently</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProject;