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

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden pt-32 pb-20 md:min-h-[720px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10">
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

        <div className="relative h-[320px] md:h-[440px]">
          <Image
            src={slide.image}
            alt="Burger and fries on a wooden board"
            fill
            priority
            className="object-contain object-center md:object-right"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
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