// File: frontend/src/components/cart/CartLineRow.tsx
'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { MenuItem } from '../../types/menu';

interface Props {
  item: MenuItem;
  quantity: number;
}

export function CartLineRow({ item, quantity }: Props) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = Number(item.price) * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-5">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-black/20">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : null}
      </div>

      <div className="flex-1">
        <h3 className="font-display text-white">{item.name}</h3>
        <p className="text-sm text-white/50">${Number(item.price).toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-3 rounded-full bg-white/5 px-3 py-1.5">
        <button
          onClick={() => updateQuantity(item.id, quantity - 1)}
          aria-label="Decrease quantity"
          className="text-white/70 hover:text-brand-gold"
        >
          <Minus size={14} />
        </button>
        <span className="w-4 text-center text-sm">{quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, quantity + 1)}
          aria-label="Increase quantity"
          className="text-white/70 hover:text-brand-gold"
        >
          <Plus size={14} />
        </button>
      </div>

      <span className="w-16 text-right text-sm font-semibold text-brand-gold">
        ${lineTotal.toFixed(2)}
      </span>

      <button
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.name}`}
        className="text-white/40 hover:text-red-400"
      >
        <X size={16} />
      </button>
    </div>
  );
}