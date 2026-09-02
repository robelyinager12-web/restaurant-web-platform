// File: frontend/src/components/home/SpecialOffers.tsx
import Link from 'next/link';

const OFFERS = [
  {
    tag: 'Weekdays 12–3PM',
    title: 'Lunch Combo Deal',
    description: 'Any burger + fries + drink for one flat price. Every weekday, no coupon needed.',
  },
  {
    tag: 'This Weekend',
    title: 'Family Bundle',
    description: '4 burgers, 2 large fries, and a family-size drink — built for the whole table.',
  },
];

export function SpecialOffers() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Limited Time
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Special Offers
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent p-8"
            >
              <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-dark">
                {offer.tag}
              </span>
              <h3 className="mt-5 font-display text-2xl italic text-white">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{offer.description}</p>
              <Link
                href="/menu"
                className="mt-6 inline-block text-sm font-semibold text-brand-gold hover:underline"
              >
                Order now →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/30">
          Offers shown are examples — connect this section to real, admin-managed promotions when
          you're ready.
        </p>
      </div>
    </section>
  );
}