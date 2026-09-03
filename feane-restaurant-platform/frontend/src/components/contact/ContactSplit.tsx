// File: frontend/src/components/contact/ContactSplit.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const INFO = [
  { icon: MapPin, label: 'Visit', value: 'Injibara, Amhara Region, Ethiopia' },
  { icon: Phone, label: 'Call', value: '+251 9XX XXX XXX' },
  { icon: Mail, label: 'Email', value: 'hello@feane.local' },
  { icon: Clock, label: 'Hours', value: 'Mon – Sat, 9:00 – 18:00' },
];

// No backend endpoint exists for contact submissions yet — UI-only,
// simulates success client-side. See reply notes for what's needed to
// make this real.
export function ContactSplit() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        {/* Left: intro + info list */}
        <div>
          <span className="inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gold">
            Get In Touch
          </span>
          <h2 className="mt-5 font-display text-4xl italic leading-tight text-white md:text-5xl">
            Questions About an Order or a Table?
          </h2>

          <div className="mt-10 space-y-6">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                    {label}
                  </p>
                  <p className="mt-0.5 text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div className="rounded-3xl bg-white/5 p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-2xl italic text-brand-gold">Message Sent</p>
              <p className="mt-3 text-sm text-white/60">
                Thanks for reaching out — we&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full rounded-xl bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-brand-gold"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange('email')}
                className="w-full rounded-xl bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-brand-gold"
              />
              <textarea
                required
                rows={6}
                placeholder="Message"
                value={form.message}
                onChange={handleChange('message')}
                className="w-full resize-none rounded-xl bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-brand-gold py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}