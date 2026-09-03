// File: frontend/src/components/menu/MenuHero.tsx
export function MenuHero() {
  return (
    <section className="bg-brand-dark pb-12 pt-40 text-center">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Fresh Daily, Made to Order
        </p>
        <h1 className="mt-3 font-display text-5xl italic text-white md:text-6xl">
          Explore Our Menu
        </h1>
        <p className="mt-4 text-white/60">
          Hand-pressed burgers, crispy sides, and more — every dish made fresh, never frozen.
        </p>
      </div>
    </section>
  );
}