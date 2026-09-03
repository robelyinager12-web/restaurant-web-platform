// File: frontend/src/components/contact/ContactFinalCTA.tsx
import Link from 'next/link';

export function ContactFinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black/20 py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 80% at 50% 50%, rgba(242,169,34,0.10) 0%, rgba(20,21,24,0) 70%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center md:px-10">
        <h2 className="font-display text-3xl italic text-white md:text-4xl">
          Ready for an Unforgettable Dining Experience?
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/menu"
            className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:border-brand-gold hover:text-brand-gold transition"
          >
            View Menu
          </Link>
          <Link
            href="/book-table"
            className="rounded-full bg-brand-gold px-8 py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
          >
            Reserve a Table
          </Link>
        </div>
      </div>
    </section>
  );
}