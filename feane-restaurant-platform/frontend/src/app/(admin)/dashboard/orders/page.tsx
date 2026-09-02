// File: frontend/src/app/(admin)/dashboard/orders/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { RequireAdmin } from '../../../../components/auth/RequireAdmin';
import { AdminLayout } from '../../../../components/admin/AdminLayout';
import { OrderRow } from '../../../../components/admin/OrderRow';
import { getAllOrders } from '../../../../lib/adminOrders';
import type { Order } from '../../../../types/order';

const STATUS_FILTERS: (Order['status'] | 'all')[] = [
  'all',
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
  'cancelled',
];

function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    getAllOrders(filter === 'all' ? undefined : filter)
      .then((d) => setOrders(d.orders))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-white">Orders</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === status ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white/5 px-6">
        {loading && <p className="py-8 text-center text-white/40">Loading orders…</p>}
        {!loading && orders.length === 0 && (
          <p className="py-8 text-center text-white/40">No orders found.</p>
        )}
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} onChange={refresh} />
        ))}
      </div>
    </div>
  );
}

export default function DashboardOrdersPage() {
  return (
    <RequireAdmin>
      <AdminLayout>
        <AdminOrdersPage />
      </AdminLayout>
    </RequireAdmin>
  );
}