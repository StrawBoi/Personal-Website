import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Content model derived from user-provided data
const journeyData = {
  center: { id: "center", label: "My Journey" },
  acts: [
    {
      id: "communication",
      label: "Communication",
      subBranches: [
        {
          id: "training-sme",
          label: "Training & SME",
          jobs: [
            {
              id: "altice-sme",
              title: "Subject Matter Expert",
              company: "Altice One",
              period: "FEBRUARY 2015 – DECEMBER 2016",
              summary:
                "Served as a key resource for technical knowledge and customer service best practices, training both managers and employees while improving team performance and retention.",
              achievements: [
                "Trained and coached managers and employees on technical knowledge and customer service best practices.",
                "Resolved complex customer escalations, improving retention and satisfaction.",
                "Conducted follow-ups with clients considering cancellations, successfully retaining key accounts.",
              ],
              skills:
                "Team Leadership & Training, Customer Retention, Communication & Client Relations",
            },
          ],
        },
        {
          id: "support-escalations",
          label: "Support & Escalations",
          jobs: [
            {
              id: "vodafone-support",
              title: "Customer Support Specialist",
              company: "Vodafone UK",
              period: "JUNE 2011 – OCTOBER 2012",
              summary:
                "Delivered exceptional multi-channel support, handling product inquiries, service issues and ensuring high customer satisfaction.",
              achievements: [
                "Delivered support via phone, email, and live chat.",
                "Resolved a wide range of product and service issues; assisted with account management.",
                "Managed customer feedback and ensured timely resolutions.",
              ],
              skills:
                "Zendesk, Customer Support, Client Relations, Customer Retention",
            },
          ],
        },
        {
          id: "sales-enablement",
          label: "Sales Enablement",
          jobs: [
            {
              id: "sirius-support-sales",
              title: "Technical Support and Sales Professional",
              company: "Sirius XM",
              period: "JULY 2013 – JANUARY 2015",
              summary:
                "Blended technical troubleshooting with sales to resolve issues and identify upsell opportunities while contributing to revenue growth.",
              achievements: [
                "Provided technical support and troubleshooting using Zendesk.",
                "Used Salesforce to track interactions and identify upsell opportunities.",
                "Promoted and upsold subscription plans; provided product recommendations.",
              ],
              skills:
                "Zendesk, Salesforce, Technical Support, Sales, Customer Satisfaction",
            },
          ],
        },
      ],
    },
    {
      id: "software",
      label: "Software Development",
      subBranches: [
        {
          id: "it-leadership",
          label: "IT Leadership",
          jobs: [
            {
              id: "ammos-it-head",
              title: "Information Technology Head Officer",
              company: "Ammosshipping",
              period: "FEBRUARY 2019 – AUGUST 2023",
              summary:
                "Led the entire IT and Software Department, overseeing operations, team management, and solution delivery aligned with business goals.",
              achievements: [
                "Led and managed the IT and Software Department, aligning with business objectives.",
                "Spearheaded design, development, and deployment of software solutions.",
                "Built an interactive Admin Dashboard for real-time monitoring and analysis.",
                "Directed IT infrastructure strategy, including Azure and AWS.",
                "Optimized ITSM with ServiceNow, reducing incident resolution time.",
              ],
              skills:
                "Team Leadership, Microsoft Azure, AWS, ServiceNow, Project Management, Budget Management",
            },
          ],
        },
        {
          id: "fullstack-web",
          label: "Full‑Stack Web",
          jobs: [
            {
              id: "gb-arena-junior",
              title: "Junior Web Developer",
              company: "GB Arena",
              period: "SEPTEMBER 2014 – NOVEMBER 2016",
              summary:
                "Hands-on full‑stack experience building dynamic and responsive web applications with focus on UX and mobile compatibility.",
              achievements: [
                "Built and maintained responsive sites with HTML, CSS, JavaScript.",
                "Integrated back‑end using PHP and MySQL for dynamic apps.",
                "Developed SPAs with Angular to improve performance.",
                "Used Git for version control and collaboration.",
              ],
              skills: "HTML, CSS, JavaScript, PHP, MySQL, Angular, Git",
            },
          ],
        },
        // third branch intentionally omitted per user request (can add later)
      ],
    },
    {
      id: "marketing",
      label: "Marketing & Business",
      subBranches: [
        {
          id: "creative-strategy",
          label: "Creative Strategy",
          jobs: [
            {
              id: "econarrate-director",
              title: "Creative Director",
              company: "EcoNarrate",
              period: "APRIL 2024 – PRESENT",
              summary:
                "Co‑founded a startup delivering innovative, sustainable creative solutions; led strategy and secured the first client.",
              achievements: [
                "Co‑founded the startup to deliver sustainable creative solutions.",
                "Played a pivotal role in closing the first client.",
                "Developed branding, digital content, and marketing campaigns.",
              ],
              skills:
                "Creative Strategy, Branding, Digital Content, Marketing Campaigns, Business Development",
            },
          ],
        },
        {
          id: "seo-sales",
          label: "SEO & Sales",
          jobs: [
            {
              id: "wisdek-seo-sales",
              title: "SEO Optimization and Sales Representative",
              company: "Wisdek",
              period: "JANUARY 2017 – DECEMBER 2017",
              summary:
                "Combined sales acumen with SEO expertise to exceed revenue targets and improve clients' online visibility.",
              achievements: [
                "Consistently exceeded revenue targets.",
                "Optimized content/structure for SEO, improving organic traffic.",
                "Negotiated and closed mutually beneficial deals; ensured successful onboarding.",
              ],
              skills:
                "SEO Optimization, Sales, Business Development, Client Relations",
            },
          ],
        },
      ],
    },
  ],
};

// Layout helpers
const degToRad = (d) => (d * Math.PI) / 180;

function computeLayout(data, canvas) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const center = { x: cx, y: cy };

  const actRadius = 360;
  const subRadius = 210;
  const jobRadius = 150;

  // Place acts at 3 angles for clarity
  const actAngles = {
    communication: -20,
    software: 200,
    marketing: 110,
  };

  const nodes = [];
  const links = [];

  // Center
  nodes.push({ id: data.center.id, type: "center", label: data.center.label, x: center.x, y: center.y });

  data.acts.forEach((act) => {
    const a = actAngles[act.id] ?? 0;
    const ax = cx + actRadius * Math.cos(degToRad(a));
    const ay = cy + actRadius * Math.sin(degToRad(a));

    nodes.push({ id: act.id, type: "act", label: act.label, x: ax, y: ay });
    links.push({ from: data.center.id, to: act.id });

    // Sub-branches around act direction
    const offsets = act.subBranches.length === 3 ? [-24, 0, 24] : [-16, 16];

    act.subBranches.forEach((sub, idx) => {
      const sa = a + offsets[idx % offsets.length];
      const sx = ax + subRadius * Math.cos(degToRad(sa));
      const sy = ay + subRadius * Math.sin(degToRad(sa));

      nodes.push({ id: sub.id, type: "sub", label: sub.label, x: sx, y: sy, actId: act.id });
      links.push({ from: act.id, to: sub.id });

      // Jobs radiate from sub
      const jobOffsets = sub.jobs.length === 1 ? [0] : sub.jobs.length === 2 ? [-12, 12] : [-18, 0, 18];
      sub.jobs.forEach((job, jdx) => {
        const ja = sa + jobOffsets[jdx % jobOffsets.length];
        const jx = sx + jobRadius * Math.cos(degToRad(ja));
        const jy = sy + jobRadius * Math.sin(degToRad(ja));
        nodes.push({
          id: job.id,
          type: "job",
          label: job.title,
          x: jx,
          y: jy,
          actId: act.id,
          subId: sub.id,
          payload: job,
        });
        links.push({ from: sub.id, to: job.id });
      });
    });
  });

  return { nodes, links, center };
}

function curvedPath(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const normX = dx / dist;
  const normY = dy / dist;

  const curve = Math.min(120, dist / 3);
  const cx1 = from.x + normX * curve - normY * (curve * 0.35);
  const cy1 = from.y + normY * curve + normX * (curve * 0.35);
  const cx2 = to.x - normX * curve + normY * (curve * 0.35);
  const cy2 = to.y - normY * curve - normX * (curve * 0.35);

  return `M ${from.x},${from.y} C ${cx1},${cy1} ${cx2},${cy2} ${to.x},${to.y}`;
}

function Node({ node, isFocused, onFocus }) {
  const style = {
    left: node.x - 80,
    top: node.y - 20,
    width: 160,
  };

  const labelClass =
    node.type === "center"
      ? "text-white/90 font-semibold text-lg"
      : node.type === "act"
      ? "text-white font-semibold"
      : "text-white/90";

  return (
    <div
      className={`absolute select-none px-3 py-2 rounded-full border border-white/20 bg-[rgba(12,12,12,0.55)] ${
        isFocused ? "shadow-[0_0_0_2px_rgba(255,255,255,0.14)]" : ""
      }`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onFocus?.(node);
      }}
      data-testid={`mindmap-node-${node.id}`}
    >
      <div className={labelClass} style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
        {node.label}
      </div>
    </div>
  );
}

export default function JourneyMindMap() {
  const viewportRef = useRef(null);
  const canvas = { width: 2200, height: 1400 };

  const { nodes, links, center } = useMemo(() => computeLayout(journeyData, canvas), []);
  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  // Pan & zoom state
  const [scale, setScale] = useState(0.95);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [drag, setDrag] = useState({ active: false, sx: 0, sy: 0, stx: 0, sty: 0 });
  const [focus, setFocus] = useState(null);

  // Initialize to center the canvas
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const cxView = rect.width / 2;
    const cyView = rect.height / 2;
    setTx(cxView - scale * center.x);
    setTy(cyView - scale * center.y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel zoom only when Ctrl/Cmd is held so page scroll works normally
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const onWheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) {
        // allow normal page scrolling
        return;
      }
      e.preventDefault();
      const delta = e.deltaY;
      const factor = Math.pow(1.1, -delta / 100);
      const oldScale = scale;
      const newScale = Math.max(0.6, Math.min(1.6, oldScale * factor));
      if (newScale === oldScale) return;

      const rect = vp.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const nx = cx - ((cx - tx) * newScale) / oldScale;
      const ny = cy - ((cy - ty) * newScale) / oldScale;
      setTx(nx);
      setTy(ny);
      setScale(newScale);
    };

    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [scale, tx, ty]);

  // Drag panning
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const onDown = (e) => {
      setDrag({ active: true, sx: e.clientX, sy: e.clientY, stx: tx, sty: ty });
    };
    const onMove = (e) => {
      if (!drag.active) return;
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      setTx(drag.stx + dx);
      setTy(drag.sty + dy);
    };
    const onUp = () => setDrag((d) => ({ ...d, active: false }));

    vp.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      vp.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [drag.active, drag.sx, drag.sy, drag.stx, drag.sty, tx, ty]);

  const focusOn = (node) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const cxView = rect.width / 2;
    const cyView = rect.height / 2;
    const nx = cxView - scale * node.x;
    const ny = cyView - scale * node.y;
    setTx(nx);
    setTy(ny);
    setFocus(node);
  };

  const svgPaths = useMemo(() => {
    return links.map((l, i) => {
      const from = nodeById[l.from];
      const to = nodeById[l.to];
      const d = curvedPath(from, to);
      return (
        <path
          key={`link-${i}`}
          d={d}
          stroke="#ffffff"
          strokeWidth={2}
          fill="none"
          opacity={0.7}
        />
      );
    });
  }, [links, nodeById]);

  return (
    <section className="relative h-[120vh] bg-black" data-testid="journey-mindmap-section">
      <div className="absolute inset-0" ref={viewportRef}>
        <motion.div
          className="origin-top-left"
          animate={{ x: tx, y: ty, scale }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          style={{ width: canvas.width, height: canvas.height }}
          onClick={() => setFocus(null)}
        >
          <svg width={canvas.width} height={canvas.height} className="absolute top-0 left-0" data-testid="mindmap-svg">
            {svgPaths}
          </svg>

          {nodes.map((n) => (
            <Node key={n.id} node={n} isFocused={focus?.id === n.id} onFocus={(node) => focusOn(node)} />
          ))}
        </motion.div>
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">My Journey — Mind Map</h2>
        <p className="text-gray-400 text-sm mt-1">Drag to pan • Hold Ctrl/Cmd + scroll to zoom • Click nodes for details</p>
      </div>

      <AnimatePresence>
        {focus && (
          <motion.aside
            key="panel"
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="hidden xl:block absolute right-6 top-6 bottom-6 w-[360px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-md p-5 overflow-y-auto"
            data-testid="mindmap-detail-panel"
          >
            <div className="text-xs uppercase tracking-wider text-gray-400">Details</div>
            {focus.type === "job" ? (
              <div>
                <div className="mt-2 text-white text-lg font-semibold">{focus.payload.title}</div>
                <div className="text-gray-300">{focus.payload.company}</div>
                <div className="text-gray-500 text-sm">{focus.payload.period}</div>
                <p className="mt-3 text-gray-300 leading-relaxed">{focus.payload.summary}</p>
                <div className="mt-4">
                  <div className="text-gray-400 text-sm font-medium">Key achievements</div>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-200">
                    {focus.payload.achievements.map((a, i) => (
                      <li key={`ach-${i}`}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm text-emerald-300/90">
                  Skills: {focus.payload.skills}
                </div>
              </div>
            ) : focus.type === "sub" ? (
              <div>
                <div className="mt-2 text-white text-lg font-semibold">{focus.label}</div>
                <div className="text-gray-400 text-sm">
                  {focus.actId ? journeyData.acts.find((a) => a.id === focus.actId)?.label : ""}
                </div>
                <div className="mt-3 text-gray-300 text-sm">Jobs in this branch:</div>
                <ul className="mt-2 space-y-1 text-gray-200 text-sm">
                  {journeyData.acts
                    .find((a) => a.id === focus.actId)
                    ?.subBranches.find((s) => s.id === focus.id)
                    ?.jobs.map((j) => (
                      <li key={j.id}>
                        {j.title} — {j.company}
                      </li>
                    ))}
                </ul>
              </div>
            ) : focus.type === "act" ? (
              <div>
                <div className="mt-2 text-white text-lg font-semibold">{focus.label}</div>
                <div className="mt-3 text-gray-300 text-sm">Branches</div>
                <ul className="mt-2 space-y-1 text-gray-200 text-sm">
                  {journeyData.acts
                    .find((a) => a.id === focus.id)
                    ?.subBranches.map((s) => (
                      <li key={s.id}>
                        {s.label} ({s.jobs.length} job{s.jobs.length !== 1 ? "s" : ""})
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className="mt-2 text-white text-lg font-semibold">My Journey</div>
                <div className="mt-2 text-gray-300 text-sm">Click any node to focus. Hold Ctrl/Cmd + scroll to zoom; drag to pan.</div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}