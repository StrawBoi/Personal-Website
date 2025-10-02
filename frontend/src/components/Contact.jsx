import React from 'react';

const Contact = () => {
  const cards = [
    { label: 'Email', value: 'Ahmed.ha.mahmoud@outlook.com', href: 'mailto:Ahmed.ha.mahmoud@outlook.com' },
    { label: 'Phone', value: '+32 490 36 48 04', href: 'tel:+32490364804' },
    { label: 'LinkedIn', value: 'linkedin.com/in/ahmed-mohsen-hanafy', href: 'https://www.linkedin.com/in/ahmed-mohsen-hanafy/' },
  ];

  const Tilt = ({ children, index }) => {
    const ref = React.useRef(null);
    const [style, setStyle] = React.useState({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
    const onMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-py * 6).toFixed(2);
      const ry = (px * 6).toFixed(2);
      setStyle({ transform: `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)` });
    };
    const onLeave = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });

    return (
      <a
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="block p-6 rounded-2xl border transition-transform will-change-transform"
        style={{
          ...style,
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.18)',
          transformStyle: 'preserve-3d',
        }}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`contact-card-${index}`}
      >
        {children}
      </a>
    );
  };

  return (
    <section id="contact" className="py-24" data-testid="section-contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Contact</h2>
          <p className="text-gray-300 mt-2" style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}>I am available for freelance and consulting opportunities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((c, i) => (
            <Tilt key={i} index={i} href={c.href}>
              <div>
                <div className="text-sm text-gray-300" style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}>{c.label}</div>
                <div className="text-white text-lg mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{c.value}</div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;