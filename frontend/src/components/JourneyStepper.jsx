import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const COLORS = {
  blue: "#00BFFF",
  green: "#34d399",
  amber: "#f59e0b",
};

const ACTS = [
  {
    id: "communication",
    title: "Act I: Communication",
    color: COLORS.blue,
    bg: `radial-gradient(120px 160px at 50% 0%, rgba(0,191,255,0.18), transparent 60%), radial-gradient(240px 200px at 80% 80%, rgba(0,191,255,0.12), transparent 70%)`,
    highlights: [
      "Trained and coached teams",
      "Resolved critical escalations",
      "Improved customer retention",
    ],
  },
  {
    id: "software",
    title: "Act II: Software Development",
    color: COLORS.green,
    bg: `radial-gradient(120px 160px at 50% 0%, rgba(52,211,153,0.18), transparent 60%), radial-gradient(240px 200px at 80% 80%, rgba(52,211,153,0.12), transparent 70%)`,
    highlights: [
      "Launched real‑time dashboard",
      "Reduced MTTR with ITSM",
      "Led delivery & infra direction",
    ],
  },
  {
    id: "marketing",
    title: "Act III: Marketing & Business",
    color: COLORS.amber,
    bg: `radial-gradient(120px 160px at 50% 0%, rgba(245,158,11,0.18), transparent 60%), radial-gradient(240px 200px at 80% 80%, rgba(245,158,11,0.12), transparent 70%)`,
    highlights: [
      "Closed first client",
      "Lifted organic visibility",
      "Directed multi‑channel campaigns",
    ],
  },
];

function FullscreenModal({ open, onClose, act }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-[min(1080px,92vw)] h-[min(86vh,820px)] rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.96)] overflow-hidden text-white"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            style={{ boxShadow: `0 0 40px ${act?.color}3a, inset 0 0 24px ${act?.color}25` }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-semibold text-lg">{act?.title}</h3>
              <button onClick={onClose} className="text-gray-300 hover:text-white">Close</button>
            </div>
            <div className="p-6 text-gray-200">
              <p className="text-gray-300">Detailed story content goes here. (We can plug your finalized copy.)</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HighlightReel({ side = "right", progress, color, items }) {
  // progress is MotionValue 0..1
  const height = useTransform(progress, [0.6, 1], [40, 260]);
  const opacity = useTransform(progress, [0.6, 0.8, 1], [0, 0.5, 1]);
  return (
    <motion.aside
      className={`hidden lg:flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 ${side === "right" ? "right-[6%]" : "left-[6%] items-end"}`}
      style={{ opacity }}
    >
      <motion.div className="relative w-[2px]" style={{ height, background: color, boxShadow: `0 0 16px ${color}AA` }} />
      <div className={`flex flex-col gap-2 text-gray-200 text-sm ${side === "left" ? "items-end" : "items-start"}`}>
        {items.map((t, i) => (
          <motion.div
            key={`hl-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`px-3 py-1 rounded-md bg-[rgba(12,12,12,0.6)] border border-white/10`}
            style={{ boxShadow: `0 0 10px ${color}22` }}
          >
            {t}
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
}

function ActCard({ act, state, onClick, track }) {
  // Iris door: clip-path circle grows with state
  const clip = useMotionTemplate`circle(${useTransform(state, [0, 0.6, 1], [0, 30, 120])}%)`;

  const scale = useTransform(state, [0, 1], [0.95, 1.05]);
  const opacity = useTransform(state, [0, 1], [0.55, 1]);
  const ty = useTransform(state, [0, 1], [track.yFrom, 0]);
  const tx = useTransform(state, [0, 1], [track.xFrom, 0]);

  return (
    <motion.button
      onClick={onClick}
      className="absolute w-[min(90vw,760px)] h-[68vh] rounded-[28px] border overflow-hidden"
      style={{
        top: `calc(50% - 34vh)`,
        left: `calc(50% - ${track.centerShift}px)`,
        borderColor: `${act.color}66`,
        background: `rgba(10,10,12,0.55)`,
        boxShadow: `0 0 30px ${act.color}40, inset 0 0 24px ${act.color}25`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        scale,
        opacity,
        x: tx,
        y: ty,
        zIndex: 10 + track.z,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      {/* background texture (blurred when not focused) */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{ filter: useMotionTemplate`blur(${useTransform(state, [0, 1], [6, 0])}px)`, backgroundImage: act.bg, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      />

      {/* iris door overlay (covers content until focused) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), rgba(0,0,0,0.75))`,
          WebkitClipPath: clip,
          clipPath: clip,
          mixBlendMode: "screen",
          opacity: useTransform(state, [0, 0.6, 1], [1, 0.6, 0]),
        }}
      />

      {/* neon seam sweeping when opening */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
        style={{
          background: act.color,
          boxShadow: `0 0 16px ${act.color}AA`,
          opacity: useTransform(state, [0.4, 0.7, 1], [0, 1, 0.2]),
        }}
        animate={{ filter: ["blur(2px)", "blur(6px)", "blur(2px)"] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />

      {/* content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-10">
        <div>
          <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-wide drop-shadow-lg">{act.title}</h3>
          <p className="text-gray-300 mt-3">Scroll to continue • Click to open details</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function JourneyStepper() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Tracks in px (multi-axis)
  const vw = Math.max(1024, typeof window !== "undefined" ? window.innerWidth : 1280);
  const vh = Math.max(700, typeof window !== "undefined" ? window.innerHeight : 800);
  const tracks = useMemo(() => [
    { xFrom: -0.06 * vw, yFrom: -0.03 * vh, centerShift: 0, z: 3 },
    { xFrom: 0.08 * vw, yFrom: 0.06 * vh, centerShift: 0, z: 2 },
    { xFrom: -0.05 * vw, yFrom: 0.08 * vh, centerShift: 0, z: 1 },
  ], [vw, vh]);

  // segment progress per act
  const s1 = useTransform(scrollYProgress, [0.0, 1 / 3], [0, 1]);
  const s2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1]);
  const s3 = useTransform(scrollYProgress, [2 / 3, 1.0], [0, 1]);
  const states = [s1, s2, s3];

  // snap scrolling to each act
  useEffect(() => {
    let t = null;
    const onScroll = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const total = containerRef.current.offsetHeight - window.innerHeight;
        const scrolled = window.scrollY - (window.scrollY + rect.top);
        // Fallback if rect.top misleads in sticky setups
        const docTop = window.scrollY + rect.top;
        const rel = (window.scrollY - docTop) / Math.max(1, total);
        const anchors = [0, 1 / 3, 2 / 3, 1];
        let nearest = 0;
        let mind = Infinity;
        anchors.forEach((a) => {
          const d = Math.abs(a - rel);
          if (d < mind) { mind = d; nearest = a; }
        });
        const target = docTop + nearest * total;
        window.scrollTo({ top: target, behavior: "smooth" });
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [modal, setModal] = useState({ open: false, act: null });

  return (
    <section id="journey-stepper" className="relative bg-black" data-testid="journey-stepper-section">
      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] opacity-25" style={{ background: "radial-gradient(circle at 30% 30%, #00BFFF44, transparent 60%)" }} />
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full blur-[160px] opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #34d39944, transparent 60%)" }} />
            <div className="absolute -top-10 -right-32 w-[520px] h-[520px] rounded-full blur-[140px] opacity-20" style={{ background: "radial-gradient(circle at 70% 30%, #f59e0b44, transparent 60%)" }} />
          </div>

          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">My Journey</h2>
            <p className="text-gray-400 text-sm mt-1">Scroll to step through the acts</p>
          </div>

          {ACTS.map((act, i) => (
            <ActCard key={act.id} act={act} state={states[i]} onClick={() => setModal({ open: true, act })} track={tracks[i]} />
          ))}

          {/* Alternating highlight reels */}
          {ACTS.map((act, i) => (
            <HighlightReel key={`reel-${act.id}`} side={i === 1 ? "left" : "right"} progress={states[i]} color={act.color} items={act.highlights} />
          ))}
        </div>
      </div>

      <FullscreenModal open={modal.open} onClose={() => setModal({ open: false, act: null })} act={modal.act} />
    </section>
  );
}