import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Data from user
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

// Node card component (sharp edges, clean text)
function Card({ node, w, h, onClick, isFocused }) {
  const style = {
    left: node.x - w / 2,
    top: node.y - h / 2,
    width: w,
    height: h,
  };
  return (
    <div
      className={`absolute select-none border border-white/25 bg-[rgba(10,10,10,0.7)] shadow-[0_2px_12px_rgba(0,0,0,0.35)] ${
        isFocused ? "outline outline-2 outline-white/30" : ""
      }`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(node);
      }}
      data-testid={`mindmap-node-${node.id}`}
    >
      <div className="h-full w-full p-3 text-left flex items-center">
        <div className={`${node.type === "act" ? "text-white font-semibold" : "text-white/90"} leading-snug`}>{node.label}</div>
      </div>
    </div>
  );
}

function useContainerSize(ref) {
  const [size, setSize] = useState({ width: 1200, height: 600 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    });
    ro.observe(el);
    const rect = el.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function computeHorizontalLayout(data, width, height) {
  const nodes = [];
  const links = [];

  const cx = width / 2;
  const cy = Math.max(280, height * 0.55);

  const spineLeft = Math.max(40, width * 0.08);
  const spineRight = width - Math.max(40, width * 0.08);

  // Spine (one straight horizontal line)
  links.push({ type: "spine", x1: spineLeft, y1: cy, x2: spineRight, y2: cy });

  // Place Acts evenly on the spine
  const actXs = [0.2, 0.5, 0.8].map((p) => spineLeft + (spineRight - spineLeft) * p);
  const actW = 220;
  const actH = 44;
  const subW = 200;
  const subH = 40;
  const jobW = 260;
  const jobH = 56;

  // optional center node (left of first act)
  const centerX = spineLeft - 120;
  nodes.push({ id: data.center.id, type: "center", label: data.center.label, x: centerX, y: cy, w: 180, h: 44 });
  links.push({ type: "stub", x1: centerX + 90, y1: cy, x2: spineLeft, y2: cy });

  data.acts.forEach((act, i) => {
    const ax = actXs[i] ?? cx;
    const ay = cy;
    const actNode = { id: act.id, type: "act", label: act.label, x: ax, y: ay, w: actW, h: actH };
    nodes.push(actNode);

    // vertical tap from spine to act (tiny, for clarity)
    links.push({ type: "stub", x1: ax, y1: cy - 16, x2: ax, y2: cy + 16 });

    // sub-branches positions above/below
    const yGap = 100;
    const xGap = 180; // horizontal distance from act to sub

    const subCount = act.subBranches.length;
    const subYs = subCount === 3 ? [ay - yGap, ay, ay + yGap] : [ay - yGap, ay + yGap];

    act.subBranches.forEach((sub, idx) => {
      const sx = ax + xGap;
      const sy = subYs[idx % subYs.length];
      const subNode = { id: sub.id, type: "sub", label: sub.label, x: sx, y: sy, w: subW, h: subH, actId: act.id };
      nodes.push(subNode);

      // connectors: vertical from act.x to sub.y, then horizontal to sub.x
      links.push({ type: "vertical", x1: ax, y1: ay, x2: ax, y2: sy });
      links.push({ type: "horizontal", x1: ax, y1: sy, x2: sx - subW / 2, y2: sy });

      // jobs (one per sub currently)
      const jobX = sx + xGap + jobW / 2;
      sub.jobs.forEach((job) => {
        const jx = jobX;
        const jy = sy;
        const jobNode = {
          id: job.id,
          type: "job",
          label: job.title,
          x: jx,
          y: jy,
          w: jobW,
          h: jobH,
          actId: act.id,
          subId: sub.id,
          payload: job,
        };
        nodes.push(jobNode);
        // straight horizontal connector from sub to job
        links.push({ type: "horizontal", x1: sx + subW / 2, y1: sy, x2: jx - jobW / 2, y2: sy });
      });
    });
  });

  return { nodes, links, size: { width, height }, cy, spineLeft, spineRight };
}

export default function JourneyMindMap() {
  const containerRef = useRef(null);
  const { width, height } = useContainerSize(containerRef);

  const layout = useMemo(() => computeHorizontalLayout(journeyData, width, Math.max(height, 600)), [width, height]);
  const [focus, setFocus] = useState(null);

  return (
    <section className="relative min-h-[100vh] bg-black" data-testid="journey-mindmap-section">
      <div ref={containerRef} className="relative container mx-auto px-6 py-24">
        {/* SVG connectors */}
        <svg className="absolute inset-0 w-full h-full" data-testid="mindmap-svg">
          {/* Spine and connectors */}
          {layout.links.map((l, i) => (
            <line
              key={`l-${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.75}
            />
          ))}
        </svg>

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">My Journey — Mind Map</h2>
          <p className="text-gray-400 text-sm mt-1">Straight, structured, and readable. Click a node for details.</p>
        </div>

        {/* Nodes */}
        <div className="relative" style={{ height: Math.max(layout.size.height, 600) }} onClick={() => setFocus(null)}>
          {layout.nodes.map((n) => (
            <Card key={n.id} node={n} w={n.w} h={n.h} onClick={(node) => setFocus(node)} isFocused={focus?.id === n.id} />
          ))}
        </div>
      </div>

      {/* Details panel */}
      <AnimatePresence>
        {focus && (
          <motion.aside
            key="panel"
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="hidden xl:block absolute right-6 top-6 bottom-6 w-[360px] rounded-none border border-white/10 bg-black/80 backdrop-blur-md p-5 overflow-y-auto"
            data-testid="mindmap-detail-panel"
          >
            {focus.type === "job" ? (
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400">Role</div>
                <div className="mt-1 text-white text-lg font-semibold">{focus.payload.title}</div>
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
                <div className="mt-4 text-sm text-gray-300">Skills: {focus.payload.skills}</div>
              </div>
            ) : focus.type === "sub" ? (
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400">Branch</div>
                <div className="mt-1 text-white text-lg font-semibold">{focus.label}</div>
                <div className="mt-2 text-gray-300 text-sm">Jobs in this branch:</div>
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
                <div className="text-xs uppercase tracking-wider text-gray-400">Act</div>
                <div className="mt-1 text-white text-lg font-semibold">{focus.label}</div>
                <div className="mt-2 text-gray-300 text-sm">Branches</div>
                <ul className="mt-2 space-y-1 text-gray-200 text-sm">
                  {journeyData.acts
                    .find((a) => a.id === focus.id)
                    ?.subBranches.map((s) => (
                      <li key={s.id}>
                        {s.label}
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400">Overview</div>
                <div className="mt-1 text-white text-lg font-semibold">My Journey</div>
                <p className="mt-2 text-gray-300 text-sm">Click any node to focus.</p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}