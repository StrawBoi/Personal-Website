import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BG_IMAGE = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dv053h62_Google_AI_Studio_2025-10-02T10_13_41.143Z.png"; // deep/faint nebula

// Utility: generate static star field data once
const useStars = (count, { minSize = 1, maxSize = 3, minOpacity = 0.2, maxOpacity = 0.8 }) => {
  return useMemo(() => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
      stars.push({
        left: Math.random() * 100, // %
        top: Math.random() * 100, // %
        size,
        opacity,
        twinkleDelay: Math.random() * 5,
      });
    }
    return stars;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const CinematicHero = () => {
  // Parallax motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Smooth with spring
  const smx = useSpring(mx, { stiffness: 60, damping: 15, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 60, damping: 15, mass: 0.4 });

  // Layer transforms
  const fgX = useTransform(smx, (v) => v * 24); // foreground strongest
  const fgY = useTransform(smy, (v) => v * 24);
  const mgX = useTransform(smx, (v) => v * 12); // mid slower
  const mgY = useTransform(smy, (v) => v * 12);

  // Generate stars
  const midStars = useStars(140, { minSize: 1, maxSize: 2, minOpacity: 0.15, maxOpacity: 0.45 });
  const foreStars = useStars(35, { minSize: 2, maxSize: 4, minOpacity: 0.6, maxOpacity: 0.95 });

  // Mouse handler
  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1..1
    const dy = (e.clientY - cy) / (rect.height / 2);
    // Clamp and set
    mx.set(Math.max(-1, Math.min(1, dx)));
    my.set(Math.max(-1, Math.min(1, dy)));
  };

  const onMouseLeave = () => {
    mx.set(0); my.set(0);
  };

  useEffect(() => {
    // On touch devices, keep static (no listeners required)
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden select-none"
      data-testid="hero-home-section"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Static Background Layer (no movement) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) saturate(0.9)',
        }}
        aria-hidden
        data-testid="starfield-bg"
      />

      {/* Mid-ground small stars (slow parallax) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ x: mgX, y: mgY }}
        aria-hidden
        data-testid="starfield-mid"
      >
        {midStars.map((s, i) => (
          <div
            key={`mid-${i}`}
            style={{
              position: 'absolute',
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              opacity: s.opacity,
              boxShadow: `0 0 ${Math.max(2, s.size * 2)}px rgba(255,255,255,${s.opacity * 0.6})`,
              animation: `twinkle 4.5s ease-in-out ${s.twinkleDelay}s infinite alternate`,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground bright stars (stronger parallax) */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{ x: fgX, y: fgY }}
        aria-hidden
        data-testid="starfield-fore"
      >
        {foreStars.map((s, i) => (
          <div
            key={`fore-${i}`}
            style={{
              position: 'absolute',
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: 'white',
              opacity: s.opacity,
              boxShadow: `0 0 ${Math.max(4, s.size * 4)}px rgba(162,246,255,${Math.min(1, s.opacity + 0.1)})`,
              animation: `twinkle 3.8s ease-in-out ${s.twinkleDelay}s infinite alternate`,
            }}
          />
        ))}
      </motion.div>

      {/* Hero Content (center) */}
      <div className="relative z-30 h-screen container mx-auto px-6 flex items-center justify-center text-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-white uppercase tracking-wide"
            style={{ fontFamily: 'Inter, Roboto, system-ui', fontWeight: 800, fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
            data-testid="hero-title"
          >
            AHMED MOSTAFA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="text-gray-200 mt-3"
            style={{ fontFamily: 'Inter, Roboto, system-ui', fontWeight: 400, fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)' }}
            data-testid="hero-subtitle"
          >
            Software Engineer &amp; Marketing Student
          </motion.p>
        </div>
      </div>

      {/* Local keyframes for star twinkle */}
      <style>{`
        @keyframes twinkle { 0% { opacity: 0.6; } 100% { opacity: 1; } }
        @media (max-width: 768px) {
          /* reduce parallax effect on mobile for performance */
          #home [data-testid='starfield-mid'],
          #home [data-testid='starfield-fore'] { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default CinematicHero;