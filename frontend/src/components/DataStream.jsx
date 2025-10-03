import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Navigational Data-Stream (left-side vertical glowing path + active marker)
 * - Draws from top->bottom in sync with scroll across the main content
 * - Marker snaps to active section anchors (scrollspy)
 */
const TEAL = '#14b8a6';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DataStream = ({ mainRef, sectionIds = [] }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [anchors, setAnchors] = useState([]); // normalized positions [0..1]
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll progress across main content
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  // Path draw: map progress directly to pathLength (0..1)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const markerProgressSpring = useSpring(0, { stiffness: 120, damping: 20, mass: 0.3 });

  // Calculate anchor positions and active section via scroll
  useEffect(() => {
    const recalc = () => {
      const mainEl = mainRef?.current;
      if (!mainEl) return;
      const mainRect = mainEl.getBoundingClientRect();
      const mainTop = mainRect.top + window.scrollY;
      const mainBottom = mainRect.bottom + window.scrollY;
      const total = Math.max(1, mainBottom - mainTop);

      const nextAnchors = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const topAbs = rect.top + window.scrollY;
        // Use the section top as anchor (normalized along main)
        const norm = clamp01((topAbs - mainTop) / total);
        return norm;
      });
      setAnchors(nextAnchors);
    };

    recalc();
    const ro = new ResizeObserver(() => recalc());
    if (mainRef?.current) ro.observe(mainRef.current);
    window.addEventListener('resize', recalc);
    window.addEventListener('orientationchange', recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalc);
      window.removeEventListener('orientationchange', recalc);
    };
  }, [mainRef, sectionIds]);

  // Detect active section by closest to viewport center
  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
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

  // Animate marker to active anchor position
  useEffect(() => {
    const p = anchors[activeIndex] ?? 0;
    markerProgressSpring.set(p);
  }, [activeIndex, anchors, markerProgressSpring]);

  // Marker Y position (in pixels within the SVG viewBox)
  const markerY = useTransform(markerProgressSpring, (p) => 20 + p * 760);
  // Path from y=20 to y=780 (approx 800 viewBox height), x fixed 18

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed left-2 top-0 h-screen z-40"
      aria-hidden
    >
      <svg ref={svgRef} width="40" height="100%" viewBox="0 0 40 800" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={TEAL} floodOpacity="0.9"/>
          </filter>
        </defs>
        {/* Vertical path (thin, glowing) */}
        <motion.path
          d="M18 20 L18 780"
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
  );
};

export default DataStream;