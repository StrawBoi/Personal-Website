import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Colors and icons
const COLORS = {
  communication: "#22d3ee", // cyan/teal
  software: "#34d399", // green
  marketing: "#f59e0b", // amber
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

// Journey content
const DATA = {
  domains: [
    {
      id: "communication",
      label: "Communication",
      color: COLORS.communication,
      icon: ChatIcon,
      nodes: [
        {
          id: "altice-sme",
          title: "Subject Matter Expert",
          company: "Altice One",
          period: "FEB 2015 – DEC 2016",
          summary:
            "Key resource for technical knowledge and service best practices; coaching, escalations and retention.",
          percent: 0.18,
        },
        {
          id: "vodafone-support",
          title: "Customer Support Specialist",
          company: "Vodafone UK",
          period: "JUN 2011 – OCT 2012",
          summary:
            "Exceptional multi-channel support across inquiries and service issues.",
          percent: 0.45,
        },
        {
          id: "sirius-support-sales",
          title: "Tech Support & Sales",
          company: "Sirius XM",
          period: "JUL 2013 – JAN 2015",
          summary:
            "Troubleshooting + upsell, using Zendesk and Salesforce to grow revenue.",
          percent: 0.7,
        },
      ],
      modal: {
        learnings: ["Coaching frameworks", "Handling escalations", "Retention playbooks"],
        achievements: ["Improved retention via targeted follow-ups", "Upsell motions with Salesforce"],
        responsibilities: ["Training staff", "Resolving complex tickets", "Customer communication"]
      },
    },
    {
      id: "software",
      label: "Software Engineering",
      color: COLORS.software,
      icon: CodeIcon,
      nodes: [
        {
          id: "ammos-it-head",
          title: "IT Head Officer",
          company: "Ammosshipping",
          period: "FEB 2019 – AUG 2023",
          summary:
            "Led IT & Software; strategy, delivery and dashboards; Azure/AWS & ServiceNow.",
          percent: 0.3,
        },
        {
          id: "gb-arena-junior",
          title: "Junior Web Developer",
          company: "GB Arena",
          period: "SEP 2014 – NOV 2016",
          summary:
            "Full‑stack foundations with HTML/CSS/JS, PHP/MySQL, Angular, Git.",
          percent: 0.65,
        },
      ],
      modal: {
        learnings: ["Full-stack patterns", "Cloud infrastructure", "ITSM practices"],
        achievements: ["Launched real-time admin dashboard", "Reduced MTTR via ServiceNow"],
        responsibilities: ["Team leadership", "Solution delivery", "Infrastructure direction"]
      },
    },
    {
      id: "marketing",
      label: "Marketing & Business",
      color: COLORS.marketing,
      icon: ChartIcon,
      nodes: [
        {
          id: "econarrate-director",
          title: "Creative Director",
          company: "EcoNarrate",
          period: "APR 2024 – PRESENT",
          summary:
            "Co‑founded sustainable creative studio; first client success, branding & campaigns.",
          percent: 0.38,
        },
        {
          id: "wisdek-seo-sales",
          title: "SEO & Sales Rep",
          company: "Wisdek",
          period: "JAN 2017 – DEC 2017",
          summary:
            "SEO optimization and consultative sales; exceeded targets.",
          percent: 0.82,
        },
      ],
      modal: {
        learnings: ["Brand systems", "Performance content", "Go-to-market"],
        achievements: ["First client closed", "Organic growth improvements"],
        responsibilities: ["Creative strategy", "Campaign direction", "Client development"]
      },
    },
  ],
};

function useContainerSize(ref) {
  const [size, setSize] = useState({ width: 1200, height: 400 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ width: Math.max(640, r.width), height: r.height || 400 });
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

function DomainModal({ open, onClose, domain }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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

export default function JourneySplitTimeline() {
  const containerRef = useRef(null);
  const { width } = useContainerSize(containerRef);

  const [positions, setPositions] = useState({});
  const [hovered, setHovered] = useState(null);
  const [modal, setModal] = useState({ open: false, domain: null });

  const height = 420; // desktop SVG height

  // Build smooth wavy path for each domain
  const paths = useMemo(() => {
    const margin = 60;
    const w = Math.max(800, width - margin * 2);
    const h = height - 80;

    const build = (phase = 0) => {
      const yBase = h / 2 + 20;
      const amp = 70; // wave amplitude
      const step = w / 4;
      const x0 = margin;
      const x1 = margin + step;
      const x2 = margin + step * 2;
      const x3 = margin + step * 3;
      const x4 = margin + step * 4;
      // vertical offsets per domain
      const v = phase * 36 - 36; // -36, 0, +36
      const y0 = yBase + v;
      const y1 = yBase - amp + v;
      const y2 = yBase + amp + v;
      const y3 = yBase - amp + v;
      const y4 = yBase + v;
      const d = `M ${x0},${y0} C ${x1},${y1} ${x1},${y1} ${x2},${y2} S ${x3},${y3} ${x4},${y4}`;
      return { d, w, h: height, start: { x: x0, y: y0 } };
    };

    return {
      communication: build(0),
      software: build(1),
      marketing: build(2),
    };
  }, [width]);

  // Refs to measure each SVG path length
  const pathRefs = {
    communication: useRef(null),
    software: useRef(null),
    marketing: useRef(null),
  };

  // Compute node positions along paths
  useEffect(() => {
    const next = {};
    DATA.domains.forEach((domain) => {
      const p = pathRefs[domain.id]?.current;
      if (!p) return;
      const length = p.getTotalLength();
      next[domain.id] = domain.nodes.map((n) => {
        const pt = p.getPointAtLength(n.percent * length);
        return { id: n.id, x: pt.x, y: pt.y };
      });
    });
    setPositions(next);
  }, [paths.communication.d, paths.software.d, paths.marketing.d]);

  const openDomain = (domain) => setModal({ open: true, domain: { ...domain, Icon: domain.icon, color: domain.color } });

  return (
    <section className="relative bg-black" data-testid="journey-split-timeline-section">
      {/* Desktop: horizontal split paths */}
      <div className="hidden md:block container mx-auto px-6 py-20" ref={containerRef}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">My Journey — Split Timeline</h2>
          <p className="text-gray-400 text-sm mt-1">Hover nodes for quick info • Click domain icon for full details</p>
        </div>

        <div className="relative" style={{ height }}>
          <svg className="absolute inset-0 w-full h-full">
            {/* subtle blueprint grid */}
            <defs>
              <filter id="glow" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Paths */}
            {DATA.domains.map((d) => (
              <g key={`path-${d.id}`}>
                <path
                  ref={pathRefs[d.id]}
                  d={paths[d.id].d}
                  stroke={d.color}
                  strokeWidth={6}
                  fill="none"
                  opacity={0.95}
                  style={{ filter: "url(#glow)" }}
                />

                {/* Domain icon at path start */}
                <g
                  transform={`translate(${paths[d.id].start.x - 26}, ${paths[d.id].start.y - 26})`}
                >
                  <foreignObject x="0" y="0" width="52" height="52">
                    <div
                      onClick={() => openDomain(d)}
                      className="w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-pointer"
                      style={{ boxShadow: `0 0 24px ${d.color}66, inset 0 0 10px ${d.color}33`, background: "rgba(0,0,0,0.5)", border: `1px solid ${d.color}AA` }}
                      data-testid={`domain-icon-${d.id}`}
                    >
                      <d.icon color={d.color} size={26} />
                    </div>
                  </foreignObject>
                </g>
              </g>
            ))}
          </svg>

          {/* Nodes overlay */}
          <div className="absolute inset-0">
            {DATA.domains.map((domain) => (
              <React.Fragment key={`nodes-${domain.id}`}>
                {positions[domain.id]?.map((pt, idx) => {
                  const node = domain.nodes[idx];
                  const isHover = hovered === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      className="absolute"
                      style={{ left: pt.x - 10, top: pt.y - 10 }}
                      onMouseEnter={() => setHovered(node.id)}
                      onMouseLeave={() => setHovered(null)}
                      initial={false}
                      animate={{ scale: isHover ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      data-testid={`timeline-node-${node.id}`}
                    >
                      {/* Dot */}
                      <div
                        className="w-[20px] h-[20px] rounded-full"
                        style={{ background: domain.color, boxShadow: `0 0 20px ${domain.color}AA, 0 0 6px ${domain.color}` }}
                      />

                      {/* Ripple */}
                      <AnimatePresence>
                        {isHover && (
                          <motion.span
                            key="r1"
                            className="absolute -inset-3 rounded-full border"
                            style={{ borderColor: domain.color }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 0.5, scale: 1.5 }}
                            exit={{ opacity: 0, scale: 1.8 }}
                            transition={{ duration: 0.8 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Floating card */}
                      <AnimatePresence>
                        {isHover && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: -10 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="absolute left-1/2 -translate-x-1/2 -top-20 w-[220px] px-3 py-2 bg-[rgba(12,12,12,0.9)] text-white text-sm border border-white/10 rounded-md shadow-lg"
                          >
                            <div className="font-medium leading-tight">{node.title}</div>
                            <div className="text-gray-400 text-xs leading-tight">{node.company} · {node.period}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: single vertical path by domain */}
      <div className="md:hidden container mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-white mb-4">My Journey</h2>
        <div className="space-y-10">
          {DATA.domains.map((d) => (
            <div key={`m-${d.id}`} className="relative pl-6">
              <div className="absolute left-1 top-1 bottom-1 w-[3px]" style={{ background: `${d.color}` }} />
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ boxShadow: `0 0 12px ${d.color}AA`, border: `1px solid ${d.color}66` }}>
                  <d.icon color={d.color} size={18} />
                </div>
                <div className="text-white font-medium">{d.label}</div>
              </div>
              <div className="space-y-4">
                {d.nodes.map((n) => (
                  <div key={n.id} className="p-3 border border-white/10 rounded-md bg-[rgba(12,12,12,0.6)]">
                    <div className="text-white text-sm font-medium">{n.title}</div>
                    <div className="text-gray-400 text-xs">{n.company} · {n.period}</div>
                    <div className="text-gray-300 text-xs mt-2">{n.summary}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => openDomain(d)}
                className="mt-3 text-xs text-white/90 underline underline-offset-4"
              >View {d.label} details</button>
            </div>
          ))}
        </div>
      </div>

      <DomainModal open={modal.open} onClose={() => setModal({ open: false, domain: null })} domain={modal.domain} />
    </section>
  );
}