import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import { Lightbulb, Cpu, LineChart, GraduationCap, Briefcase, Wrench, Rocket, Shield, X } from "lucide-react";

// Expanded roles for a larger cohesive journey
const items = [
  { title: "Creative Director | EcoNarrate", period: "APRIL 2024 – PRESENT", icon: Lightbulb },
  { title: "Information Technology Head Officer | Ammosshipping", period: "FEBRUARY 2019 – AUGUST 2023", icon: Cpu },
  { title: "SEO Optimization and Sales Representative | Wisdek", period: "JANUARY 2017 – DECEMBER 2017", icon: LineChart },
  { title: "Subject Matter Expert | Altice One", period: "2015 – 2016", icon: GraduationCap },
  { title: "Business Consultant | Ghasa Marine", period: "MAY 2023 – DECEMBER 2023", icon: Briefcase },
  { title: "Operations Lead | [Add Company]", period: "[Add Period]", icon: Wrench },
  { title: "Product Strategist | [Add Company]", period: "[Add Period]", icon: Rocket },
  { title: "Security/Compliance Advisor | [Add Company]", period: "[Add Period]", icon: Shield },
];

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Softer snap per row of 3 using eased lerp
  const groupCount = Math.ceil(items.length / 3);
  const [groupIndex, setGroupIndex] = useState(0); // float for smoothing
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Track precise mouse position to resolve stuck hover
  const cardRefs = useRef([]);
  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current) return;
      const idx = cardRefs.current.findIndex((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      });
      if (idx !== -1) setHoveredIndex(idx);
      else setHoveredIndex(null);
    };
    const onLeave = () => setHoveredIndex(null);
    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const target = Math.round(p * (groupCount - 1)); // intended group
      setGroupIndex((prev) => {
        const delta = target - prev;
        return Math.max(0, Math.min(groupCount - 1, prev + delta * 0.25));
      });
    });
    return () => unsub && unsub();
  }, [scrollYProgress, groupCount]);

  const Card = ({ i, title, period, Icon }) => {
    const cardGroup = Math.floor(i / 3);
    const dist = Math.abs(cardGroup - groupIndex);

    // Depth tiers based on distance to current focus group (increase background blur)
    let z = -200, scale = 0.82, blur = 6.5, alpha = 0.4; // stronger background blur and smaller size
    if (dist < 0.33) { // main trio (focused)
      z = 180; scale = 0.96; blur = 0; alpha = 1;
    } else if (dist < 1.1) { // neighboring trio (medium)
      z = 60; scale = 0.9; blur = 2.2; alpha = 0.7;
    }

    const isHovered = hoveredIndex === i;
    if (isHovered) { z = 260; scale = 1.0; blur = 0; alpha = 1; }

    const rotate = i % 2 === 0 ? "rotateY(-10deg)" : "rotateY(10deg)";

    return (
      <div
        ref={(el) => (cardRefs.current[i] = el)}
        className={`relative w-full md:w-[58%] ${i % 2 === 0 ? "md:mr-10 md:self-end" : "md:ml-10 md:self-start"}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(${z}px) scale(${scale}) ${rotate}`,
          transition: "transform 420ms cubic-bezier(0.2,0.7,0,1), filter 280ms ease, opacity 280ms ease, box-shadow 280ms ease",
          filter: blur ? `blur(${blur}px)` : "none",
          opacity: alpha,
          boxShadow: isHovered ? "0 18px 60px rgba(20,184,166,0.15)" : "none",
          willChange: "transform, filter, opacity",
        }}
        data-testid={`journey-card-${i}`}
      >
        {/* Connector from center line to card */}
        <div
          className={`hidden md:block absolute top-1/2 ${i % 2 === 0 ? "right-full" : "left-full"} w-10 h-0.5 -translate-y-1/2`}
          style={{
            background: "linear-gradient(90deg, rgba(20,184,166,0.0), rgba(20,184,166,0.7))",
            transform: i % 2 === 0 ? "translateY(-50%)" : "translateY(-50%) rotate(180deg)",
          }}
          aria-hidden
        />
        {/* Connector dot near the center line */}
        <div
          className={`hidden md:block absolute top-1/2 ${i % 2 === 0 ? "-right-2" : "-left-2"} w-3 h-3 rounded-full`}
          style={{
            background: "radial-gradient(circle, #34d399 0%, #10b981 60%, rgba(16,185,129,0.2) 100%)",
            boxShadow: "0 0 10px rgba(16,185,129,0.6)",
            transform: "translateY(-50%)",
          }}
          aria-hidden
        />

        {/* Softer, smaller, rounder card */}
        <div
          className="rounded-3xl p-5 border cursor-pointer min-h-[96px]"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div className="flex items-center gap-3">
            {Icon ? <Icon className="w-5 h-5 text-teal-400" /> : null}
            <h3 className="text-white text-base md:text-lg font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{title}</h3>
          </div>
          <p className="text-gray-300 mt-1 text-sm md:text-base" style={{ fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>{period}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="story" className="relative py-24" data-testid="section-journey">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>My Journey</h2>
          <p
            className="mt-5 max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}
            data-testid="journey-intro-text"
          >
            My career has been a deliberate journey of three connected acts: understanding people, building technology, and driving strategic growth. Each role, from customer support to the founding of a creative startup, has been a step towards a single goal: using technology to create measurable business impact.
          </p>
        </div>

        {/* Depth container with perspective for 3D concave effect */}
        <div ref={containerRef} className="relative flex flex-col items-center" style={{ perspective: "1600px" }}>
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" aria-hidden>
            <div className="w-px h-full bg-gradient-to-b from-emerald-400 via-amber-300 to-blue-400 opacity-70" />
          </div>

          <div className="grid grid-cols-1 gap-6 w-full max-w-6xl">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Card key={i} i={i} title={it.title} period={it.period} Icon={Icon} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Right overlay panel for job description (not interfering with hover detection) */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.aside
            key="journey-overlay"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-20 right-6 bottom-6 w-[520px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] z-50 overflow-auto pointer-events-auto"
            data-testid="journey-overlay-panel"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white text-xl font-semibold">{items[hoveredIndex].title}</h4>
                  <p className="text-gray-400" style={{ fontFamily: "'Roboto Mono', ui-monospace" }}>{items[hoveredIndex].period}</p>
                </div>
                <button aria-label="close" className="text-gray-400 hover:text-white" onClick={() => setHoveredIndex(null)}>
                  <X size={20} />
                </button>
              </div>
              <div>
                <h5 className="text-white font-semibold">Job Description</h5>
                <p className="text-gray-300 mt-1">Placeholder description for the role; replace with detailed responsibilities and scope.</p>
              </div>
              <div>
                <h5 className="text-white font-semibold">Key Achievement</h5>
                <p className="text-gray-300 mt-1">Placeholder achievement highlighting measurable business outcomes.</p>
              </div>
              <div>
                <h5 className="text-white font-semibold">Skills Learnt</h5>
                <ul className="text-gray-300 list-disc pl-5 mt-1 space-y-1">
                  <li>Placeholder skill 1</li>
                  <li>Placeholder skill 2</li>
                  <li>Placeholder skill 3</li>
                </ul>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyTimeline;