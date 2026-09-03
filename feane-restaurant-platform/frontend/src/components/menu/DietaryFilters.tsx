// File: frontend/src/components/menu/DietaryFilters.tsx
'use client';

export interface DietaryFilterState {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
}

interface Props {
  filters: DietaryFilterState;
  onChange: (filters: DietaryFilterState) => void;
  priceMax: number;
  onPriceMaxChange: (value: number) => void;
  priceCeiling: number;
}

const TOGGLES: { key: keyof DietaryFilterState; label: string }[] = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'glutenFree', label: 'Gluten-Free' },
];

export function DietaryFilters({ filters, onChange, priceMax, onPriceMaxChange, priceCeiling }: Props) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
      <div className="flex flex-wrap justify-center gap-2">
        {TOGGLES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange({ ...filters, [key]: !filters[key] })}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filters[key] ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs text-white/50">
        <span>Up to ${priceMax}</span>
        <input
          type="range"
          min={1}
          max={priceCeiling}
          value={priceMax}
          onChange={(e) => onPriceMaxChange(Number(e.target.value))}
          className="w-32 accent-brand-gold"
        />
      </div>
    </div>
  );
}