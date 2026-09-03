// File: frontend/src/components/contact/ReservationsCTA.tsx
import Link from 'next/link';
import { Phone } from 'lucide-react';

export function ReservationsCTA() {
  return (
    <section className="bg-black/20 py-16">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Dining With Us
        </p>
        <h2 className="mt-3 font-display text-3xl italic text-white">Reservations</h2>
        <p className="mt-4 text-white/60">
          Book online in under a minute, or call us directly for same-day reservations.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/book-table"
            className="rounded-full bg-brand-gold px-8 py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
          >
            Book a Table
          </Link>
          
            href="tel:+25100000000"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:border-brand-gold hover:text-brand-gold transition"
          >
            <Phone size={16} /> +251 00 000 0000
          </a>
        </div>
      </div>
    </section>
  );
}