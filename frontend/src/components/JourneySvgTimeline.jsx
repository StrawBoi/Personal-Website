import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// Colors
const BLUE = "#22d3ee"; // cyan/blue glow
const GREEN = "#34d399"; // green glow
const ORANGE = "#fb923c"; // orange (lighter)
const RED_ORANGE = "#f97316"; // orange-red

// Helper: compute a gentle horizontal path (cubic beziers) across width
function buildWavePath(width, height) {
  const margin = Math.max(40, Math.round(width * 0.05));
  const w = width - margin * 2;
  const cx = margin;
  const cy = Math.round(height * 0.55); // base y level
  const amp = Math.max(40, Math.round(height * 0.12)); // amplitude

  // Four control steps create gentle S curves left->right
  const s = w / 4;
  const x0 = cx;
  const x1 = cx + s;
  const x2 = cx + 2 * s;
  const x3 = cx + 3 * s;
  const x4 = cx + 4 * s;

  const y0 = cy;
  const y1 = cy - amp;
  const y2 = cy + amp;
  const y3 = cy - amp * 0.8;
  const y4 = cy;

  const d = `M ${x0},${y0} C ${x1},${y1} ${x1},${y1} ${x2},${y2} S ${x3},${y3} ${x4},${y4}`;
  return { d, startX: x0, endX: x4, baseY: cy, width, height };
}

function useContainerSize(ref) {
  const [size, set] = useState({ width: 1200, height: 420 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      set({ width: Math.max(700, r.width), height: Math.max(380, r.height) });
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    set({ width: Math.max(700, r.width), height: Math.max(380, r.height) });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export default function JourneySvgTimeline() {
  const wrapRef = useRef(null);
  const { width } = useContainerSize(wrapRef);
  const height = 520; // section svg height

  const geometry = useMemo(() => buildWavePath(width, height), [width, height]);

  // Path ref to sample positions along the curve
  const pathRef = useRef(null);
  const [points, setPoints] = useState({ mains: [], smalls: [] });

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    // Main nodes centered in each color third
    const mainsT = [1 / 6, 1 / 2, 5 / 6];
    const mains = mainsT.map((t) => p.getPointAtLength(len * t));

    // Small nodes: Blue section (3) roughly within 0-1/3; Green (2) within 1/3-2/3
    const smallsT = [0.08, 0.20, 0.30, 0.42, 0.58];
    const smalls = smallsT.map((t) => p.getPointAtLength(len * t));
    setPoints({ mains, smalls });
  }, [geometry.d]);

  // Pulsing animation variance
  const pulse = {
    animate: { opacity: [0.8, 1, 0.8] },
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section className="relative bg-black" data-testid="journey-svg-timeline-section">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">My Journey</h2>
          <p className="text-gray-400 text-sm mt-1">A single path through three domains</p>
        </div>

        <div ref={wrapRef} className="relative w-full" style={{ height }}>
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <defs>
              {/* multi-stop gradient across the whole width for smooth color transitions */}
              <linearGradient id="timelineGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={BLUE} />
                <stop offset="32%" stopColor={BLUE} />
                <stop offset="34%" stopColor={GREEN} />
                <stop offset="66%" stopColor={GREEN} />
                <stop offset="68%" stopColor={RED_ORANGE} />
                <stop offset="100%" stopColor={RED_ORANGE} />
              </linearGradient>

              {/* Outer glow filter for path and nodes */}
              <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing base path (underlay) */}
            <motion.path
              d={geometry.d}
              stroke="url(#timelineGradient)"
              strokeWidth={10}
              strokeLinecap="round"
              fill="none"
              filter="url(#outerGlow)"
              style={{ opacity: 0.4 }}
              {...pulse}
            />

            {/* Main path */}
            <motion.path
              ref={pathRef}
              d={geometry.d}
              stroke="url(#timelineGradient)"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
              filter="url(#outerGlow)"
              {...pulse}
            />

            {/* Main nodes (three large circles) with labels */}
            {points.mains.map((pt, i) => {
              const label = i === 0 ? "Communication" : i === 1 ? "Software Development" : "Marketing & Business";
              const color = i === 0 ? BLUE : i === 1 ? GREEN : RED_ORANGE;
              return (
                <g key={`main-${i}`}>
                  {/* glow underlay */}
                  <motion.circle cx={pt.x} cy={pt.y} r={18} fill={color} filter="url(#outerGlow)" {...pulse} />
                  {/* solid node */}
                  <motion.circle cx={pt.x} cy={pt.y} r={12} fill={color} {...pulse} />
                  {/* label */}
                  <text x={pt.x} y={pt.y + 28} textAnchor="middle" className="fill-white" style={{ fontSize: 12 }}>
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Small job nodes (no labels) */}
            {points.smalls.map((pt, i) => {
              // Decide color from x position (thirds)
              const third = pt.x < width / 3 ? BLUE : pt.x < (2 * width) / 3 ? GREEN : RED_ORANGE;
              return (
                <g key={`small-${i}`}>
                  <motion.circle cx={pt.x} cy={pt.y} r={7} fill={third} filter="url(#outerGlow)" {...pulse} />
                  <motion.circle cx={pt.x} cy={pt.y} r={5} fill={third} {...pulse} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}