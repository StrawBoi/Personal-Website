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
      {/* Background video (cover, muted, loop, autoplay) - no overlay */}
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
      </div>
    </section>
  );
};

export default CinematicHero;