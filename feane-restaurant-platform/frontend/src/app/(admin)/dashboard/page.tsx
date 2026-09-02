// File: frontend/src/app/(admin)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { RequireAdmin } from '../../../components/auth/RequireAdmin';
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { apiClient } from '../../../lib/api-client';
import type { Order } from '../../../types/order';
import type { Booking } from '../../../types/booking';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/5 p-6">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-2 font-display text-3xl text-brand-gold">{value}</p>
    </div>
  );
}

function DashboardOverview() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    apiClient.get<{ orders: Order[] }>('/orders').then((d) => setOrders(d.orders));
    apiClient.get<{ bookings: Booking[] }>('/bookings').then((d) => setBookings(d.bookings));
  }, []);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const todayBookings = bookings.filter(
    (b) => b.booking_date === new Date().toISOString().split('T')[0]
  ).length;
  const revenueToday = orders
    .filter(
      (o) =>
        o.status !== 'cancelled' &&
        new Date(o.created_at).toDateString() === new Date().toDateString()
    )
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-white">Overview</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard label="Pending orders" value={pendingOrders} />
        <StatCard label="Bookings today" value={todayBookings} />
        <StatCard label="Revenue today" value={`$${revenueToday.toFixed(2)}`} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAdmin>
      <AdminLayout>
        <DashboardOverview />
      </AdminLayout>
    </RequireAdmin>
  );
}