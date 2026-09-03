// File: frontend/src/components/about/AboutHero.tsx
import Image from 'next/image';
import Link from 'next/link';

export function AboutHero() {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Feane restaurant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <h1 className="font-display text-5xl italic text-white md:text-6xl">Feane</h1>
        <p className="mt-4 text-lg text-white/70">
          Fresh, hand-pressed fast food, made the right way — every single time.
        </p>
        <Link
          href="/book-table"
          className="mt-8 inline-block rounded-full bg-brand-gold px-10 py-4 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}