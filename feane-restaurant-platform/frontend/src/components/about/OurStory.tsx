// File: frontend/src/components/about/OurStory.tsx
import Image from 'next/image';

export function OurStory() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-[440px]">
          <Image
            src="/images/about/founder.jpg"
            alt="Feane founder in the kitchen"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Our Story
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Where It All Started
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            Feane began in 2014 with a single grill, a small counter, and a founder who believed
            fast food didn&apos;t have to mean settling. What started as a weekend stall selling
            hand-pressed burgers to neighbors grew, one satisfied customer at a time, into the
            restaurant it is today.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            Our founder learned to cook watching family prepare meals from scratch — never a
            shortcut, never a package mix. That same philosophy is the reason every patty is still
            hand-formed and every bun still baked fresh, more than a decade later.
          </p>
          <p className="mt-4 leading-relaxed text-white/70">
            From a single stall to a full restaurant with a growing team, Feane&apos;s journey has
            been built on consistency — the same standard, on every plate, every day.
          </p>
        </div>
      </div>
    </section>
  );
}