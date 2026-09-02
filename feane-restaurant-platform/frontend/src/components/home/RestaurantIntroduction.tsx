// File: frontend/src/components/home/RestaurantIntroduction.tsx
import Image from 'next/image';

const STATS = [
  { value: '12+', label: 'Years of Experience' },
  { value: '50k+', label: 'Happy Customers' },
  { value: '30+', label: 'Menu Items' },
  { value: '4.8', label: 'Average Rating' },
];

export function RestaurantIntroduction() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-[440px]">
          <Image
            src="/images/restaurant-interior.jpg"
            alt="Feane restaurant interior"
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
            Real Food, Made Right
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            Feane started as a single grill and a simple idea: fast food doesn&apos;t have to mean
            cutting corners. Every patty is hand-pressed, every bun is baked fresh, and every order
            is made from scratch — never pre-frozen, never microwaved. We believe good ingredients,
            treated simply, beat shortcuts every time.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-brand-gold">{stat.value}</p>
                <p className="mt-1 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}