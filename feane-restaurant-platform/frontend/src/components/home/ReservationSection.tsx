// File: frontend/src/components/home/ReservationSection.tsx
import Link from 'next/link';

export function ReservationSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 80% at 50% 50%, rgba(242,169,34,0.10) 0%, rgba(20,21,24,0) 70%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Dine With Us
        </p>
        <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
          Reserve Your Table
        </h2>
        <p className="mt-6 text-white/70">
          Whether it's a quick bite or a full table for a celebration, we'll have a spot ready.
          Booking takes less than a minute — no account required.
        </p>
        <Link
          href="/book-table"
          className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
        >
          Book a Table
        </Link>
      </div>
    </section>
  );
}