// File: frontend/src/app/(shop)/menu/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { CategoryTabs } from '../../../components/menu/CategoryTabs';
import { MenuItemCard } from '../../../components/menu/MenuItemCard';
import { getCategories, getItems } from '../../../lib/menu';
import type { MenuCategory, MenuItem } from '../../../types/menu';

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.categories))
      .catch(() => {
        // Non-fatal: the "All" tab still works without category tabs loading.
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getItems({ categorySlug: activeCategory ?? undefined, availableOnly: true })
      .then((data) => setItems(data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-brand-dark pb-24">
      <Navbar />

      <div className="pt-32 text-center">
        <h1 className="font-display text-4xl italic text-white">Our Menu</h1>
        <p className="mt-3 text-white/60">Fresh ingredients, made to order.</p>
      </div>

      <CategoryTabs categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {loading && <p className="text-center text-white/50">Loading menu…</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-center text-white/50">No items in this category yet.</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}