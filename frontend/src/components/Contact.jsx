import React from 'react';

const Contact = () => {
  const cards = [
    { label: 'Email', value: 'Ahmed.ha.mahmoud@outlook.com', href: 'mailto:Ahmed.ha.mahmoud@outlook.com' },
    { label: 'Phone', value: '+32 490 36 48 04', href: 'tel:+32490364804' },
    { label: 'LinkedIn', value: 'linkedin.com/in/ahmed-mohsen-hanafy', href: 'https://www.linkedin.com/in/ahmed-mohsen-hanafy/' },
  ];

  const Tilt = ({ children, index, href }) => {
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

    const Wrapper = href ? 'a' : 'div';

    return (
      <Wrapper
        ref={ref}
        href={href}
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
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        data-testid={`contact-card-${index}`}
      >
        {children}
      </Wrapper>
    );
  };

  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: 'Please fill out all fields.' });
      return;
    }
    try {
      setSubmitting(true);
      const base = process.env.REACT_APP_BACKEND_URL || '/api';
      const res = await fetch(`${base}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to send');
      setStatus({ ok: true, msg: 'Thanks! Your message has been received.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24" data-testid="section-contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Contact</h2>
          <p className="text-gray-300 mt-2" style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}>I am available for freelance and consulting opportunities.</p>
        </div>

        {/* Contact quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {cards.map((c, i) => (
            <Tilt key={i} index={i} href={c.href}>
              <div>
                <div className="text-sm text-gray-300" style={{ fontFamily: "'Roboto Mono', ui-monospace, Menlo, monospace" }}>{c.label}</div>
                <div className="text-white text-lg mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{c.value}</div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4" data-testid="contact-form">
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500"
                placeholder="Your name"
                data-testid="contact-input-name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500"
                placeholder="you@example.com"
                data-testid="contact-input-email"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500"
                placeholder="Tell me about your project or idea"
                data-testid="contact-input-message"
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" disabled={submitting} className="px-5 py-2 rounded border border-teal-500 text-white hover:bg-teal-500/20 disabled:opacity-60" data-testid="contact-submit">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {status && (
                <span className={status.ok ? 'text-teal-400' : 'text-amber-400'} data-testid="contact-status">
                  {status.msg}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;