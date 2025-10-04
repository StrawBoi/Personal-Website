import React, { useRef, useState } from "react";
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
    details: {
      learned: ["Coaching frameworks", "De-escalation", "Multi-channel comms"],
      achievements: ["Retention improvements", "Escalation ownership", "Upsell enablement"],
      responsibilities: ["Training", "Complex tickets", "Feedback loops"],
    },
    highlights: [
      "Key Achievement: [placeholder]",
      "Skill: [placeholder]",
      "Outcome: [placeholder]",
    ],
  },
  {
    id: "software",
    title: "Act II: Software Development",
    color: COLORS.green,
    bg: `radial-gradient(120px 160px at 50% 0%, rgba(52,211,153,0.18), transparent 60%), radial-gradient(240px 200px at 80% 80%, rgba(52,211,153,0.12), transparent 70%)`,
    details: {
      learned: ["Full-stack patterns", "Cloud (Azure/AWS)", "ITSM"],
      achievements: ["Real-time dashboard", "Lower MTTR", "E2E delivery"],
      responsibilities: ["Team lead", "Solution delivery", "Infra direction"],
    },
    highlights: [
      "Key Achievement: [placeholder]",
      "Skill: [placeholder]",
      "Tooling: [placeholder]",
    ],
  },
  {
    id: "marketing",
    title: "Act III: Marketing & Business",
    color: COLORS.amber,
    bg: `radial-gradient(120px 160px at 50% 0%, rgba(245,158,11,0.18), transparent 60%), radial-gradient(240px 200px at 80% 80%, rgba(245,158,11,0.12), transparent 70%)`,
    details: {
      learned: ["Brand systems", "Performance content", "GTM"],
      achievements: ["First client closed", "Organic lift", "Cross-channel"],
      responsibilities: ["Creative direction", "Client dev", "Content ops"],
    },
    highlights: [
      "Key Achievement: [placeholder]",
      "Skill: [placeholder]",
      "Metric: [placeholder]",
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-gray-200">
              <div>
                <div className="text-gray-400 text-sm">What I learned</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.learned?.map((x, i) => <li key={`l-${i}`}>{x}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Key achievements</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.achievements?.map((x, i) => <li key={`a-${i}`}>{x}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Responsibilities</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.responsibilities?.map((x, i) => <li key={`r-${i}`}>{x}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HighlightReel({ visible, color, items }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="hidden lg:flex flex-col gap-4 absolute right-[8%] top-1/2 -translate-y-1/2"
        >
          <div className="relative h-[260px] w-[2px]" style={{ background: `${color}88`, boxShadow: `0 0 16px ${color}88` }}>
            {[0.15, 0.5, 0.85].map((p, i) => (
              <div key={`n-${i}`} className="absolute -left-[6px] w-[14px] h-[14px] rounded-full" style={{ top: `${p * 100}%`, background: color, boxShadow: `0 0 16px ${color}cc, 0 0 6px ${color}` }} />
            ))}
          </div>
          <div className="flex flex-col gap-3 text-gray-200 text-sm">
            {items.map((t, i) => (
              <div key={`t-${i}`} className="pl-3 border-l border-white/10">{t}</div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ActCard({ act, state, onClick }) {
  // state is a MotionValue in [0,1]
  const scale = useTransform(state, [0, 1], [0.95, 1.05]);
  const opacity = useTransform(state, [0, 1], [0.5, 1]);
  const translateY = useTransform(state, [0, 1], [80, 0]);
  const blurPx = useTransform(state, [0, 1], [6, 0]);
  const blurFilter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.button
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 w-[min(90vw,760px)] h-[68vh] rounded-[28px] border overflow-hidden"
      style={{
        top: `calc(50% - 34vh)`,
        borderColor: `${act.color}66`,
        background: `rgba(10,10,12,0.55)`,
        boxShadow: `0 0 30px ${act.color}40, inset 0 0 24px ${act.color}25`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        scale,
        opacity,
        y: translateY,
        filter: blurFilter,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      {/* subtle symbolic background */}
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: act.bg, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />

      {/* neon rim accents */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 40px ${act.color}25` }} />

      {/* content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-10">
        <div>
          <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-wide">{act.title}</h3>
          <p className="text-gray-400 mt-3">Scroll to continue • Click to open details</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function JourneyStepper() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // 3 segments across the container
  const segment1 = useTransform(scrollYProgress, [0.0, 1 / 3], [0, 1]);
  const segment2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1]);
  const segment3 = useTransform(scrollYProgress, [2 / 3, 1.0], [0, 1]);

  // modal state
  const [modal, setModal] = useState({ open: false, act: null });

  const states = [segment1, segment2, segment3];

  return (
    <section id="journey-stepper" className="relative bg-black" data-testid="journey-stepper-section">
      {/* Scroll container 300vh with sticky viewport */}
      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 -z-10">
            {/* atmospheric ripples */}
            <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] opacity-25" style={{ background: "radial-gradient(circle at 30% 30%, #00BFFF44, transparent 60%)" }} />
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full blur-[160px] opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #34d39944, transparent 60%)" }} />
            <div className="absolute -top-10 -right-32 w-[520px] h-[520px] rounded-full blur-[140px] opacity-20" style={{ background: "radial-gradient(circle at 70% 30%, #f59e0b44, transparent 60%)" }} />
          </div>

          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">My Journey</h2>
            <p className="text-gray-400 text-sm mt-1">Scroll to step through the acts</p>
          </div>

          {/* Cards */}
          {ACTS.map((act, i) => (
            <ActCard key={act.id} act={act} state={states[i]} onClick={() => setModal({ open: true, act })} />
          ))}

          {/* Highlight reels */}
          {ACTS.map((act, i) => (
            <motion.div key={`reel-${act.id}`} className="absolute inset-0" style={{ opacity: states[i] }}>
              <HighlightReel visible={true} color={act.color} items={act.highlights} />
            </motion.div>
          ))}
        </div>
      </div>

      <FullscreenModal open={modal.open} onClose={() => setModal({ open: false, act: null })} act={modal.act} />
    </section>
  );
}