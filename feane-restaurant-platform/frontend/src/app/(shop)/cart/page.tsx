// File: frontend/src/app/(shop)/cart/page.tsx
'use client';

import Link from 'next/link';
import { Navbar } from '../../../components/layout/Navbar';
import { CartLineRow } from '../../../components/cart/CartLineRow';
import { useCart } from '../../../context/CartContext';

export default function CartPage() {
  const { lines, total } = useCart();

  return (
    <main className="min-h-screen bg-brand-dark pb-24">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-32 md:px-10">
        <h1 className="font-display text-4xl italic text-white">Your Cart</h1>

        {lines.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-white/50">Your cart is empty.</p>
            <Link
              href="/menu"
              className="mt-6 inline-block rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8">
              {lines.map((line) => (
                <CartLineRow key={line.item.id} item={line.item} quantity={line.quantity} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="text-lg text-white/80">Total</span>
              <span className="text-2xl font-semibold text-brand-gold">${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-8 block w-full rounded-full bg-brand-gold py-4 text-center text-sm font-semibold text-brand-dark hover:brightness-110 transition"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </main>
  );
}