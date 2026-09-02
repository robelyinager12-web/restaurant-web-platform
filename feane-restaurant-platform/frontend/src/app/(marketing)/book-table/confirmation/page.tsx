// File: frontend/src/app/(marketing)/book-table/confirmation/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../../components/layout/Navbar';
import { getBooking } from '../../../../lib/bookings';
import type { Booking } from '../../../../types/booking';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No booking reference provided.');
      return;
    }
    getBooking(bookingId)
      .then((data) => setBooking(data.booking))
      .catch((err) => setError(err.message));
  }, [bookingId]);

  return (
    <main className="min-h-screen bg-brand-dark pb-24">
      <Navbar />
      <div className="mx-auto max-w-xl px-6 pt-32 text-center md:px-10">
        <h1 className="font-display text-4xl italic text-brand-gold">Table Booked</h1>

        {error && <p className="mt-6 text-red-400">{error}</p>}

        {booking && (
          <div className="mt-8 rounded-2xl bg-white/5 p-8 text-left">
            <p className="text-sm text-white/50">Booking reference</p>
            <p className="font-mono text-white">{booking.id.slice(0, 8)}</p>

            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p>
                <span className="text-white/50">Date:</span> {booking.booking_date}
              </p>
              <p>
                <span className="text-white/50">Time:</span> {booking.booking_time}
              </p>
              <p>
                <span className="text-white/50">Party size:</span> {booking.party_size}
              </p>
              <p>
                <span className="text-white/50">Status:</span>{' '}
                <span className="capitalize text-brand-gold">{booking.status}</span>
              </p>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}