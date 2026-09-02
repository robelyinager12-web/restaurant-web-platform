// File: frontend/src/components/menu/MenuItemCard.tsx
'use client';

import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import type { MenuItem } from '../../types/menu';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="group rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/[0.08]">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-black/20">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30 text-sm">
            No image
          </div>
        )}
      </div>

      <h3 className="font-display text-lg text-white">{item.name}</h3>
      {item.description && (
        <p className="mt-1 line-clamp-2 text-sm text-white/60">{item.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-brand-gold font-semibold">${Number(item.price).toFixed(2)}</span>
        <button
          onClick={() => addItem(item)}
          disabled={!item.is_available}
          className="rounded-full bg-brand-gold px-4 py-2 text-xs font-semibold text-brand-dark transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          {item.is_available ? 'Add to cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}