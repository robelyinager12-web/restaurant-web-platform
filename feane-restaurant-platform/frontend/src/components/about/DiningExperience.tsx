// File: frontend/src/components/about/DiningExperience.tsx
import Image from 'next/image';

// Populate frontend/public/images/about/experience/ with real photos.
const EXPERIENCES = [
  { title: 'Interior Dining', photo: '/images/about/experience/interior.jpg' },
  { title: 'Outdoor Seating', photo: '/images/about/experience/outdoor.jpg' },
  { title: 'Private Dining', photo: '/images/about/experience/private-dining.jpg' },
  { title: 'For Every Occasion', photo: '/images/about/experience/family-dining.jpg' },
];

export function DiningExperience() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            The Space
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            The Feane Experience
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
            Whether it&apos;s a quick solo lunch, a family dinner, or a private event — the space
            adapts to you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {EXPERIENCES.map((exp) => (
            <div key={exp.title} className="group relative h-64 overflow-hidden rounded-2xl bg-white/5">
              <Image
                src={exp.photo}
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
                {exp.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}