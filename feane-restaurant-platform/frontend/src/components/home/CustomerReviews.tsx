// File: frontend/src/components/home/CustomerReviews.tsx
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Amara T.',
    rating: 5,
    text: 'Best burger I\'ve had in this city, hands down. The bun is always fresh and the patty is never dry.',
  },
  {
    name: 'Daniel K.',
    rating: 5,
    text: 'Ordered online for pickup and it was ready exactly on time. Fries were still hot and crispy.',
  },
  {
    name: 'Selam M.',
    rating: 4,
    text: 'Booked a table for a birthday dinner — staff were great and the food came out fast even with a full house.',
  },
];

export function CustomerReviews() {
  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <div key={review.name} className="rounded-2xl bg-white/5 p-8">
              <div className="flex gap-1 text-brand-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-5 text-sm font-semibold text-white">{review.name}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/30">
          Sample reviews shown — wire this to real customer feedback once you're collecting it.
        </p>
      </div>
    </section>
  );
}