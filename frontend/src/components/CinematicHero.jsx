import React from 'react';

const VIDEO_SRC = "https://customer-assets.emergentagent.com/job_code-evolution-11/artifacts/vellc1s0_Neon%20Blue%20and%20Black%20Futuristic%20Welcome%20Back%20Background%20Video.mp4";

const CinematicHero = () => {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden select-none bg-black"
      data-testid="hero-home-section"
    >
      {/* Background video with true black fallback */}
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