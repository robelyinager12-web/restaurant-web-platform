// File: frontend/src/components/home/RestaurantExperience.tsx
import { Flame, Timer, Leaf, ChefHat } from 'lucide-react';

const FEATURES = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Sourced daily from local suppliers — nothing frozen, nothing sitting around.',
  },
  {
    icon: Flame,
    title: 'Hand-Pressed & Grilled',
    description: 'Every patty is shaped and grilled to order, never pre-formed or reheated.',
  },
  {
    icon: Timer,
    title: 'Fast Without Shortcuts',
    description: 'Efficient kitchen workflow means quick service without sacrificing quality.',
  },
  {
    icon: ChefHat,
    title: 'Expert Kitchen Team',
    description: 'Trained cooks who care about consistency, on every single order.',
  },
];

export function RestaurantExperience() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Why Feane
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            The Feane Experience
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Icon size={26} />
              </div>
              <h3 className="mt-5 font-display text-lg text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}