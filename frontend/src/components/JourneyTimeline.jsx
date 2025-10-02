import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  {
    title: "Creative Director | EcoNarrate",
    period: "APRIL 2024 – PRESENT",
  },
  {
    title: "Business Consultant | Ghasa Marine",
    period: "MAY 2023 – DECEMBER 2023",
  },
  {
    title: "Information Technology Head Officer | Ammosshipping",
    period: "FEBRUARY 2019 – AUGUST 2023",
  },
  {
    title: "SEO Optimization and Sales Representative | Wisdek",
    period: "JANUARY 2017 – DECEMBER 2017",
  },
];

const Card = ({ i, title, period, progress }) => {
  // Reveal each card when the drawing line reaches its relative position
  const triggerPoint = (i + 1) / (items.length + 0.5);
  const opacity = useTransform(progress, [triggerPoint - 0.1, triggerPoint], [0, 1]);
  const y = useTransform(progress, [triggerPoint - 0.1, triggerPoint], [30, 0]);

  const side = i % 2 === 0 ? "md:mr-12 md:self-end" : "md:ml-12 md:self-start";

  return (
    <motion.div
      className={`relative w-full md:w-[46%] ${side}`}
      style={{ opacity, y }}
      data-testid={`journey-card-${i}`}
    >
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <h3 className="text-white text-lg font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{title}</h3>
        <p className="text-gray-300 mt-1" style={{ fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}>{period}</p>
      </div>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="relative py-24 bg-slate-900/50" data-testid="section-journey">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>My Journey</h2>
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

          <div className="grid grid-cols-1 gap-10 w-full max-w-5xl">
            {items.map((it, i) => (
              <Card key={i} i={i} title={it.title} period={it.period} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;