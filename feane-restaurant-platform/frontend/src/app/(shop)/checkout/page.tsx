// File: frontend/src/app/(shop)/checkout/page.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { RequireAuth } from '../../../components/auth/RequireAuth';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { createOrder } from '../../../lib/orders';

function CheckoutForm() {
  const { lines, total, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Switching order type clears a stale address rather than letting it
  // linger in state and potentially get sent along with a pickup order.
  const handleOrderTypeChange = (type: 'pickup' | 'delivery') => {
    setOrderType(type);
    if (type === 'pickup') {
      setDeliveryAddress('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (lines.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setError('Delivery address is required for delivery orders.');
      return;
    }

    setSubmitting(true);
    try {
      const { order } = await createOrder({
        items: lines.map((l) => ({ menuItemId: l.item.id, quantity: l.quantity })),
        orderType,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
        contactPhone: contactPhone.trim(),
        notes: notes.trim() || undefined,
      });
      clear();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-white/50">Your cart is empty — add something from the menu first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-2xl bg-white/5 p-6">
        <h2 className="font-display text-xl text-white">Order Summary</h2>
        <div className="mt-4 space-y-2">
          {lines.map((line) => (
            <div key={line.item.id} className="flex justify-between text-sm text-white/70">
              <span>
                {line.quantity} × {line.item.name}
              </span>
              <span>${(Number(line.item.price) * line.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-white/10 pt-4 font-semibold">
          <span className="text-white/80">Total</span>
          <span className="text-brand-gold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 p-6">
        <h2 className="font-display text-xl text-white">Delivery or Pickup</h2>
        <div className="mt-4 flex gap-3">
          {(['pickup', 'delivery'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleOrderTypeChange(type)}
              className={`flex-1 rounded-full py-3 text-sm font-medium capitalize transition-colors ${
                orderType === type
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {orderType === 'delivery' && (
          <div className="mt-4">
            <label className="mb-1.5 block text-sm text-white/60">Delivery address</label>
            <input
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="mb-1.5 block text-sm text-white/60">Contact phone</label>
          <input
            required
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm text-white/60">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-gold py-4 text-sm font-semibold text-brand-dark hover:brightness-110 transition disabled:opacity-60"
      >
        {submitting ? 'Placing order…' : `Place Order — $${total.toFixed(2)}`}
      </button>

      <p className="text-center text-xs text-white/40">Signed in as {user?.email}</p>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen bg-brand-dark pb-24">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 pt-32 md:px-10">
          <h1 className="font-display text-4xl italic text-white">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
    </RequireAuth>
  );
}