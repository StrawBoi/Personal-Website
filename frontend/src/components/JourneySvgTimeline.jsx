import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// Holographic Blueprint palette
const CYAN = "#00BFFF"; // deep cyan
const MAGENTA = "#FF00FF"; // vibrant magenta
const PURPLE = "#BF00FF"; // electric purple

function buildWavePath(width, height) {
  const margin = Math.max(40, Math.round(width * 0.05));
  const w = width - margin * 2;
  const cx = margin;
  const cy = Math.round(height * 0.56); // base level
  const amp = Math.max(50, Math.round(height * 0.14));

  const s = w / 4;
  const x0 = cx;
  const x1 = cx + s;
  const x2 = cx + 2 * s;
  const x3 = cx + 3 * s;
  const x4 = cx + 4 * s;

  const y0 = cy;
  const y1 = cy - amp;
  const y2 = cy + amp * 0.9;
  const y3 = cy - amp * 0.8;
  const y4 = cy;

  const d = `M ${x0},${y0} C ${x1},${y1} ${x1},${y1} ${x2},${y2} S ${x3},${y3} ${x4},${y4}`;
  return { d, width, height };
}

function useContainerSize(ref) {
  const [size, set] = useState({ width: 1200, height: 560 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      set({ width: Math.max(720, r.width), height: Math.max(480, r.height) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return size;
}

// Small helpers
const pulseProps = {
  animate: { opacity: [0.75, 1, 0.75] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
};

function colorForX(x, width) {
  if (x < width / 3) return CYAN;
  if (x < (2 * width) / 3) return MAGENTA;
  return PURPLE;
}

// Wireframe objects (SVG-in-div so we can use CSS 3D rotateY)
function WireCube({ color = CYAN, size = 64 }) {
  const stroke = color;
  const s = size;
  const o = s * 0.25; // offset for back face
  const front = `${o},${o} ${s - o},${o} ${s - o},${s - o} ${o},${s - o}`;
  const back = `0,0 ${s - 2 * o},0 ${s - 2 * o},${s - 2 * o} 0,${s - 2 * o}`;
  return (
    <div
      style={{ width: s, height: s, filter: `drop-shadow(0 0 18px ${color}88)` }}
      className="[transform-style:preserve-3d]"
    >
      <motion.div
        style={{ width: s, height: s, perspective: 600 }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <g stroke={stroke} strokeWidth="2">
            <polygon points={front} />
            <g transform={`translate(${o},${o})`}>
              <polygon points={back} />
              {/* connectors */}
              <line x1="0" y1="0" x2={o} y2={o} />
              <line x1={s - 2 * o} y1="0" x2={s - o} y2={o} />
              <line x1={s - 2 * o} y1={s - 2 * o} x2={s - o} y2={s - o} />
              <line x1="0" y1={s - 2 * o} x2={o} y2={s - o} />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

function WireSphere({ color = MAGENTA, size = 64 }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.42;
  return (
    <div style={{ width: s, height: s, filter: `drop-shadow(0 0 18px ${color}88)` }} className="[transform-style:preserve-3d]">
      <motion.div style={{ width: s, height: s, perspective: 600 }} animate={{ rotateY: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <g stroke={color} strokeWidth="2">
            <circle cx={cx} cy={cy} r={r} />
            {/* longitudes */}
            <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35} />
            <ellipse cx={cx} cy={cy} rx={r * 0.75} ry={r * 0.25} />
            <ellipse cx={cx} cy={cy} rx={r * 0.5} ry={r * 0.18} />
            {/* latitudes */}
            <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
            <line x1={cx - r * 0.7} y1={cy - r * 0.5} x2={cx + r * 0.7} y2={cy - r * 0.5} />
            <line x1={cx - r * 0.7} y1={cy + r * 0.5} x2={cx + r * 0.7} y2={cy + r * 0.5} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

function WireTetra({ color = PURPLE, size = 64 }) {
  const s = size;
  const h = s * 0.86;
  const p1 = [s / 2, 0];
  const p2 = [0, h];
  const p3 = [s, h];
  const mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  return (
    <div style={{ width: s, height: s, filter: `drop-shadow(0 0 18px ${color}88)` }} className="[transform-style:preserve-3d]">
      <motion.div style={{ width: s, height: s, perspective: 600 }} animate={{ rotateY: [0, 360] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <g stroke={color} strokeWidth="2">
            <polygon points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`} />
            {/* inner edges */}
            <line x1={p1[0]} y1={p1[1]} x2={mid[0]} y2={mid[1]} />
            <line x1={p3[0]} y1={p3[1]} x2={mid[0]} y2={mid[1]} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

export default function JourneySvgTimeline() {
  const wrapRef = useRef(null);
  const { width } = useContainerSize(wrapRef);
  const height = 560;

  const geometry = useMemo(() => buildWavePath(width, height), [width, height]);
  const mainPathRef = useRef(null);
  const [length, setLength] = useState(0);
  const [points, setPoints] = useState({ mains: [], smalls: [] });

  useEffect(() => {
    const p = mainPathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    setLength(len);
    const mainsT = [1 / 6, 1 / 2, 5 / 6];
    const mains = mainsT.map((t) => p.getPointAtLength(len * t));
    const smallsT = [0.08, 0.2, 0.3, 0.45, 0.58];
    const smalls = smallsT.map((t) => p.getPointAtLength(len * t));
    setPoints({ mains, smalls });
  }, [geometry.d]);

  // Underlay colored glow segments with dasharray so we can attach per-color drop-shadows
  const segments = useMemo(() => {
    if (!length) return [];
    const third = length / 3;
    return [
      { color: CYAN, dasharray: `${third} ${length - third}`, dashoffset: 0 },
      { color: MAGENTA, dasharray: `${third} ${length - third}`, dashoffset: -third },
      { color: PURPLE, dasharray: `${length - 2 * third} ${2 * third}`, dashoffset: -2 * third },
    ];
  }, [length]);

  return (
    <section className="relative bg-black" data-testid="journey-svg-timeline-section">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">My Journey — Holographic Blueprint</h2>
          <p className="text-gray-400 text-sm mt-1">Cyan → Magenta → Electric Purple</p>
        </div>

        <div ref={wrapRef} className="relative w-full" style={{ height }}>
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="holoGradient" x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={CYAN} />
                <stop offset="34%" stopColor={CYAN} />
                <stop offset="35%" stopColor={MAGENTA} />
                <stop offset="66%" stopColor={MAGENTA} />
                <stop offset="67%" stopColor={PURPLE} />
                <stop offset="100%" stopColor={PURPLE} />
              </linearGradient>
            </defs>

            {/* Colored glow segments (breathing) */}
            {segments.map((seg, i) => (
              <motion.path
                key={`seg-${i}`}
                d={geometry.d}
                stroke={seg.color}
                strokeWidth={12}
                strokeLinecap="round"
                fill="none"
                style={{ filter: `drop-shadow(0 0 18px ${seg.color}AA)` }}
                strokeDasharray={seg.dasharray}
                strokeDashoffset={seg.dashoffset}
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
              />
            ))}

            {/* Main gradient path on top */}
            <motion.path
              ref={mainPathRef}
              d={geometry.d}
              stroke="url(#holoGradient)"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))" }}
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Small job nodes */}
            {points.smalls.map((pt, i) => {
              const c = colorForX(pt.x, width);
              return (
                <g key={`small-${i}`} style={{ filter: `drop-shadow(0 0 16px ${c}AA)` }}>
                  <motion.circle cx={pt.x} cy={pt.y} r={6.5} fill={c} initial={{ opacity: 0.9 }} whileHover={{ r: 8.5, opacity: 1 }} />
                </g>
              );
            })}
          </svg>

          {/* 3D wireframe main nodes + labels (HTML overlay with CSS 3D rotateY) */}
          <div className="absolute inset-0">
            {points.mains.map((pt, i) => {
              const label = i === 0 ? "Communication" : i === 1 ? "Software Development" : "Marketing & Business";
              const color = i === 0 ? CYAN : i === 1 ? MAGENTA : PURPLE;
              const Shape = i === 0 ? WireCube : i === 1 ? WireSphere : WireTetra;
              return (
                <div key={`mainShape-${i}`} className="absolute flex flex-col items-center" style={{ left: pt.x - 32, top: pt.y - 52 }}>
                  <Shape color={color} size={64} />
                  <div className="text-[12px] text-white mt-2 whitespace-nowrap" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}