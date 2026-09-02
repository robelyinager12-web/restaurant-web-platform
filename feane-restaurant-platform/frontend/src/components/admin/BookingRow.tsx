// File: frontend/src/components/admin/BookingRow.tsx
'use client';

import { useState } from 'react';
import { BookingStatusBadge } from './BookingStatusBadge';
import { updateBookingStatus } from '../../lib/adminBookings';
import type { Booking } from '../../types/booking';

// A completed booking is locked server-side (Phase 9's updateBookingStatus
// rejects further changes once completed) — so it offers no next actions.
const NEXT_STATUS: Record<Booking['status'], Booking['status'][]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  cancelled: ['pending'],
  completed: [],
};

export function BookingRow({ booking, onChange }: { booking: Booking; onChange: () => void }) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (status: Booking['status']) => {
    setUpdating(true);
    try {
      await updateBookingStatus(booking.id, status);
      onChange();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not update booking status');
    } finally {
      setUpdating(false);
    }
  };

  const nextOptions = NEXT_STATUS[booking.status];

  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-white/10 py-4 text-sm">
      <div>
        <p className="text-white">{booking.name}</p>
        <p className="text-xs text-white/40">{booking.email} · {booking.phone}</p>
        {booking.notes && <p className="mt-1 text-xs text-white/40">Note: {booking.notes}</p>}
      </div>

      <div className="text-white/70">
        <p>{booking.booking_date}</p>
        <p className="text-xs text-white/40">{booking.booking_time}</p>
      </div>

      <span className="text-white/70">Party of {booking.party_size}</span>

      <BookingStatusBadge status={booking.status} />

      {nextOptions.length > 0 ? (
        <select
          disabled={updating}
          defaultValue=""
          onChange={(e) => e.target.value && handleStatusChange(e.target.value as Booking['status'])}
          className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white outline-none ring-1 ring-white/10"
        >
          <option value="" className="bg-brand-dark">Update…</option>
          {nextOptions.map((status) => (
            <option key={status} value={status} className="bg-brand-dark capitalize">
              {status}
            </option>
          ))}
        </select>
      ) : (
        <span />
      )}
    </div>
  );
}