// File: frontend/src/app/(admin)/dashboard/bookings/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { RequireAdmin } from '../../../../components/auth/RequireAdmin';
import { AdminLayout } from '../../../../components/admin/AdminLayout';
import { BookingRow } from '../../../../components/admin/BookingRow';
import { getAllBookings } from '../../../../lib/adminBookings';
import type { Booking } from '../../../../types/booking';

function todayISODate() {
  return new Date().toISOString().split('T')[0];
}

const STATUS_FILTERS: (Booking['status'] | 'all')[] = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState(todayISODate());
  const [status, setStatus] = useState<Booking['status'] | 'all'>('all');
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    getAllBookings({
      date: date || undefined,
      status: status === 'all' ? undefined : status,
    })
      .then((d) => setBookings(d.bookings))
      .finally(() => setLoading(false));
  }, [date, status]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-white">Bookings</h1>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs text-white/50">Date</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 [color-scheme:dark]"
            />
            <button
              onClick={() => setDate('')}
              className="text-xs text-white/40 hover:text-white/70"
            >
              Clear (all dates)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                status === s ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white/5 px-6">
        {loading && <p className="py-8 text-center text-white/40">Loading bookings…</p>}
        {!loading && bookings.length === 0 && (
          <p className="py-8 text-center text-white/40">No bookings found for this filter.</p>
        )}
        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} onChange={refresh} />
        ))}
      </div>
    </div>
  );
}

export default function DashboardBookingsPage() {
  return (
    <RequireAdmin>
      <AdminLayout>
        <AdminBookingsPage />
      </AdminLayout>
    </RequireAdmin>
  );
}