import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Data model (logos can be provided later; placeholders used for now)
const roles = [
  { role: "Creative Director", company: "EcoNarrate", period: "APR 2024 – PRESENT", summary: "Co-founded and led creative strategy, landing the first client and defining brand direction.", bullets: ["Creative strategy & direction", "Client acquisition", "Brand systems"], logoUrl: null },
  { role: "IT Head Officer", company: "Ammosshipping", period: "FEB 2019 – AUG 2023", summary: "Led IT ops, built admin dashboards, mitigated vulnerabilities, and ensured reliability.", bullets: ["Admin dashboard", "Security hardening", "Ops reliability"], logoUrl: null },
  { role: "SEO & Sales Rep", company: "Wisdek", period: "JAN 2017 – DEC 2017", summary: "Drove revenue consistently and improved organic traffic via structural SEO improvements.", bullets: ["On-page SEO", "Sales enablement", "Conversion focus"], logoUrl: null },
  { role: "SME", company: "Altice One", period: "2015 – 2016", summary: "Resolved complex escalations and trained managers on technical workflows.", bullets: ["Escalation mgmt", "Technical training", "Retention"], logoUrl: null },
  { role: "Business Consultant", company: "Ghasa Marine", period: "MAY 2023 – DEC 2023", summary: "Consulted on business operations and growth strategy across offerings.", bullets: ["Process audit", "Growth roadmap", "Stakeholder mgmt"], logoUrl: null },
  { role: "Operations Lead", company: "[Add Company]", period: "[Add Period]", summary: "Directed cross-functional ops to scale delivery quality and speed.", bullets: ["SOP design", "Automation", "Team leadership"], logoUrl: null },
  { role: "Product Strategist", company: "[Add Company]", period: "[Add Period]", summary: "Shaped product strategy from insights to roadmap and GTM.", bullets: ["Product narrative", "Roadmap", "GTM"], logoUrl: null },
  { role: "Security/Compliance Advisor", company: "[Add Company]", period: "[Add Period]", summary: "Advised on compliance posture and pragmatic risk reduction.", bullets: ["Policy", "Controls", "Risk mgmt"], logoUrl: null },
];

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const PlaceholderLogo = ({ text = "" }) => (
  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 text-xs">
    {text?.slice(0, 2).toUpperCase()}
  </div>
);

const Card = ({ item, onHover, onClick, idx }) => {
  return (
    <div
      onMouseEnter={() => onHover(idx)}
      onFocus={() => onHover(idx)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(idx)}
      className="group cursor-pointer rounded-3xl border border-white/14 bg-white/6 backdrop-blur-md p-5 flex flex-col gap-2 min-h-[140px] transition-[transform,box-shadow] duration-300 hover:shadow-[0_14px_60px_rgba(20,184,166,0.12)]"
      style={{
        transformStyle: "preserve-3d",
      }}
      data-testid={`journey-cover-card-${idx}`}
    >
      <div className="flex items-center gap-3">
        {item.logoUrl ? (
          <img src={item.logoUrl} alt={`${item.company} logo`} className="w-9 h-9 rounded-xl object-cover border border-white/15" />
        ) : (
          <PlaceholderLogo text={item.company} />
        )}
        <div>
          <div className="text-white font-semibold leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>{item.role} | {item.company}</div>
          <div className="text-gray-300 text-xs" style={{ fontFamily: "'Roboto Mono', ui-monospace" }}>{item.period}</div>
        </div>
      </div>
      <div className="text-gray-200 text-sm mt-1">{item.summary}</div>
      <ul className="text-gray-300 text-xs list-disc pl-5 space-y-0.5 mt-1">
        {item.bullets.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
};

const OverlayPanel = ({ item, onClose }) => (
  <motion.aside
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 40, opacity: 0 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="fixed top-20 right-6 bottom-6 w-[520px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] z-50 overflow-auto"
    data-testid="journey-cover-overlay"
  >
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-white text-xl font-semibold">{item.role} | {item.company}</h4>
          <p className="text-gray-400" style={{ fontFamily: "'Roboto Mono', ui-monospace" }}>{item.period}</p>
        </div>
        <button aria-label="close" className="text-gray-400 hover:text-white" onClick={onClose}><X size={20} /></button>
      </div>
      <div>
        <h5 className="text-white font-semibold">Job Description</h5>
        <p className="text-gray-300 mt-1">{item.summary}</p>
      </div>
      <div>
        <h5 className="text-white font-semibold">Key Achievements</h5>
        <ul className="text-gray-300 list-disc pl-5 mt-1 space-y-1">
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
      <div>
        <h5 className="text-white font-semibold">Skills</h5>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Leadership", "Strategy", "Operations", "CX"].map((t, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full border border-white/15 text-xs text-gray-200 bg-white/5">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </motion.aside>
);

const MyJourneyCoverflow = () => {
  const containerRef = useRef(null);
  const [activeOverlay, setActiveOverlay] = useState(null); // index
  const [hoverIdx, setHoverIdx] = useState(null);

  const pages = useMemo(() => chunk(roles, 3), []);

  // Close overlay on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActiveOverlay(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mobile tap-to-expand: if small screen, clicking a card opens overlay too (same behavior)
  const handleCardClick = (idx) => setActiveOverlay(idx);

  return (
    <section id="story" className="relative py-24" data-testid="section-journey">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>My Journey</h2>
          <p className="mt-5 max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}>
            A career built across creative leadership, engineering, and strategic growth—focused on turning insight into outcomes.
          </p>
        </div>

        {/* Horizontal coverflow with snap-by-trio pages */}
        <div
          ref={containerRef}
          className="relative overflow-x-auto no-scrollbar snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex items-stretch gap-8" style={{ width: `${pages.length * 100}%` }}>
            {pages.map((page, pIdx) => (
              <div key={pIdx} className="snap-start shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {page.map((item, i) => {
                  const idx = pIdx * 3 + i;
                  // Mild depth & blur for neighbors
                  const isCenter = i === 1; // middle of trio
                  return (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={{ scale: isCenter ? 1.02 : 0.96 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <Card item={item} idx={idx} onHover={setHoverIdx} onClick={handleCardClick} />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(hoverIdx !== null || activeOverlay !== null) && (
          <OverlayPanel
            item={roles[activeOverlay ?? hoverIdx ?? 0]}
            onClose={() => { setActiveOverlay(null); setHoverIdx(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MyJourneyCoverflow;