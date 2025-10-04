import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    details: {
      learned: [
        "Coaching frameworks and adult learning basics",
        "De‑escalation and retention playbooks",
        "Clear multi‑channel communication",
      ],
      achievements: [
        "Improved retention through targeted follow‑ups",
        "Resolved high‑impact escalations consistently",
        "Upsell motions coordinated via Salesforce",
      ],
      responsibilities: [
        "Training and mentoring staff",
        "Handling complex support tickets",
        "Customer communication and feedback loops",
      ],
      jobs: [
        { role: "Subject Matter Expert", company: "Altice One", period: "2015–2016" },
        { role: "Technical Support & Sales", company: "Sirius XM", period: "2013–2015" },
        { role: "Customer Support Specialist", company: "Vodafone UK", period: "2011–2012" },
      ],
    },
  },
  {
    id: "software",
    title: "Act II: Software Development",
    color: COLORS.green,
    details: {
      learned: [
        "Full‑stack patterns (SPA, REST)",
        "Cloud infrastructure on Azure/AWS",
        "ITSM and incident workflows with ServiceNow",
      ],
      achievements: [
        "Launched real‑time Admin Dashboard",
        "Reduced MTTR by optimizing ITSM",
        "Delivered end‑to‑end features with QA and CI",
      ],
      responsibilities: [
        "Team leadership and planning",
        "Solution delivery and stakeholder alignment",
        "Infrastructure direction and budgets",
      ],
      jobs: [
        { role: "IT Head Officer", company: "Ammosshipping", period: "2019–2023" },
        { role: "Junior Web Developer", company: "GB Arena", period: "2014–2016" },
      ],
    },
  },
  {
    id: "marketing",
    title: "Act III: Marketing & Business",
    color: COLORS.amber,
    details: {
      learned: [
        "Brand systems and positioning",
        "Performance content and measurement",
        "Go‑to‑market and pipeline basics",
      ],
      achievements: [
        "Closed first client at EcoNarrate",
        "Improved organic visibility with SEO",
        "Shipped cross‑channel campaigns",
      ],
      responsibilities: [
        "Creative and campaign direction",
        "Client development and discovery",
        "Content strategy and distribution",
      ],
      jobs: [
        { role: "Creative Director", company: "EcoNarrate", period: "2024–Present" },
        { role: "SEO & Sales Representative", company: "Wisdek", period: "2017" },
      ],
    },
  },
];

function GlowPortal({ color, title, onClick }) {
  // Glow intensities for idle/hover
  const baseShadow = `0 0 24px ${color}55, 0 0 48px ${color}33`;
  const innerShadow = `inset 0 0 16px ${color}55, inset 0 0 32px ${color}22`;

  return (
    <motion.button
      onClick={onClick}
      className="relative w-full max-w-[320px] h-[420px] rounded-[28px] bg-[rgba(8,8,10,0.55)] border"
      style={{
        borderColor: `${color}AA`,
        boxShadow: `${baseShadow}, ${innerShadow}`,
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Neon edge accents (top left / top right / bottom segments) */}
      <span
        className="pointer-events-none absolute rounded-[28px] inset-[2px]"
        style={{
          boxShadow: `0 -10px 24px ${color}AA, 0 10px 32px ${color}55`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
        <div>
          <h3 className="text-white text-2xl font-semibold tracking-wide">{title}</h3>
          <p className="text-gray-400 text-sm mt-3">Click to enter the story</p>
        </div>
      </div>

      {/* Reflection below */}
      <div
        className="absolute left-0 right-0 -bottom-[90px] h-[90px] opacity-50"
        style={{
          transform: "scaleY(-1)",
          filter: `blur(16px) drop-shadow(0 0 24px ${color}77)`,
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          boxShadow: `${baseShadow}`,
          borderRadius: 28,
          background: "rgba(8,8,10,0.55)",
        }}
      />
    </motion.button>
  );
}

function FullscreenModal({ open, onClose, act }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-[min(1080px,92vw)] h-[min(86vh,820px)] rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.96)] overflow-hidden"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            style={{ boxShadow: `0 0 40px ${act?.color}44, inset 0 0 24px ${act?.color}22` }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(1200px 500px at 50% 10%, ${act?.color}0F, transparent)` }} />
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 relative z-10">
              <h3 className="text-white font-semibold text-lg">{act?.title}</h3>
              <button onClick={onClose} className="text-gray-300 hover:text-white">Close</button>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-gray-200">
              <div>
                <div className="text-gray-400 text-sm">What I learned</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.learned?.map((x, i) => (
                    <li key={`l-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Key achievements</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.achievements?.map((x, i) => (
                    <li key={`a-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Responsibilities</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  {act?.details?.responsibilities?.map((x, i) => (
                    <li key={`r-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative z-10 px-6 pb-6">
              <div className="text-gray-400 text-sm">Roles</div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                {act?.details?.jobs?.map((job, i) => (
                  <div key={`j-${i}`} className="border border-white/10 rounded-lg p-3 bg-[rgba(14,14,16,0.6)]">
                    <div className="text-white font-medium">{job.role}</div>
                    <div className="text-gray-300 text-sm">{job.company}</div>
                    <div className="text-gray-500 text-xs">{job.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function JourneyGateways() {
  const [modal, setModal] = useState({ open: false, act: null });

  return (
    <section className="relative bg-black" data-testid="journey-gateways-section">
      {/* atmospheric background ripples */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[540px] h-[540px] rounded-full blur-[120px] opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, #00BFFF55, transparent 60%)" }} />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full blur-[140px] opacity-25" style={{ background: "radial-gradient(circle at 50% 50%, #34d39955, transparent 60%)" }} />
        <div className="absolute -top-20 -right-32 w-[520px] h-[520px] rounded-full blur-[120px] opacity-25" style={{ background: "radial-gradient(circle at 70% 30%, #f59e0b55, transparent 60%)" }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">My Journey</h2>
          <p className="text-gray-400 text-sm mt-1">Choose a gateway to explore the story</p>
        </div>

        {/* portals row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          {ACTS.map((act) => (
            <GlowPortal key={act.id} color={act.color} title={act.title} onClick={() => setModal({ open: true, act })} />
          ))}
        </div>

        {/* floor reflection gloss */}
        <div className="relative mt-24 h-[120px]">
          <div className="absolute inset-x-10 bottom-0 h-[120px] opacity-50" style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
            filter: "blur(16px)",
          }} />
        </div>
      </div>

      <FullscreenModal open={modal.open} onClose={() => setModal({ open: false, act: null })} act={modal.act} />
    </section>
  );
}