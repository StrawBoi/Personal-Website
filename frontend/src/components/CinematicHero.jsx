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
      {/* Mobile Fallback Styles */}
      <style>{`
        @media (max-width: 768px) {
          #home video {
            display: none !important;
          }
          
          #home {
            background-image: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }
          
          /* Fallback futuristic pattern for mobile */
          #home::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 25% 25%, #00d4ff33 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #7c3aed33 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, #00d4ff11 50%, transparent 60%);
            z-index: 1;
          }
          
          #home .container {
            position: relative;
            z-index: 10;
          }
        }
      `}</style>
      
      <motion.section 
        id="home"
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        data-testid="hero-home-section"
      >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
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
          Your browser does not support the video tag.
        </video>
        
        {/* Semi-transparent black overlay (reduced to 40% for better visibility) */}
        <div className="absolute inset-0 bg-black bg-opacity-40" data-testid="hero-overlay" />
      </motion.div>

      {/* Mute/Unmute Button */}
      <motion.button
        onClick={toggleMute}
        className="fixed top-20 right-6 z-30 p-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-testid="mute-toggle-button"
        aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10 h-screen">
        <div className="row justify-content-center align-items-center h-full flex items-center justify-center">
          <div className="col-12 text-center">
            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Main Heading */}
              <motion.h1 
                className="hero-title"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "15px",
                  textShadow: "0px 2px 8px rgba(0, 0, 0, 0.7)"
                }}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 1.2, 
                  ease: [0.6, -0.05, 0.01, 0.99] 
                }}
                data-testid="hero-title"
              >
                AHMED MOSTAFA
              </motion.h1>
              
              {/* Subtitle */}
              <motion.h2 
                className="hero-subtitle"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                  fontWeight: 400,
                  color: "#E0E0E0",
                  marginTop: "15px",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textShadow: "0px 2px 8px rgba(0, 0, 0, 0.7)"
                }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.9, 
                  duration: 1.0, 
                  ease: [0.6, -0.05, 0.01, 0.99] 
                }}
                data-testid="hero-subtitle"
              >
                A results-oriented professional bridging the gap between technology, customer experience, and business growth.
              </motion.h2>

              {/* Call to Action Button */}
              <motion.button
                className="hero-cta-button"
                onClick={scrollToNext}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  border: "1px solid #FFFFFF",
                  padding: "12px 28px",
                  marginTop: "30px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.2, 
                  duration: 0.8, 
                  ease: [0.6, -0.05, 0.01, 0.99] 
                }}
                whileHover={{ 
                  backgroundColor: "#FFFFFF", 
                  color: "#000000",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                data-testid="hero-cta-button"
              >
                Explore My Work
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Affordance */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          data-testid="scroll-down-button"
        >
          <ChevronDown 
            className="w-8 h-8" 
            style={{
              filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))"
            }}
          />
        </motion.button>
      </motion.div>
    </motion.section>
    </>
  );
};

export default CinematicHero;