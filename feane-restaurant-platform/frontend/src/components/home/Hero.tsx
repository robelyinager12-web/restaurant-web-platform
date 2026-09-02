// File: frontend/src/components/home/Hero.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  {
    title: 'Fast Food Restaurant',
    description:
      'Fresh, hand-pressed burgers and crispy fries made to order. Taste the difference real ingredients make.',
    image: '/images/hero-burger-fries.png',
  },
  {
    title: 'Bold Flavors, Fast',
    description:
      'From our grill to your table in minutes — without cutting a single corner on flavor.',
    image: '/images/hero-burger-fries.png',
  },
  {
    title: 'Order. Relax. Enjoy.',
    description: 'Order online for pickup or delivery, or book a table and let us do the rest.',
    image: '/images/hero-burger-fries.png',
  },
];

// Fades the image's left, top, and bottom edges into transparency so the
// dark page background shows through instead of a hard rectangular edge —
// matches the reference design where the photo blends into the page rather
// than sitting in a bounded card.
const EDGE_FADE_MASK =
  'linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)';

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden pb-0 pt-32 md:min-h-[760px]">
      <div className="relative mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10">
        <div className="relative z-10">
          <h1 className="font-display text-5xl italic leading-tight text-white md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            {slide.description}
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
          >
            Order Now
          </Link>

          <div className="mt-16 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  idx === active ? 'bg-brand-gold' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed image, positioned absolutely over the right half of the
          section and allowed to overflow past the section's own bottom edge —
          this, combined with the mask below, is what makes it read as "part
          of the page" instead of a photo dropped in a box. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block"
        style={{
          maskImage: EDGE_FADE_MASK,
          WebkitMaskImage: EDGE_FADE_MASK,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <Image
          src={slide.image}
          alt="Burgers on a wooden board"
          fill
          priority
          className="object-cover object-center"
          sizes="55vw"
        />
      </div>

      {/* Mobile fallback: same image, simple contained box, no fade mask —
          the edge-blend effect depends on horizontal space this layout
          doesn't have below the md breakpoint. */}
      <div className="relative mt-8 h-[280px] w-full px-6 md:hidden">
        <Image
          src={slide.image}
          alt="Burgers on a wooden board"
          fill
          className="rounded-2xl object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 75% 50%, rgba(242,169,34,0.08) 0%, rgba(20,21,24,0) 70%)',
        }}
      />
    </section>
  );
}