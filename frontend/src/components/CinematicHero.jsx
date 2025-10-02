import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const CinematicHero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const { scrollYProgress } = useScroll();
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('story');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          #home video { display: none !important; }
          #home { background: linear-gradient(135deg, #101626, #0d1528 50%, #0a1224); }
          #home::before { content: ''; position: absolute; inset: 0; background:
            radial-gradient(circle at 20% 30%, #00d4ff22 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, #7c3aed22 0%, transparent 45%);
          }
          #home .container { position: relative; z-index: 10; }
        }
      `}</style>
      
      <motion.section 
        id="home"
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        data-testid="hero-home-section"
      >
        {/* Video Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            data-testid="hero-bg-video"
          >
            <source 
              src="https://customer-assets.emergentagent.com/job_cinema-folio/artifacts/vaplhedp_A_futuristic_highresolution_202510012200.mp4"
              type="video/mp4"
            />
          </video>
          {/* Keeping slight overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40" data-testid="hero-overlay" />
        </motion.div>

        {/* Mute/Unmute Button */}
        <motion.button
          onClick={toggleMute}
          className="fixed top-20 right-6 z-30 p-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-testid="mute-toggle-button"
          aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 h-screen">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              {/* Entrance animation: heading then subheading (<= 2s total) */}
              <motion.h1 
                className="text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                data-testid="hero-title"
              >
                AHMED MOSTAFA
              </motion.h1>

              <motion.h2
                className="mt-5 max-w-3xl mx-auto text-gray-200"
                style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace", fontSize: '1.05rem', lineHeight: 1.6 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
                data-testid="hero-subtitle"
              >
                My career began with a foundation in customer-centric roles, mastering communication and understanding user needs. I then pivoted into the technical world, leading IT operations and driving revenue growth by optimizing website content for search engines. Today, I operate as a creative leader and co-founder, developing and executing creative strategies and building client relationships from the ground up.
              </motion.h2>

              <motion.button
                className="mt-8 px-5 py-2 rounded border text-white"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                onClick={scrollToNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                data-testid="hero-cta-button"
              >
                Explore My Work
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll affordance */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <ChevronDown className="w-7 h-7" />
        </motion.div>
      </motion.section>
    </>
  );
};

export default CinematicHero;