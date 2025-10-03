import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tackle project video
const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dearvwc8_Timeline%201.mov";

/**
 * Parallax Cinematic Scroll Takeover
 * - Starts interacting when the section top hits 80% of viewport
 * - Frame expands from 70vw -> 100vw quickly (2-3 scrolls), holds, then fades/minimizes
 * - Video scrubbed with scroll
 * - Parallax: video content shifts subtly opposite to scroll inside the frame
 */
const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // Progress for takeover window (begin at 80% viewport)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "end 20%"] });

  // Width (responsive) expansion curve
  const widthMV = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], ["70vw", "100vw", "100vw", "85vw", "70vw"]);
  // Opacity subtly dips near the end
  const opacityMV = useTransform(scrollYProgress, [0.8, 1], [1, 0.6]);
  // Parallax shift for the video content (opposite direction for depth)
  const videoY = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);

  // Prepare video for scrubbing
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      setDuration(v.duration || 0);
      v.pause();
      v.currentTime = 0;
      v.muted = true;
      v.playsInline = true;
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  // Scrub the video based on progress (forward/backward with scroll)
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
      {/* Sticky pinned frame. Using top: 20vh approximates the 80% start pin visually */}
      <div className="sticky" style={{ top: '20vh' }}>
        <div className="flex items-center justify-center" style={{ height: '60vh' }}>
          <motion.div
            ref={frameRef}
            style={{ width: widthMV, opacity: opacityMV }}
            className="max-w-[1600px] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(20,184,166,0.15)] bg-black"
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
        </div>
      </div>

      {/* Overlay title for context */}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="text-white text-2xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Featured Project</h2>
        <p className="text-gray-300 text-sm">Tackle — Your solution to pricing intelligently</p>
      </div>
    </section>
  );
};

export default FeaturedProject;