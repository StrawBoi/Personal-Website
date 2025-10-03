import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Cpu, LineChart, GraduationCap } from "lucide-react";

// Four key roles for the refined vertical timeline
const items = [
  { title: "Creative Director | EcoNarrate", period: "APRIL 2024 – PRESENT", icon: Lightbulb },
  { title: "Information Technology Head Officer | Ammosshipping", period: "FEBRUARY 2019 – AUGUST 2023", icon: Cpu },
  { title: "SEO Optimization and Sales Representative | Wisdek", period: "JANUARY 2017 – DECEMBER 2017", icon: LineChart },
  { title: "Subject Matter Expert | Altice One", period: "2015 – 2016", icon: GraduationCap },
];

const Card = ({ i, title, period, progress, onHover, onLeave, Icon }) => {
  // Reveal the card as the line "reaches" its position
  const triggerPoint = (i + 1) / (items.length + 0.5);
  const opacity = useTransform(progress, [triggerPoint - 0.12, triggerPoint], [0, 1]);
  const y = useTransform(progress, [triggerPoint - 0.12, triggerPoint], [30, 0]);
  const x = useTransform(progress, [triggerPoint - 0.12, triggerPoint], [i % 2 === 0 ? -36 : 36, 0]);
  const isLeft = i % 2 === 0; // left side cards

  return (
    <motion.div
      className={`relative w-full md:w-[58%] ${isLeft ? "md:mr-12 md:self-end" : "md:ml-12 md:self-start"}`}
      style={{ opacity, y, x }}
      onMouseEnter={() => onHover(i)}
      onMouseLeave={onLeave}
      data-testid={`journey-card-${i}`}
    >
      {/* Connector from center line to card */}
      <div
        className={`hidden md:block absolute top-1/2 ${isLeft ? "right-full" : "left-full"} w-10 h-0.5 -translate-y-1/2`}
        style={{
          background: "linear-gradient(90deg, rgba(20,184,166,0.0), rgba(20,184,166,0.7))",
          transform: isLeft ? "translateY(-50%)" : "translateY(-50%) rotate(180deg)",
        }}
        aria-hidden
      />
      {/* Connector dot near the center line */}
      <div
        className={`hidden md:block absolute top-1/2 ${isLeft ? "-right-2" : "-left-2"} w-3 h-3 rounded-full`}
        style={{
          background: "radial-gradient(circle, #34d399 0%, #10b981 60%, rgba(16,185,129,0.2) 100%)",
          boxShadow: "0 0 10px rgba(16,185,129,0.6)",
          transform: "translateY(-50%)",
        }}
        aria-hidden
      />

      {/* Glassmorphism card (larger) */}
      <div
        className="rounded-2xl p-7 border"
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
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

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

        <div ref={containerRef} className="relative flex flex-col items-center">
          {/* Center vertical line that draws with scroll */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" aria-hidden>
            <motion.div
              className="w-px h-full bg-gradient-to-b from-emerald-400 via-amber-300 to-blue-400"
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              data-testid="journey-line"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 w-full max-w-6xl">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Card
                  key={i}
                  i={i}
                  title={it.title}
                  period={it.period}
                  progress={scrollYProgress}
                  onHover={setHoveredIndex}
                  onLeave={() => setHoveredIndex(null)}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover-to-reveal Side Panel */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.aside
            key="journey-sidepanel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-16 right-0 bottom-0 w-full md:w-[520px] bg-black/95 border-l border-white/10 z-50 overflow-auto"
            data-testid="journey-hover-panel"
          >
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{items[hoveredIndex].title}</h3>
                <p className="text-gray-400 mt-1" style={{ fontFamily: "'Roboto Mono', ui-monospace" }}>{items[hoveredIndex].period}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Job Description</h4>
                <p className="text-gray-300 mt-2">Placeholder description for the role detailing responsibilities and core areas of ownership. We will populate this with the finalized copy.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Key Achievement</h4>
                <p className="text-gray-300 mt-2">Placeholder narrative highlighting a notable outcome, impact, or business value delivered during this role.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Skills Learnt</h4>
                <ul className="text-gray-300 list-disc pl-5 mt-2 space-y-1">
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