// File: frontend/src/components/about/OurValues.tsx
import { Salad, ChefHat, Heart, Leaf, Users } from 'lucide-react';

const VALUES = [
  { icon: Salad, label: 'Quality Ingredients' },
  { icon: ChefHat, label: 'Culinary Excellence' },
  { icon: Heart, label: 'Hospitality' },
  { icon: Leaf, label: 'Sustainability' },
  { icon: Users, label: 'Community' },
];

export function OurValues() {
  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            What Guides Us
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">Our Values</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {VALUES.map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                <Icon size={28} />
              </div>
              <p className="mt-4 text-sm font-medium text-white">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}