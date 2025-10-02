import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Global fixed background layers component
// - Digital Aurora image (subtle, animated) that cross-fades in after hero
// - Structural Grid transparent overlay at very low opacity
// - Non-interactive, fixed positioning behind the app content
const GlobalBackground = () => {
  const [auroraVisible, setAuroraVisible] = useState(0); // 0 -> 1 opacity

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const threshold = window.innerHeight * 0.7; // after ~70% of hero
      const next = Math.max(0, Math.min(1, (y - threshold) / 200));
      setAuroraVisible(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none">
      {/* Digital Aurora: subtle movement */}
      <div
        data-testid="bg-aurora"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "url('https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/dv053h62_Google_AI_Studio_2025-10-02T10_13_41.143Z.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: auroraVisible,
          transition: "opacity 1.5s ease-out",
          filter: "saturate(90%) brightness(95%)",
          animation: "aurora-pan 30s ease-in-out infinite alternate",
        }}
      />

      {/* Structural Grid overlay (5-10% opacity) */}
      <div
        data-testid="bg-grid-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          backgroundImage:
            "url('https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/x63saugg_Google_AI_Studio_2025-10-02T10_15_48.273Z.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      {/* Small CSS keyframes for subtle aurora movement */}
      <style>{`
        @keyframes aurora-pan {
          0% { background-position: 50% 50%; transform: scale(1.02); }
          100% { background-position: 55% 48%; transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default GlobalBackground;