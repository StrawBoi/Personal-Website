import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const COLORS = { blue: "#00BFFF", green: "#34d399", amber: "#f59e0b" };

const CARDS = [
  { id: "act1", titleTop: "Crafting", titleBottom: "Connection", color: COLORS.blue, lines: ["Communications", "Customer empathy"] },
  { id: "act2", titleTop: "Software", titleBottom: "Development", color: COLORS.green, lines: ["Full‑stack delivery", "Cloud & ITSM"] },
  { id: "act3", titleTop: "Business &", titleBottom: "Marketing", color: COLORS.amber, lines: ["Brand & growth", "Client development"] },
];

function gaussianFocus(progress, center, width) {
  // shaped focus 0..1 — smooth bell curve; width ~ influence span
  const d = Math.abs(progress - center);
  const x = Math.max(0, 1 - d / width);
  // ease a bit for nicer feel
  return Math.pow(x, 1.6);
}

export default function JourneyGatewaysScroll() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // convert progress -> scalar for calculations
  const prog = useTransform(scrollYProgress, (v) => Math.max(0, Math.min(1, v)));
  const progSpring = useSpring(prog, { stiffness: 120, damping: 24, mass: 0.7 });

  // centers of focus for the three cards along the scroll
  const centers = [0.12, 0.5, 0.88];
  const width = 0.28; // how broad each focus window is

  // derive focus values for each card
  const foci = centers.map((c) => useTransform(progSpring, (v) => gaussianFocus(v, c, width)));

  // sizes & layout
  const baseW = useTransform(foci[1], [0, 1], [0.92, 1]); // slight emphasis middle when active

  return (
    <section ref={sectionRef} className="relative bg-black" data-testid="journey-gateways-scroll">
      <div style={{ height: "190vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* atmosphere background (optional image), plus subtle gradient vignette */}
          <div className="absolute inset-0 -z-10" style={{ backgroundImage: `url('/journey-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">My Journey</h2>
            <p className="text-gray-400 text-sm mt-1">Scroll — the portals wake up in sequence</p>
          </div>

          {/* Portals row */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[1200px] flex items-end justify-center gap-[6vw] px-6">
            {CARDS.map((c, i) => {
              const focus = foci[i];
              const scale = useTransform(focus, [0, 1], [0.92, 1.08]);
              const opacity = useTransform(focus, [0, 1], [0.6, 1]);
              const lift = useTransform(focus, [0, 1], [28, 0]);
              const glowAlpha = useTransform(focus, [0, 1], [0.35, 0.9]);

              return (
                <motion.div key={c.id} style={{ scale, opacity, y: lift, willChange: "transform, opacity" }} className="relative">
                  {/* portal card */}
                  <div
                    className="relative rounded-[28px] border bg-[rgba(10,10,12,0.55)]"
                    style={{
                      width: "clamp(260px, 28vw, 360px)",
                      height: "clamp(380px, 56vh, 520px)",
                      borderColor: `${c.color}AA`,
                      boxShadow: `0 0 30px ${c.color}55, inset 0 0 26px ${c.color}22`,
                      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    {/* neon accents */}
                    <motion.span className="pointer-events-none absolute inset-[3px] rounded-[26px] block" style={{ boxShadow: `0 -16px 40px ${c.color}66, 0 12px 46px ${c.color}44`, opacity: glowAlpha }} />

                    {/* text */}
                    <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
                      <div>
                        <div className="text-white text-[28px] font-semibold tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{c.titleTop}<br />{c.titleBottom}</div>
                        <div className="text-gray-300 text-sm mt-4 space-y-1">
                          {c.lines.map((l, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * idx }}>
                              {l}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* reflection */}
                    <motion.div
                      className="absolute left-0 right-0 -bottom-[110px] h-[100px] rounded-[28px]"
                      style={{
                        background: "rgba(8,8,10,0.5)",
                        filter: `blur(16px) drop-shadow(0 0 24px ${c.color}88)`,
                        opacity: glowAlpha,
                        transform: "scaleY(-1)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}