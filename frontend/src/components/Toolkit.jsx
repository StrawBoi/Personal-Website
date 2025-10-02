import React from "react";

const items = [
  { title: "Sales & Business Development" },
  { title: "Digital Marketing & SEO Optimization" },
  { title: "Web Development (Wix, WordPress, React)" },
  { title: "Customer Service & Customer Retention" },
  { title: "Team Leadership & Training" },
  { title: "Customer Experience" },
];

const TiltCard = ({ text, index }) => {
  const ref = React.useRef(null);
  const [style, setStyle] = React.useState({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-py * 6).toFixed(2);
    const rotateY = (px * 6).toFixed(2);
    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)` });
  };
  const onLeave = () => setStyle({ transform: "rotateX(0deg) rotateY(0deg) scale(1)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl p-6 border transition-transform will-change-transform"
      style={{
        ...style,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.18)",
        transformStyle: "preserve-3d",
      }}
      data-testid={`toolkit-card-${index}`}
    >
      <p className="text-white text-lg" style={{ fontFamily: "Inter, sans-serif" }}>{text}</p>
    </div>
  );
};

const Toolkit = () => {
  return (
    <section id="skills" className="py-24" data-testid="section-toolkit">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>Toolkit & Expertise</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <TiltCard key={i} text={it.title} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolkit;