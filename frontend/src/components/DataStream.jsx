import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Navigational Data-Stream (Left & Right side light streams)
 * - Background stays TRUE BLACK (#000)
 * - Two dimmed teal light streams start just below the hero and "light up" progressively to page end
 * - Smooth reveal tied to scroll; subtle rolling texture for motion
 */
const TEAL = 'rgba(20,184,166,1)';
const TEAL_DIM = 'rgba(20,184,166,0.12)';
const TEAL_BRIGHT = 'rgba(20,184,166,0.35)';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DataStream = ({ mainRef, sectionIds = [] }) => {
  const containerRef = useRef(null);
  const [heroHeight, setHeroHeight] = useState(0);
  const [streamHeight, setStreamHeight] = useState(0);
  const [heroRatio, setHeroRatio] = useState(0); // fraction of main height occupied by hero

  // Scroll progress across main
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
  // Reveal progress: 0 until passing hero bottom, then 0->1 to end
  const revealProgress = useTransform(scrollYProgress, (p) => {
    const r = heroRatio || 0;
    if (p <= r) return 0;
    const denom = Math.max(0.0001, 1 - r);
    return clamp01((p - r) / denom);
  });
  // Smoothen marker progress (used if needed for future)
  const revealSpring = useSpring(revealProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  useEffect(() => {
    const recalc = () => {
      const mainEl = mainRef?.current;
      const heroEl = document.getElementById('hero');
      if (!mainEl || !heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const heroTopAbs = heroRect.top + window.scrollY;
      const heroBottomAbs = heroRect.bottom + window.scrollY;
      const heroH = Math.max(0, heroBottomAbs - heroTopAbs);
      setHeroHeight(heroH);

      const mainRect = mainEl.getBoundingClientRect();
      const mainTopAbs = mainRect.top + window.scrollY;
      const mainBottomAbs = mainRect.bottom + window.scrollY;
      const mainTotal = Math.max(1, mainBottomAbs - mainTopAbs);
      const streamH = Math.max(0, mainEl.scrollHeight - heroH);
      setStreamHeight(streamH);

      setHeroRatio(clamp01(heroH / (heroH + streamH)));
    };

    recalc();
    const ro = new ResizeObserver(() => recalc());
    if (mainRef?.current) ro.observe(mainRef.current);
    const heroEl = document.getElementById('hero');
    if (heroEl) ro.observe(heroEl);
    window.addEventListener('resize', recalc);
    window.addEventListener('orientationchange', recalc);
    window.addEventListener('scroll', recalc, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalc);
      window.removeEventListener('orientationchange', recalc);
      window.removeEventListener('scroll', recalc);
    };
  }, [mainRef]);

  if (streamHeight <= 0) return null;

  const Beam = ({ side }) => {
    return (
      <div
        className={`pointer-events-none absolute ${side === 'left' ? 'left-0' : 'right-0'}`}
        style={{ top: heroHeight, height: streamHeight, width: 56 }}
        aria-hidden
        data-testid={`datastream-${side}`}
      >
        {/* Base dim beam (full length, subtle) */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(closest-side, ${TEAL_DIM} 0%, rgba(20,184,166,0.06) 55%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(18px)',
            opacity: 0.9,
          }}
        />
        {/* Rolling texture overlay (subtle) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 10px)`,
            animation: 'roll 12s linear infinite',
            opacity: 0.25,
          }}
        />
        {/* Bright reveal layer: scaleY with scroll to "light up" bit by bit */}
        <motion.div
          className="absolute left-0 right-0 origin-top"
          style={{
            top: 0,
            bottom: 0,
            scaleY: revealSpring,
            background: `radial-gradient(closest-side, ${TEAL_BRIGHT} 0%, rgba(20,184,166,0.18) 55%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(12px)',
          }}
          data-testid={`datastream-${side}-reveal`}
        />
      </div>
    );
  };

  return (
    <>
      <Beam side="left" />
      <Beam side="right" />
      {/* Local keyframes for rolling texture */}
      <style>{`
        @keyframes roll { from { background-position-y: 0; } to { background-position-y: 200px; } }
      `}</style>
    </>
  );
};

export default DataStream;