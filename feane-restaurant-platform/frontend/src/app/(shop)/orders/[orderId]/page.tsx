// File: frontend/src/app/(shop)/orders/[orderId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../../../components/layout/Navbar';
import { RequireAuth } from '../../../../components/auth/RequireAuth';
import { getOrder } from '../../../../lib/orders';
import type { Order } from '../../../../types/order';

const STATUS_LABEL: Record<Order['status'], string> = {
  pending: 'Order received',
  confirmed: 'Confirmed',
  preparing: 'Preparing your food',
  ready: 'Ready',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

function OrderStatusView() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrder(params.orderId)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.message));
  }, [params.orderId]);

  if (error) return <p className="mt-16 text-center text-red-400">{error}</p>;
  if (!order) return <p className="mt-16 text-center text-white/50">Loading order…</p>;

  return (
    <div className="mt-8 rounded-2xl bg-white/5 p-8">
      <p className="text-sm text-white/50">Order #{order.id.slice(0, 8)}</p>
      <h2 className="mt-2 font-display text-2xl text-brand-gold">{STATUS_LABEL[order.status]}</h2>

      <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
        {order.items?.map((line) => (
          <div key={line.menu_item_id} className="flex justify-between text-sm text-white/70">
            <span>
              {line.quantity} × {line.item_name}
            </span>
            <span>${Number(line.subtotal).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between border-t border-white/10 pt-6 font-semibold">
        <span className="text-white/80">Total</span>
        <span className="text-brand-gold">${Number(order.total_amount).toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <RequireAuth>
      <main className="min-h-screen bg-brand-dark pb-24">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 pt-32 md:px-10">
          <h1 className="font-display text-4xl italic text-white">Order Status</h1>
          <OrderStatusView />
        </div>
      </main>
    </RequireAuth>
  );
}