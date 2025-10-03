import React from 'react';

const Contact = () => {
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
      const base = (import.meta.env?.REACT_APP_BACKEND_URL) || (process.env.REACT_APP_BACKEND_URL);
      const res = await fetch(`${base}/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      const data = await res.json(); if (!res.ok) throw new Error(data?.detail || 'Failed to send');
      setStatus({ ok: true, msg: 'Thanks! Your message has been received.' }); setForm({ name: '', email: '', message: '' });
    } catch (err) { setStatus({ ok: false, msg: err.message || 'Something went wrong.' }); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="py-24" data-testid="section-contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left: Narrative + reasons to contact */}
          <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <h3 className="text-white text-2xl font-semibold mb-3">Let’s build something measurable</h3>
            <p className="text-gray-300">From strategy to execution, I connect customer understanding with technical delivery and business impact. Tell me about your goals—I'll reply within 24 hours.</p>
            <ul className="text-gray-300 list-disc pl-5 mt-4 space-y-1">
              <li>Website/product improvements and audits</li>
              <li>Pricing/analytics dashboards and automations</li>
              <li>Creative direction and go-to-market support</li>
            </ul>
          </div>
          {/* Right: Form */}
          <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.15)' }}>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4" data-testid="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Name</label>
                  <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500" placeholder="Your name" data-testid="contact-input-name" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500" placeholder="you@example.com" data-testid="contact-input-email" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1" htmlFor="message">Message</label>
                <textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-teal-500" placeholder="Tell me about your project or idea" data-testid="contact-input-message" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded border border-teal-500 text-white hover:bg-teal-500/20 disabled:opacity-60" data-testid="contact-submit">{submitting ? 'Sending...' : 'Send Message'}</button>
                {status && (<span className={status.ok ? 'text-teal-400' : 'text-amber-400'} data-testid="contact-status">{status.msg}</span>)}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;