import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const COLORS = { blue: "#00BFFF", green: "#34d399", amber: "#f59e0b" };

const CARDS = [
  { id: "act1", titleTop: "Crafting", titleBottom: "Connection", color: COLORS.blue, sub: ["Communications", "Customer empathy"], },
  { id: "act2", titleTop: "Software", titleBottom: "Development", color: COLORS.green, sub: ["Full‑stack delivery", "Cloud & ITSM"], },
  { id: "act3", titleTop: "Business &", titleBottom: "Marketing", color: COLORS.amber, sub: ["Brand & growth", "Client development"], },
];

function useCardFocus(scrollYProgress, start, end) {
  // raw progress 0..1 within [start,end]
  const raw = useTransform(scrollYProgress, [start, end], [0, 1]);
  const eased = useSpring(raw, { stiffness: 120, damping: 22, mass: 0.7 });
  // clamp via transform to avoid overshoots
  const focus = useTransform(eased, (v) => Math.max(0, Math.min(1, v)));
  return focus;
}

function PortalCard({ color, titleTop, titleBottom, focus }) {
  const scale = useTransform(focus, [0, 1], [0.95, 1.08]);
  const opacity = useTransform(focus, [0, 1], [0.65, 1]);
  const lift = useTransform(focus, [0, 1], [18, 0]);
  const glow = useTransform(focus, [0, 1], [0.45, 1]);

  return (
    <motion.div
      className="relative w-[min(360px,28vw)] h-[520px] rounded-[28px] border bg-[rgba(8,8,10,0.55)]"
      style={{
        borderColor: `${color}AA`,
        boxShadow: `0 0 26px ${color}55, inset 0 0 24px ${color}22`,
        scale, opacity, y: lift,
        willChange: "transform, opacity",
      }}
    >
      {/* neon corners accent */}
      <div className="pointer-events-none absolute inset-[3px] rounded-[26px]" style={{ boxShadow: `0 -14px 38px ${color}66, 0 10px 46px ${color}44` }} />

      {/* content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
        <div>
          <div className="text-white text-[28px] font-semibold tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{titleTop}<br />{titleBottom}</div>
          <div className="text-gray-400 text-sm mt-4 space-y-1">
            {CARDS[0].titleTop === titleTop ? (
              <>
                <div>Communications</div>
                <div>Customer empathy</div>
              </>
            ) : CARDS[1].titleTop === titleTop ? (
              <>
                <div>Full‑stack delivery</div>
                <div>Cloud &amp; ITSM</div>
              </>
            ) : (
              <>
                <div>Brand &amp; growth</div>
                <div>Client development</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* reflection */}
      <motion.div
        className="absolute left-0 right-0 -bottom-[100px] h-[100px] rounded-[28px]"
        style={{
          background: "rgba(8,8,10,0.5)",
          filter: `blur(16px) drop-shadow(0 0 24px ${color}88)`,
          opacity: glow,
          transform: "scaleY(-1)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        }}
      />
    </motion.div>
  );
}

export default function JourneyGatewaysScroll() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Three phases across 180vh-200vh scroll
  const f1 = useCardFocus(scrollYProgress, 0.0, 0.33);
  const f2 = useCardFocus(scrollYProgress, 0.33, 0.66);
  const f3 = useCardFocus(scrollYProgress, 0.66, 1.0);

  const xParallax = [
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    useTransform(scrollYProgress, [0, 1], [0, 20]),
  ];

  const focuses = [f1, f2, f3];

  return (
    <section ref={sectionRef} className="relative bg-black" data-testid="journey-gateways-scroll">
      <div style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* atmosphere image (optional) */}
          <div className="absolute inset-0 -z-10" style={{
            backgroundImage: `url('/journey-bg.jpg')`,
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.16,
          }} />

          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">My Journey</h2>
            <p className="text-gray-400 text-sm mt-1">Scroll — the portals wake up in sequence</p>
          </div>

          {/* Row of portals */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full flex items-center justify-center gap-[6vw] px-6">
            {CARDS.map((c, i) => (
              <motion.div key={c.id} style={{ x: xParallax[i] }}>
                <PortalCard color={c.color} titleTop={c.titleTop} titleBottom={c.titleBottom} focus={focuses[i]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}