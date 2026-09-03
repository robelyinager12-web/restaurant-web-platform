// File: frontend/src/app/(shop)/menu/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { MenuHero } from '../../../components/menu/MenuHero';
import { CategoryTabs } from '../../../components/menu/CategoryTabs';
import { MenuItemCard } from '../../../components/menu/MenuItemCard';
import { MenuItemSkeleton } from '../../../components/menu/MenuItemSkeleton';
import { MenuToolbar, type SortOption } from '../../../components/menu/MenuToolbar';
import { DietaryFilters, type DietaryFilterState } from '../../../components/menu/DietaryFilters';
import { MenuFinalCTA } from '../../../components/menu/MenuFinalCTA';
import { getCategories, getItems } from '../../../lib/menu';
import type { MenuCategory, MenuItem } from '../../../types/menu';

const PRICE_CEILING = 50;

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [dietary, setDietary] = useState<DietaryFilterState>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });
  const [priceMax, setPriceMax] = useState(PRICE_CEILING);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.categories))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getItems({ categorySlug: activeCategory ?? undefined, availableOnly: true })
      .then((data) => setItems(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const visibleItems = useMemo(() => {
    let result = items;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    result = result.filter((item) => Number(item.price) <= priceMax);

    if (dietary.vegetarian) result = result.filter((item) => item.is_vegetarian || item.is_vegan);
    if (dietary.vegan) result = result.filter((item) => item.is_vegan);
    if (dietary.glutenFree) result = result.filter((item) => item.is_gluten_free);

    const sorted = [...result];
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'price-asc') sorted.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') sorted.sort((a, b) => Number(b.price) - Number(a.price));

    return sorted;
  }, [items, search, sort, dietary, priceMax]);

  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />
      <MenuHero />

      <div className="mt-2">
        <MenuToolbar search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} />
      </div>

      <div className="mt-6">
        <DietaryFilters
          filters={dietary}
          onChange={setDietary}
          priceMax={priceMax}
          onPriceMaxChange={setPriceMax}
          priceCeiling={PRICE_CEILING}
        />
      </div>

      <CategoryTabs categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        {error && (
          <div className="mx-auto max-w-md rounded-xl bg-red-500/10 p-6 text-center">
            <p className="text-red-400">{error}</p>
            <p className="mt-2 text-xs text-white/40">
              If this persists, check your backend terminal for the actual error.
            </p>
          </div>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <MenuItemSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && !error && visibleItems.length === 0 && (
          <p className="text-center text-white/50">
            No items match your current filters. Try widening the price range or clearing dietary filters.
          </p>
        )}

        {!loading && !error && visibleItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <MenuFinalCTA />
      <Footer />
    </main>
  );
}