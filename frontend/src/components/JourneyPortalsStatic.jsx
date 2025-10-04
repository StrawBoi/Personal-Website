import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = { blue: "#00BFFF", green: "#34d399", amber: "#f59e0b" };

const ACTS = [
  {
    id: "communication",
    title: "Act I: Communication",
    color: COLORS.blue,
    lines: ["Communications", "Customer empathy"],
    details: {
      learned: [
        "Coaching frameworks and adult learning",
        "De‑escalation and retention playbooks",
        "Clear multi‑channel communication",
      ],
      achievements: [
        "Improved retention via targeted follow‑ups",
        "Resolved high‑impact escalations",
        "Upsell motions coordinated via Salesforce",
      ],
      responsibilities: [
        "Training and mentoring staff",
        "Handling complex tickets",
        "Customer feedback loops",
      ],
      jobs: [
        { role: "Subject Matter Expert", company: "Altice One", period: "2015–2016" },
        { role: "Tech Support & Sales", company: "Sirius XM", period: "2013–2015" },
        { role: "Customer Support Specialist", company: "Vodafone UK", period: "2011–2012" },
      ],
    },
  },
  {
    id: "software",
    title: "Act II: Software Development",
    color: COLORS.green,
    lines: ["Full‑stack delivery", "Cloud & ITSM"],
    details: {
      learned: ["Full‑stack patterns (SPA, REST)", "Azure/AWS", "ITSM (ServiceNow)"],
      achievements: [
        "Launched real‑time Admin Dashboard",
        "Reduced MTTR by optimizing ITSM",
        "Delivered end‑to‑end features",
      ],
      responsibilities: ["Team leadership", "Solution delivery", "Infra direction & budgets"],
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
    lines: ["Brand & growth", "Client development"],
    details: {
      learned: ["Brand systems", "Performance content", "GTM"],
      achievements: ["Closed first client", "Organic visibility lift", "Shipped campaigns"],
      responsibilities: ["Creative direction", "Client development", "Content ops"],
      jobs: [
        { role: "Creative Director", company: "EcoNarrate", period: "2024–Present" },
        { role: "SEO & Sales Representative", company: "Wisdek", period: "2017" },
      ],
    },
  },
];

function DataStream() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="dsGradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={COLORS.blue} />
          <stop offset="34%" stopColor={COLORS.blue} />
          <stop offset="50%" stopColor={COLORS.green} />
          <stop offset="66%" stopColor={COLORS.green} />
          <stop offset="100%" stopColor={COLORS.amber} />
        </linearGradient>
        <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path id="streamPath" d="M 120 300 C 280 160 420 160 500 280 S 760 400 880 280" fill="none" stroke="url(#dsGradient)" strokeWidth="14" opacity="0.25" filter="url(#glowBlur)" />
      <path d="M 120 300 C 280 160 420 160 500 280 S 760 400 880 280" fill="none" stroke="url(#dsGradient)" strokeWidth="3" opacity="0.85" />
      <path d="M 120 300 C 280 160 420 160 500 280 S 760 400 880 280" fill="none" stroke="url(#dsGradient)" strokeWidth="4" strokeDasharray="16 26" opacity="0.8">
        <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="3s" repeatCount="indefinite" />
      </path>
      {[0, 0.33, 0.66].map((delay, idx) => (
        <circle key={`p-${idx}`} r="4" fill="#ffffff">
          <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear" begin={`${delay}s`}>
            <mpath xlinkHref="#streamPath" />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

function Portal({ act, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative rounded-[28px] border bg-[rgba(10,10,12,0.55)] overflow-hidden"
      style={{
        width: "clamp(260px, 28vw, 360px)",
        height: "clamp(380px, 56vh, 520px)",
        borderColor: `${act.color}`,
        boxShadow: `0 0 0 2px ${act.color}AA, 0 0 36px ${act.color}AA, 0 0 72px ${act.color}66, inset 0 0 32px ${act.color}33`,
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {act.id === "communication" && (
        <div className="absolute inset-0" style={{ backgroundImage: `url('/comm-bg.jpg')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.26, mixBlendMode: "screen", filter: "saturate(1.05) brightness(0.95)" }} />
      )}
      {act.id === "communication" && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))" }} />
      )}

      <motion.span className="pointer-events-none absolute inset-[2px] rounded-[26px] block" style={{ boxShadow: `0 -18px 48px ${act.color}, 0 14px 56px ${act.color}AA` }} />

      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
        <div>
          <div className="text-white text-[28px] font-semibold tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{act.title}</div>
          <div className="text-gray-200 text-sm mt-4 space-y-1">
            {act.lines.map((l, i) => (
              <div key={`l-${i}`}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 -bottom-[110px] h-[110px] rounded-[28px]" style={{ background: "rgba(10,10,12,0.7)", filter: `blur(18px) drop-shadow(0 0 32px ${act.color}BB)`, transform: "scaleY(-1)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }} />
    </motion.button>
  );
}

function CinematicModal({ open, onClose, act }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80" onClick={onClose} />
          <motion.div className="relative w-[min(1080px,92vw)] h-[min(86vh,820px)] rounded-2xl border border-white/10 bg-[rgba(10,10,12,0.96)] overflow-hidden text-white" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ type: "spring", stiffness: 220, damping: 26 }} style={{ boxShadow: `0 0 40px ${act?.color}3a, inset 0 0 24px ${act?.color}25` }}>
            <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ background: "radial-gradient(1000px 400px at 50% 10%, rgba(255,255,255,0.06), transparent 60%)" }} />
            <motion.div className="absolute top-0 bottom-0 left-[-30%] w-[30%]" initial={{ opacity: 0, x: -200 }} animate={{ opacity: 0.6, x: [ -200, 1200 ] }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }} style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
            <div className="relative z-10 px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="text-white font-semibold text-lg">Entering {act?.title}</motion.div>
              <button onClick={onClose} className="text-gray-300 hover:text-white">Close</button>
            </div>
            <motion.div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.4 }}>
              <div>
                <div className="text-gray-400 text-sm">What I learned</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">{(act?.details?.learned || ["[placeholder]", "[placeholder]"]).map((x, i) => <li key={`l-${i}`}>{x}</li>)}</ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Key achievements</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">{(act?.details?.achievements || ["[placeholder]", "[placeholder]"]).map((x, i) => <li key={`a-${i}`}>{x}</li>)}</ul>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Responsibilities</div>
                <ul className="mt-2 space-y-2 list-disc list-inside">{(act?.details?.responsibilities || ["[placeholder]", "[placeholder]"]).map((x, i) => <li key={`r-${i}`}>{x}</li>)}</ul>
              </div>
            </motion.div>
            {act?.details?.jobs && (
              <motion.div className="relative z-10 px-6 pb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.4 }}>
                <div className="text-gray-400 text-sm">Roles</div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {act.details.jobs.map((job, i) => (
                    <div key={`j-${i}`} className="border border-white/10 rounded-lg p-3 bg-[rgba(14,14,16,0.6)]">
                      <div className="text-white font-medium">{job.role}</div>
                      <div className="text-gray-300 text-sm">{job.company}</div>
                      <div className="text-gray-500 text-xs">{job.period}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypewriterPager() {
  const pages = [
    "My career began in customer-facing roles, where I developed a firsthand understanding of the user experience—the frustrations, the needs, and what defines a great product. It was this experience that sparked my passion for technology; I didn't just want to troubleshoot problems, I wanted to build the solutions.",
    "I pursued computer science and dove into full-stack development, growing from a junior developer to leading an entire IT department. My focus has always been on translating the user's needs into functional, high-performing software. This involved everything from building responsive websites to designing and implementing enterprise-level solutions and cloud infrastructure.",
    "Now, I'm focused on the final piece of the puzzle: ensuring those solutions make a real business impact. My work in sales, marketing, and as a creative director, combined with my current business studies, is about connecting technology to a larger strategy. It's about using data-driven insights to fuel growth and deliver value from the ground up.",
    "Looking ahead, my vision is to step into leadership roles where I can fully leverage this unique blend of skills. I am passionate about building and leading cross-functional teams to create products that are not only technologically innovative but also strategically marketed and deeply connected to the customer experience. Ultimately, my goal is to drive sustainable growth by ensuring every technical solution serves a clear business purpose.",
  ];

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTyped("");
    setTyping(true);
    const text = pages[index];
    const speed = 18; // ms per char (fast/techy)
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTyping(false);
      }
    }, speed);
    return () => clearInterval(id);
  }, [index]);

  const go = (n) => {
    if (n < 0 || n >= pages.length) return;
    setIndex(n);
  };

  return (
    <div className="relative max-w-4xl mx-auto mb-12" data-testid="journey-typewriter">
      <div className="min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${index}`}
            initial={{ opacity: 0, x: 40, clipPath: "inset(0 0 0 100%)" }}
            animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
            exit={{ opacity: 0, x: -80, clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-base md:text-lg leading-relaxed font-[500]"
          >
            {typed}
            {typing && <span className="inline-block w-[10px] h-[20px] bg-white ml-1 align-[-3px] animate-pulse" />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots navigator (4 pages) */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => go(i)}
            aria-label={`Go to paragraph ${i + 1}`}
            className="relative"
          >
            <span
              className="block w-[8px] h-[8px] rounded-full"
              style={{
                background: i === index ? "#ffffff" : "rgba(255,255,255,0.35)",
                boxShadow: i === index ? "0 0 10px rgba(255,255,255,0.8)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* prev/next helpers */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
        <button onClick={() => go(Math.max(0, index - 1))} className="hover:text-white">Prev</button>
        <span>•</span>
        <button onClick={() => go(Math.min(3, index + 1))} className="hover:text-white">Next</button>
      </div>
    </div>
  );
}

export default function JourneyPortalsStatic() {
  const [modal, setModal] = useState({ open: false, act: null });

  return (
    <section className="relative bg-black" data-testid="journey-portals-static">
      <div className="absolute inset-0 -z-20" style={{ backgroundImage: `url('/atmos-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.34 }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

      <DataStream />

      <div className="container mx-auto px-6 py-20 relative">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">My Journey</h2>
        </div>

        {/* Typewriter narrative */}
        <TypewriterPager />

        {/* portals row */}
        <div className="relative w-full flex items-end justify-center gap-[6vw]">
          {ACTS.map((act) => (
            <Portal key={act.id} act={act} onClick={() => setModal({ open: true, act })} />
          ))}
        </div>
      </div>

      <CinematicModal open={modal.open} onClose={() => setModal({ open: false, act: null })} act={modal.act} />
    </section>
  );
}