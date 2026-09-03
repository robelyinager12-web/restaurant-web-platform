// File: frontend/src/components/menu/DietaryBadges.tsx
import { Flame, Leaf, Sprout, WheatOff, Star } from 'lucide-react';
import type { MenuItem } from '../../types/menu';

// Renders only the badges that have actual data — an item with none of
// these fields set (true today, for every seeded item) simply shows
// nothing here, rather than fake/default badges.
export function DietaryBadges({ item }: { item: MenuItem }) {
  const badges = [];

  if (item.is_popular) {
    badges.push(
      <span key="popular" className="flex items-center gap-1 rounded-full bg-brand-gold/20 px-2 py-1 text-xs font-medium text-brand-gold">
        <Star size={11} fill="currentColor" /> Popular
      </span>
    );
  }
  if (item.is_vegan) {
    badges.push(
      <span key="vegan" className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-300">
        <Sprout size={11} /> Vegan
      </span>
    );
  } else if (item.is_vegetarian) {
    badges.push(
      <span key="veg" className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-300">
        <Leaf size={11} /> Vegetarian
      </span>
    );
  }
  if (item.is_gluten_free) {
    badges.push(
      <span key="gf" className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-300">
        <WheatOff size={11} /> Gluten-Free
      </span>
    );
  }
  if (item.spicy_level) {
    badges.push(
      <span key="spicy" className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-xs font-medium text-red-300">
        {Array.from({ length: item.spicy_level }).map((_, i) => (
          <Flame key={i} size={11} fill="currentColor" />
        ))}
      </span>
    );
  }

  if (badges.length === 0) return null;
  return <div className="mt-2 flex flex-wrap gap-1.5">{badges}</div>;
}