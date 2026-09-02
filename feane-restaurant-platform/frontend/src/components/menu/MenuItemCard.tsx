// File: frontend/src/components/menu/MenuItemCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { MenuItem } from '../../types/menu';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 transition-all hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-black/30">
      <div className="relative h-44 w-full overflow-hidden bg-black/20">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/30">
            No image
          </div>
        )}
        {!item.is_available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-white">{item.name}</h3>
        {item.description && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
            {item.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-brand-gold">
            ${Number(item.price).toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!item.is_available}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 ${
              justAdded ? 'bg-green-500 text-white' : 'bg-brand-gold text-brand-dark hover:brightness-110'
            }`}
          >
            {justAdded ? <Check size={14} /> : <Plus size={14} />}
            {justAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}