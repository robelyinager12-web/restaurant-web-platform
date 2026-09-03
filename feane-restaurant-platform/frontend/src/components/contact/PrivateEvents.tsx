// File: frontend/src/components/contact/PrivateEvents.tsx
import Link from 'next/link';

export function PrivateEvents() {
  return (
    <section className="bg-brand-dark py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-brand-gold/10 to-transparent px-6 py-12 text-center md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Something Bigger
        </p>
        <h2 className="mt-3 font-display text-3xl italic text-white">
          Private Events & Catering
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-white/60">
          Planning a birthday, corporate lunch, or larger gathering? Tell us the details and
          we&apos;ll help you put it together.
        </p>
        <Link
          href="/contact#contact-form"
          className="mt-6 inline-block rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:border-brand-gold hover:text-brand-gold transition"
        >
          Send an Event Inquiry
        </Link>
      </div>
    </section>
  );
}