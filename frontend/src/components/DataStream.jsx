import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Twin Data Streams (Left & Right) — thin, sharp, constant light
 * - TRUE BLACK background assumed site-wide
 * - Streams start exactly below the hero and reveal progressively with scroll
 * - Clean look: no rolling textures, crisp 2px core line + subtle glow
 */
const TEAL = 'rgba(20,184,166,1)';
const TEAL_CORE_DIM = 'rgba(20,184,166,0.45)';
const TEAL_CORE_REVEAL = 'rgba(20,184,166,0.85)';
const TEAL_GLOW_DIM = 'rgba(20,184,166,0.14)';
const TEAL_GLOW_REVEAL = 'rgba(20,184,166,0.28)';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DataStream = ({ mainRef }) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const [streamHeight, setStreamHeight] = useState(0);
  const [heroRatio, setHeroRatio] = useState(0);

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
        className={`pointer-events-none absolute ${side === 'left' ? 'left-2' : 'right-2'}`}
        style={{ top: heroHeight, height: streamHeight, width: 28, zIndex: 30 }}
        aria-hidden
        data-testid={`datastream-${side}`}
      >
        {/* Subtle outer glow (constant dim) */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${TEAL_GLOW_DIM} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(10px)',
          }}
        />
        {/* Core 2px line (constant dim) */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: '50%', transform: 'translateX(-1px)', width: 2, background: TEAL_CORE_DIM }}
        />
        {/* Reveal glow layer (progressively lights up with scroll) */}
        <motion.div
          className="absolute left-0 right-0 origin-top"
          style={{
            top: 0,
            bottom: 0,
            scaleY: revealSpring,
            background: `radial-gradient(ellipse at center, ${TEAL_GLOW_REVEAL} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(8px)',
          }}
          data-testid={`datastream-${side}-reveal-glow`}
        />
        {/* Reveal core line overlay (crisper brighter 2px) */}
        <motion.div
          className="absolute top-0 origin-top"
          style={{
            left: '50%', transform: 'translateX(-1px)',
            width: 2,
            height: streamHeight,
            scaleY: revealSpring,
            background: TEAL_CORE_REVEAL,
          }}
          data-testid={`datastream-${side}-reveal-core`}
        />
      </div>
    );
  };

  return (
    <>
      <Beam side="left" />
      <Beam side="right" />
    </>
  );
};

export default DataStream;