// File: frontend/src/components/menu/MenuToolbar.tsx
'use client';

import { Search, ArrowUpDown } from 'lucide-react';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function MenuToolbar({ search, onSearchChange, sort, onSortChange }: Props) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-center">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search the menu…"
          className="w-full rounded-full bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
      </div>

      <div className="relative">
        <ArrowUpDown size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full appearance-none rounded-full bg-white/5 py-2.5 pl-9 pr-8 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold sm:w-auto"
        >
          <option value="default" className="bg-brand-dark">Sort: Featured</option>
          <option value="name" className="bg-brand-dark">Name (A–Z)</option>
          <option value="price-asc" className="bg-brand-dark">Price: Low to High</option>
          <option value="price-desc" className="bg-brand-dark">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}