// File: frontend/src/components/contact/ContactForm.tsx
'use client';

import { useState, type FormEvent } from 'react';

// No backend endpoint exists for contact submissions yet — this is UI-only
// and simulates success client-side. See "Recommended improvements" in the
// accompanying reply for what's needed to make this real.
export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white/5 p-10 text-center">
        <p className="font-display text-2xl italic text-brand-gold">Message Sent</p>
        <p className="mt-3 text-sm text-white/60">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Full Name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Phone (optional)</label>
          <input
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Subject</label>
          <select
            required
            value={form.subject}
            onChange={handleChange('subject')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          >
            <option value="" className="bg-brand-dark">Select a topic</option>
            <option value="general" className="bg-brand-dark">General Inquiry</option>
            <option value="feedback" className="bg-brand-dark">Feedback</option>
            <option value="reservation" className="bg-brand-dark">Reservation</option>
            <option value="event" className="bg-brand-dark">Private Event / Catering</option>
            <option value="other" className="bg-brand-dark">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/60">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={handleChange('message')}
          className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-gold py-4 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
      >
        Send Message
      </button>
    </form>
  );
}