import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Navigational Data-Stream (left-side vertical glowing path + active marker)
 * - Start anchored to the BOTTOM of the hero section
 * - Draws from hero bottom to end of main in sync with scroll
 * - Marker snaps to active section anchors (scrollspy)
 */
const TEAL = '#14b8a6';
const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DataStream = ({ mainRef, sectionIds = [] }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [anchors, setAnchors] = useState([]); // normalized [0..1] from hero bottom
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [streamHeight, setStreamHeight] = useState(0);

  // Scroll progress across MAIN (entire content)
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
  // Path draw from 0..1
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const markerProgressSpring = useSpring(0, { stiffness: 120, damping: 20, mass: 0.3 });

  // Recalculate dimensions and anchors relative to HERO bottom
  useEffect(() => {
    const recalc = () => {
      const mainEl = mainRef?.current;
      const heroEl = document.getElementById('hero');
      if (!mainEl || !heroEl) return;

      const mainRect = mainEl.getBoundingClientRect();
      const mainTopAbs = mainRect.top + window.scrollY;
      const mainBottomAbs = mainRect.bottom + window.scrollY;

      const heroRect = heroEl.getBoundingClientRect();
      const heroTopAbs = heroRect.top + window.scrollY;
      const heroBottomAbs = heroRect.bottom + window.scrollY;

      const heroH = Math.max(0, heroBottomAbs - heroTopAbs);
      setHeroHeight(heroH);

      // total content length from HERO BOTTOM to MAIN BOTTOM
      const total = Math.max(1, mainBottomAbs - heroBottomAbs);
      setStreamHeight(Math.max(0, mainEl.scrollHeight - heroH));

      // anchors normalized from HERO BOTTOM
      const nextAnchors = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const topAbs = rect.top + window.scrollY;
        const norm = clamp01((topAbs - heroBottomAbs) / total);
        return norm;
      });
      setAnchors(nextAnchors);
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
  }, [mainRef, sectionIds]);

  // Active section by closest to viewport center
  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let bestIdx = 0; let bestDist = Infinity;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + window.scrollY + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIndex(bestIdx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  // Animate marker to active anchor position (relative to HERO bottom)
  useEffect(() => {
    const p = anchors[activeIndex] ?? 0;
    markerProgressSpring.set(p);
  }, [activeIndex, anchors, markerProgressSpring]);

  // Marker Y within SVG (0..streamHeight)
  const markerY = useTransform(markerProgressSpring, (p) => Math.max(0, Math.min(streamHeight, p * streamHeight)));

  // If dimensions are not ready yet, don't render
  const ready = streamHeight > 0 && heroHeight >= 0;

  return ready ? (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-2 z-40"
      style={{ top: heroHeight, height: streamHeight, width: 40 }}
      aria-hidden
    >
      <svg ref={svgRef} width="40" height={streamHeight} viewBox={`0 0 40 ${Math.max(1, streamHeight)}`} preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={TEAL} floodOpacity="0.9"/>
          </filter>
        </defs>
        {/* Vertical path (glowing) from y=0 to streamHeight */}
        <motion.path
          d={`M18 0 L18 ${Math.max(0, streamHeight - 2)}`}
          stroke={TEAL}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          filter="url(#glow)"
          fill="transparent"
        />
        {/* Marker (glowing teal circle with pulsing animation) */}
        <motion.circle
          cx="18"
          cy={markerY}
          r="5.5"
          fill={TEAL}
          filter="url(#glow)"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  ) : null;
};

export default DataStream;