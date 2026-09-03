// File: frontend/src/components/about/WhyChooseUs.tsx
import { Sprout, ChefHat, Sparkles, Sofa, Zap, PartyPopper } from 'lucide-react';

const REASONS = [
  { icon: Sprout, title: 'Fresh Ingredients', description: 'Sourced daily, never frozen.' },
  { icon: ChefHat, title: 'Experienced Chefs', description: 'A kitchen team that cares about consistency.' },
  { icon: Sparkles, title: 'Unique Recipes', description: 'Signature dishes you won\'t find elsewhere.' },
  { icon: Sofa, title: 'Premium Atmosphere', description: 'A space designed to be comfortable, not just functional.' },
  { icon: Zap, title: 'Fast & Friendly Service', description: 'Quick without ever feeling rushed.' },
  { icon: PartyPopper, title: 'Private Dining & Events', description: 'Space available for groups and celebrations.' },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            The Difference
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Why Choose Us
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-white/5 p-8">
              <Icon size={26} className="text-brand-gold" />
              <h3 className="mt-4 font-display text-lg text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}