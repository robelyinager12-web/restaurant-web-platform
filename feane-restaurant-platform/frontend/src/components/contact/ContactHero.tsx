// File: frontend/src/components/contact/ContactHero.tsx
export function ContactHero() {
  return (
    <section className="bg-brand-dark pb-16 pt-40 text-center">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Get In Touch
        </p>
        <h1 className="mt-3 font-display text-5xl italic text-white md:text-6xl">
          We&apos;d Love to Hear From You
        </h1>
        <p className="mt-5 text-white/60">
          Questions, feedback, or planning something special — reach out and we&apos;ll get back to
          you as soon as we can.
        </p>
      </div>
    </section>
  );
}