import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion";
import { Lightbulb, Cpu, LineChart, GraduationCap, Briefcase, Wrench, Rocket, Shield } from "lucide-react";

// Expanded roles for a larger cohesive journey
const items = [
  { title: "Creative Director | EcoNarrate", period: "APRIL 2024 – PRESENT", icon: Lightbulb },
  { title: "Information Technology Head Officer | Ammosshipping", period: "FEBRUARY 2019 – AUGUST 2023", icon: Cpu },
  { title: "SEO Optimization and Sales Representative | Wisdek", period: "JANUARY 2017 – DECEMBER 2017", icon: LineChart },
  { title: "Subject Matter Expert | Altice One", period: "2015 – 2016", icon: GraduationCap },
  // Added experiences (update content later as needed)
  { title: "Business Consultant | Ghasa Marine", period: "MAY 2023 – DECEMBER 2023", icon: Briefcase },
  { title: "Operations Lead | [Add Company]", period: "[Add Period]", icon: Wrench },
  { title: "Product Strategist | [Add Company]", period: "[Add Period]", icon: Rocket },
  { title: "Security/Compliance Advisor | [Add Company]", period: "[Add Period]", icon: Shield },
];

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Hard snap per row of 3
  const groupCount = Math.ceil(items.length / 3);
  const [groupIndex, setGroupIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const snapped = Math.round(p * (groupCount - 1));
      setGroupIndex(Math.max(0, Math.min(groupCount - 1, snapped)));
    });
    return () => unsub && unsub();
  }, [scrollYProgress, groupCount]);

  const Card = ({ i, title, period, Icon }) => {
    const start = groupIndex * 3;
    const end = start + 2;
    const inFocusedGroup = i >= start && i <= end;
    const isHovered = hoveredIndex === i;

    // Stronger concave: foreground pops, background recedes
    const depthTransform = isHovered
      ? "translateZ(300px) scale(1.04)"
      : inFocusedGroup
      ? "translateZ(200px) scale(1.0)"
      : "translateZ(-160px) scale(0.86)";

    const rotate = i % 2 === 0 ? "rotateY(-11deg)" : "rotateY(11deg)";

    return (
      <div
        className={`relative w-full md:w-[66%] ${i % 2 === 0 ? "md:mr-16 md:self-end" : "md:ml-16 md:self-start"}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `${depthTransform} ${rotate}`,
          transition: "transform 420ms cubic-bezier(0.2,0.7,0,1), filter 280ms ease, opacity 280ms ease, box-shadow 280ms ease",
          filter: isHovered ? "none" : inFocusedGroup ? "none" : "blur(3.2px)",
          opacity: isHovered ? 1 : inFocusedGroup ? 1 : 0.48,
          boxShadow: isHovered ? "0 22px 70px rgba(20,184,166,0.16)" : "none",
          willChange: "transform, filter, opacity",
        }}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
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

        {/* Glassmorphism card */}
        <div
          className="rounded-2xl p-7 border cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div className="flex items-center gap-3">
            {Icon ? <Icon className="w-6 h-6 text-teal-400" /> : null}
            <h3 className="text-white text-xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{title}</h3>
          </div>
          <p className="text-gray-300 mt-2" style={{ fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>{period}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="story" className="relative py-28" data-testid="section-journey">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>My Journey</h2>
          <p
            className="mt-5 max-w-3xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}
            data-testid="journey-intro-text"
          >
            My career has been a deliberate journey of three connected acts: understanding people, building technology, and driving strategic growth. Each role, from customer support to the founding of a creative startup, has been a step towards a single goal: using technology to create measurable business impact.
          </p>
        </div>

        {/* Depth container with stronger 3D concave effect */}
        <div ref={containerRef} className="relative flex flex-col items-center" style={{ perspective: "1600px" }}>
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" aria-hidden>
            <div className="w-px h-full bg-gradient-to-b from-emerald-400 via-amber-300 to-blue-400 opacity-70" />
          </div>

          <div className="grid grid-cols-1 gap-12 w-full max-w-6xl">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Card key={i} i={i} title={it.title} period={it.period} Icon={Icon} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;