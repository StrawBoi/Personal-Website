import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const COLORS = { blue: "#00BFFF", green: "#34d399", amber: "#f59e0b" };

const CARDS = [
  { id: "act1", titleTop: "Crafting", titleBottom: "Connection", color: COLORS.blue, lines: ["Communications", "Customer empathy"] },
  { id: "act2", titleTop: "Software", titleBottom: "Development", color: COLORS.green, lines: ["Full‑stack delivery", "Cloud & ITSM"] },
  { id: "act3", titleTop: "Business &", titleBottom: "Marketing", color: COLORS.amber, lines: ["Brand & growth", "Client development"] },
];

function gaussianFocus(progress, center, width) {
  const d = Math.abs(progress - center);
  const x = Math.max(0, 1 - d / width);
  return Math.pow(x, 1.6);
}

function Particles({ count = 36 }) {
  const dots = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 2,
    delay: Math.random() * 4,
    dur: 6 + Math.random() * 6,
    hue: 180 + Math.random() * 120,
  })), [count]);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, background: `hsla(${d.hue}, 90%, 60%, 0.8)`, filter: `blur(0.5px) drop-shadow(0 0 6px hsla(${d.hue},90%,60%,0.9))` }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [-10, 10, -10], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function JourneyGatewaysScroll() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const prog = useTransform(scrollYProgress, (v) => Math.max(0, Math.min(1, v)));
  const progSpring = useSpring(prog, { stiffness: 120, damping: 24, mass: 0.7 });

  const centers = [0.12, 0.5, 0.88];
  const width = 0.28;
  const foci = centers.map((c) => useTransform(progSpring, (v) => gaussianFocus(v, c, width)));

  return (
    <section ref={sectionRef} className="relative bg-black" data-testid="journey-gateways-scroll">
      <div style={{ height: "190vh", position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* background image emphasized */}
          <div className="absolute inset-0 -z-20" style={{ backgroundImage: `url('/atmos-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

          {/* particles layer */}
          <Particles />

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
              const glowAlpha = useTransform(focus, [0, 1], [0.5, 1]);

              return (
                <motion.div key={c.id} style={{ scale, opacity, y: lift, willChange: "transform, opacity" }} className="relative">
                  {/* portal card */}
                  <div
                    className="relative rounded-[28px] border bg-[rgba(10,10,12,0.55)]"
                    style={{
                      width: "clamp(260px, 28vw, 360px)",
                      height: "clamp(380px, 56vh, 520px)",
                      borderColor: `${c.color}`,
                      boxShadow: `0 0 0 2px ${c.color}AA, 0 0 36px ${c.color}AA, 0 0 72px ${c.color}66, inset 0 0 32px ${c.color}33`,
                      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    {/* crisp neon edge highlight */}
                    <motion.span className="pointer-events-none absolute inset-[2px] rounded-[26px] block"
                      style={{ boxShadow: `0 -18px 48px ${c.color}, 0 14px 56px ${c.color}AA`, opacity: glowAlpha }} />

                    {/* content */}
                    <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-8">
                      <div>
                        <div className="text-white text-[28px] font-semibold tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{c.titleTop}<br />{c.titleBottom}</div>
                        <div className="text-gray-200 text-sm mt-4 space-y-1">
                          {c.lines.map((l, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * idx }}>
                              {l}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* intensified reflection */}
                    <motion.div
                      className="absolute left-0 right-0 -bottom-[110px] h-[110px] rounded-[28px]"
                      style={{
                        background: "rgba(10,10,12,0.7)",
                        filter: `blur(18px) drop-shadow(0 0 32px ${c.color}BB)`,
                        opacity: glowAlpha,
                        transform: "scaleY(-1)",
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
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