import React from "react";
import { motion } from "framer-motion";

const cases = [
  {
    role: "Creative Director",
    company: "EcoNarrate",
    impact:
      "Co-founded a startup and played a pivotal role in securing the company’s first client, proving our ability to build trust and deliver value.",
  },
  {
    role: "Information Technology Head Officer",
    company: "Ammosshipping",
    impact:
      "Mitigated software vulnerabilities and designed an interactive Admin Dashboard for real-time performance monitoring.",
  },
  {
    role: "SEO Optimization and Sales Representative",
    company: "Wisdek",
    impact:
      "Consistently exceeded revenue targets and improved organic traffic by optimizing website content and structure for search engines.",
  },
  {
    role: "Subject Matter Expert",
    company: "Altice One",
    impact:
      "Resolved complex customer escalations and trained managers on technical knowledge, successfully retaining key accounts.",
  },
];

const TiltCard = ({ item, index }) => {
  const [style, setStyle] = React.useState({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });
  const cardRef = React.useRef(null);

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-py * 6).toFixed(2);
    const rotateY = (px * 6).toFixed(2);
    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)` });
  };
  const onLeave = () => setStyle({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative rounded-2xl p-6 border transition-transform will-change-transform"
      style={{
        ...style,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.18)",
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.03 }}
      data-testid={`case-card-${index}`}
    >
      <div>
        <p className="text-sm text-gray-300" style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}>Role</p>
        <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>{item.role}</h3>
        <p className="text-sm text-gray-300 mt-3" style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}>Company</p>
        <p className="text-white/90">{item.company}</p>
        <p className="text-gray-200 mt-4">{item.impact}</p>
      </div>

      {/* Hover button */}
      <motion.button
        className="absolute bottom-4 right-4 px-4 py-2 rounded-md border text-white/90"
        style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.25)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        data-testid={`case-card-${index}-cta`}
      >
        View Details
      </motion.button>
    </motion.div>
  );
};

const CaseStudies = () => {
  return (
    <section id="portfolio" className="py-24" data-testid="section-case-studies">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Case Studies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <TiltCard key={i} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;