// File: frontend/src/components/home/FeaturedMenu.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getItems } from '../../lib/menu';
import { useCart } from '../../context/CartContext';
import type { MenuItem } from '../../types/menu';

const FEATURED_COUNT = 4;

export function FeaturedMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    getItems({ availableOnly: true })
      .then((data) => setItems(data.items.slice(0, FEATURED_COUNT)))
      .catch(() => {
        // Non-fatal — section just renders empty if the API is unreachable.
      });
  }, []);

  return (
    <section className="bg-black/20 py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Fan Favorites
          </p>
          <h2 className="mt-3 font-display text-4xl italic text-white md:text-5xl">
            Featured Menu
          </h2>
        </div>

        {items.length === 0 ? (
          <p className="mt-12 text-center text-white/40">
            Menu items will appear here once added from the admin dashboard.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="group rounded-2xl bg-white/5 p-5">
                <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl bg-black/20">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-white/30">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-display text-white">{item.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-brand-gold">
                    ${Number(item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="rounded-full bg-brand-gold px-3 py-1.5 text-xs font-semibold text-brand-dark hover:brightness-110 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:border-brand-gold hover:text-brand-gold transition"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}