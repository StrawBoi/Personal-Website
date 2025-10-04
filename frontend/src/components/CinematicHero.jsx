import React from 'react';
import { motion } from 'framer-motion';

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_code-evolution-11/artifacts/3rhdwenn_A_cinematic_slowmotion_202510041528.mp4";

const CinematicHero = () => {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden select-none"
      data-testid="hero-home-section"
    >
      {/* Background video (cover, muted, loop, autoplay) */}
      <div className="absolute inset-0 z-0" data-testid="hero-video-bg">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Readability overlay (50% black) */}
        <div className="absolute inset-0 bg-black/50" data-testid="hero-overlay" />
      </div>

      {/* Centered hero content */}
      <div className="relative z-10 h-screen container mx-auto px-6 flex items-center justify-center text-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-white uppercase tracking-wide"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
            data-testid="hero-title"
          >
            AHMED MOSTAFA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="text-gray-200 mt-3"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)' }}
            data-testid="hero-subtitle"
          >
            Software Engineer &amp; Marketing Student
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;