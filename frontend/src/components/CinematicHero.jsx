import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const CinematicHero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const signatureRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [startSignature, setStartSignature] = useState(false);
  const [sigLength, setSigLength] = useState(0);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    if (signatureRef.current) {
      try {
        const len = signatureRef.current.getComputedTextLength
          ? signatureRef.current.getComputedTextLength()
          : 1200;
        setSigLength(len);
      } catch (e) {
        setSigLength(1200);
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen overflow-hidden" data-testid="hero-home-section">
      {/* Background video */}
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
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Controls */}
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

      {/* Left-side content area: Title + Signature */}
      <div className="relative z-10 h-screen container mx-auto px-6 flex items-center">
        <div className="w-full md:w-2/3 lg:w-1/2" data-testid="hero-left">
          {/* Title */}
          <motion.h3
            ref={titleRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onAnimationComplete={() => setStartSignature(true)}
            className="text-white text-2xl md:text-3xl font-semibold"
            style={{ fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
            data-testid="hero-title-fade"
          >
            Software Engineer &amp; Marketing Student
          </motion.h3>

          {/* Signature (SVG) */}
          <div className="mt-6" data-testid="hero-signature">
            <svg width="720" height="170" viewBox="0 0 720 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Using SVG <text> to render script, applying stroke for handwriting effect */}
              <text
                ref={signatureRef}
                x="0"
                y="120"
                fontFamily="'Dancing Script', cursive"
                fontSize="110"
                fontWeight="700"
                fill="transparent"
                stroke="#2dd4bf"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.55))',
                  strokeDasharray: (sigLength || 1200) * 1.05,
                  strokeDashoffset: startSignature ? 0 : (sigLength || 1200) * 1.05,
                  transition: startSignature ? 'stroke-dashoffset 2.6s ease-in-out' : 'none',
                }}
              >
                Ahmed Mostafa
              </text>
              {/* After the line finishes drawing, gently fade in a crisp outline for clarity */}
              <motion.text
                x="0"
                y="120"
                fontFamily="'Dancing Script', cursive"
                fontSize="110"
                fontWeight="700"
                fill="transparent"
                stroke="#2dd4bf"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: startSignature ? 1 : 0 }}
                transition={{ delay: 2.7, duration: 0.6 }}
              >
                Ahmed Mostafa
              </motion.text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;