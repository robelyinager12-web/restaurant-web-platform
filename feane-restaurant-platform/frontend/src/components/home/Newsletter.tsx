// File: frontend/src/components/home/Newsletter.tsx
'use client';

import { useState, type FormEvent } from 'react';

// No backend endpoint exists for newsletter signups yet — this is UI-only
// and simulates success client-side. See "Recommended improvements" below.
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-brand-dark py-20">
      <div className="mx-auto max-w-xl px-6 text-center md:px-10">
        <h2 className="font-display text-3xl italic text-white">Stay in the Loop</h2>
        <p className="mt-3 text-sm text-white/60">
          Get notified about new menu items, offers, and events. No spam.
        </p>

        {submitted ? (
          <p className="mt-6 text-brand-gold">Thanks — you're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full bg-white/5 px-5 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}