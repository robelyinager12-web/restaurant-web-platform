// File: frontend/src/components/menu/CategoryTabs.tsx
'use client';

import type { MenuCategory } from '../../types/menu';

interface Props {
  categories: MenuCategory[];
  active: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryTabs({ categories, active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-10">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
          active === null
            ? 'bg-brand-gold text-brand-dark'
            : 'bg-white/5 text-white/70 hover:bg-white/10'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            active === cat.slug
              ? 'bg-brand-gold text-brand-dark'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}