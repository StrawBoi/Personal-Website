import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  communication: "#22d3ee",
  software: "#34d399",
  marketing: "#f59e0b",
};

const ChatIcon = ({ color = COLORS.communication, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 18l-1.5 3 3-1.5H18a4 4 0 004-4V8a4 4 0 00-4-4H6a4 4 0 00-4 4v7a3 3 0 003 3h0z" stroke={color} strokeWidth="1.8" />
    <circle cx="9" cy="11" r="1" fill={color} />
    <circle cx="13" cy="11" r="1" fill={color} />
    <circle cx="17" cy="11" r="1" fill={color} />
  </svg>
);
const CodeIcon = ({ color = COLORS.software, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M14.5 4.5L9.5 19.5" stroke={color} strokeWidth="1.8" />
    <path d="M8 8l-4 4 4 4" stroke={color} strokeWidth="1.8" />
    <path d="M16 8l4 4-4 4" stroke={color} strokeWidth="1.8" />
  </svg>
);
const ChartIcon = ({ color = COLORS.marketing, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 20V6" stroke={color} strokeWidth="1.8" />
    <path d="M10 20V10" stroke={color} strokeWidth="1.8" />
    <path d="M16 20v-6" stroke={color} strokeWidth="1.8" />
    <path d="M3 20h18" stroke={color} strokeWidth="1.8" />
  </svg>
);

const DATA = {
  domains: [
    {
      id: "communication",
      label: "Communication",
      color: COLORS.communication,
      Icon: ChatIcon,
      modal: {
        learnings: ["Coaching frameworks", "Handling escalations", "Retention playbooks"],
        achievements: ["Improved retention via targeted follow-ups", "Upsell motions with Salesforce"],
        responsibilities: ["Training staff", "Resolving complex tickets", "Customer communication"],
      },
      // approximate positions (percent-based, align to your image)
      iconPos: { left: 14, top: 58 },
      nodes: [
        { id: "c1", left: 20, top: 55, title: "Subject Matter Expert", company: "Altice One", period: "2015–2016" },
        { id: "c2", left: 27, top: 40, title: "Customer Support Specialist", company: "Vodafone UK", period: "2011–2012" },
        { id: "c3", left: 33, top: 58, title: "Tech Support & Sales", company: "Sirius XM", period: "2013–2015" },
      ],
    },
    {
      id: "software",
      label: "Software Engineering",
      color: COLORS.software,
      Icon: CodeIcon,
      iconPos: { left: 48, top: 62 },
      nodes: [
        { id: "s1", left: 52, top: 56, title: "IT Head Officer", company: "Ammosshipping", period: "2019–2023" },
        { id: "s2", left: 60, top: 42, title: "Junior Web Developer", company: "GB Arena", period: "2014–2016" },
      ],
      modal: {
        learnings: ["Full-stack patterns", "Cloud infrastructure", "ITSM practices"],
        achievements: ["Launched real-time admin dashboard", "Reduced MTTR via ServiceNow"],
        responsibilities: ["Team leadership", "Solution delivery", "Infrastructure direction"],
      },
    },
    {
      id: "marketing",
      label: "Marketing & Business",
      color: COLORS.marketing,
      Icon: ChartIcon,
      iconPos: { left: 78, top: 64 },
      nodes: [
        { id: "m1", left: 83, top: 52, title: "Creative Director", company: "EcoNarrate", period: "2024–Now" },
        { id: "m2", left: 91, top: 63, title: "SEO & Sales", company: "Wisdek", period: "2017" },
      ],
      modal: {
        learnings: ["Brand systems", "Performance content", "Go-to-market"],
        achievements: ["First client closed", "Organic growth improvements"],
        responsibilities: ["Creative strategy", "Campaign direction", "Client development"],
      },
    },
  ],
};

function DomainModal({ open, onClose, domain }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-[rgba(10,10,10,0.95)] border border-white/10 rounded-xl w-[80vw] h-[80vh] overflow-y-auto text-white"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="sticky top-0 z-10 bg-[rgba(10,10,10,0.95)] border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {domain?.Icon && <domain.Icon color={domain.color} size={26} />}
                <h3 className="font-semibold text-lg">{domain?.label}</h3>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-white">Close</button>
            </div>
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-sm text-gray-400">What I learned</div>
                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-200">
                  {domain?.modal?.learnings?.map((x, i) => (
                    <li key={`l-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm text-gray-400">Key achievements</div>
                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-200">
                  {domain?.modal?.achievements?.map((x, i) => (
                    <li key={`a-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm text-gray-400">Responsibilities</div>
                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-200">
                  {domain?.modal?.responsibilities?.map((x, i) => (
                    <li key={`r-${i}`}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function JourneyImageOverlay() {
  const [hover, setHover] = useState(null);
  const [modal, setModal] = useState({ open: false, domain: null });
  const containerRef = useRef(null);

  // simple light sweep loops (visual hint of movement along paths)
  const sweeps = useMemo(() => [
    { id: "c", color: COLORS.communication, delay: 0 },
    { id: "s", color: COLORS.software, delay: 0.6 },
    { id: "m", color: COLORS.marketing, delay: 1.2 },
  ], []);

  const openDomain = (d) => setModal({ open: true, domain: d });

  return (
    <section className="relative" data-testid="journey-image-overlay-section">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: 580, backgroundImage: `url(/journey-bg.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark top gradient to match reference feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Animated light sweeps (subtle) */}
        {sweeps.map((sw) => (
          <motion.div
            key={sw.id}
            className="absolute h-[6px] rounded-full"
            style={{ left: "5%", right: "5%", top: `calc(50% + ${(sw.id === "c" ? -36 : sw.id === "m" ? 36 : 0)}px)` , background: `linear-gradient(90deg, transparent, ${sw.color}, transparent)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], x: ["-5%", "0%", "5%"] }}
            transition={{ duration: 4.2, repeat: Infinity, delay: sw.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Overlay interactive icons and nodes */}
        <div className="absolute inset-0">
          {DATA.domains.map((d) => (
            <div key={d.id}>
              {/* domain icon */}
              <motion.button
                onClick={() => openDomain(d)}
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  left: `${d.iconPos.left}%`,
                  top: `${d.iconPos.top}%`,
                  width: 64,
                  height: 64,
                  boxShadow: `0 0 28px ${d.color}88, inset 0 0 14px ${d.color}44`,
                  border: `1px solid ${d.color}AA`,
                  background: "rgba(0,0,0,0.45)",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`${d.label} details`}
                data-testid={`domain-icon-${d.id}`}
              >
                <d.Icon color={d.color} size={30} />
              </motion.button>

              {/* job dots */}
              {d.nodes.map((n) => (
                <motion.div
                  key={n.id}
                  className="absolute"
                  style={{ left: `${n.left}%`, top: `${n.top}%` }}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  data-testid={`journey-dot-${n.id}`}
                >
                  <motion.div
                    className="w-[18px] h-[18px] rounded-full"
                    style={{ background: d.color, boxShadow: `0 0 22px ${d.color}AA, 0 0 6px ${d.color}` }}
                    animate={{ scale: hover === n.id ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  />

                  <AnimatePresence>
                    {hover === n.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-24 w-[240px] px-3 py-2 bg-[rgba(12,12,12,0.92)] text-white text-sm border border-white/10 rounded-md shadow-lg"
                      >
                        <div className="font-medium leading-tight">{n.title}</div>
                        <div className="text-gray-400 text-xs leading-tight">{n.company} · {n.period}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <DomainModal open={modal.open} onClose={() => setModal({ open: false, domain: null })} domain={modal.domain} />
    </section>
  );
}