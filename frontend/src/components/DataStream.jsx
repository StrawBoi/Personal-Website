import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Navigational Data-Stream (Left & Right side light streams)
 * - Background TRUE BLACK (#000)
 * - Two dimmed teal light streams start just below the hero and "light up" progressively to page end
 */
const TEAL_DIM = 'rgba(20,184,166,0.18)';
const TEAL_BRIGHT = 'rgba(20,184,166,0.45)';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DataStream = ({ mainRef }) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const [streamHeight, setStreamHeight] = useState(0);
  const [heroRatio, setHeroRatio] = useState(0); // fraction of main occupied by hero

  // Scroll progress across main
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
  // Reveal progress after hero
  const revealProgress = useTransform(scrollYProgress, (p) => {
    const r = heroRatio || 0;
    if (p <= r) return 0;
    const denom = Math.max(0.0001, 1 - r);
    return clamp01((p - r) / denom);
  });
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
        style={{ top: heroHeight, height: streamHeight, width: 72, zIndex: 30 }}
        aria-hidden
        data-testid={`datastream-${side}`}
      >
        {/* Base dim beam (always visible) */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(closest-side, ${TEAL_DIM} 0%, rgba(20,184,166,0.10) 55%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(22px)',
            opacity: 0.95,
            mixBlendMode: 'screen',
          }}
        />
        {/* Rolling texture overlay (subtle motion) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 10px)`,
            animation: 'roll 12s linear infinite',
            opacity: 0.22,
            mixBlendMode: 'screen',
          }}
        />
        {/* Bright reveal layer that lights up with scroll */}
        <motion.div
          className="absolute left-0 right-0 origin-top"
          style={{
            top: 0,
            bottom: 0,
            scaleY: revealSpring,
            background: `radial-gradient(closest-side, ${TEAL_BRIGHT} 0%, rgba(20,184,166,0.22) 55%, rgba(0,0,0,0) 100%)`,
            filter: 'blur(16px)',
            mixBlendMode: 'screen',
          }}
          data-testid={`datastream-${side}-reveal`}
        />
        {/* Debug edge (can be removed later) */}
        <div
          className="absolute top-0 bottom-0"
          style={{ [side === 'left' ? 'left' : 'right']: 0, width: 1, background: 'rgba(20,184,166,0.35)' }}
        />
      </div>
    );
  };

  return (
    <>
      <Beam side="left" />
      <Beam side="right" />
      <style>{`@keyframes roll { from { background-position-y: 0; } to { background-position-y: 200px; } }`}</style>
    </>
  );
};

export default DataStream;