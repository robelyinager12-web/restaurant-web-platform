// File: frontend/src/components/booking/BookingForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../lib/bookings';

// Today's date in YYYY-MM-DD, used as the date input's min bound so the
// browser's own picker won't even offer past dates.
function todayISODate() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function BookingForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    partySize: 2,
    bookingDate: '',
    bookingTime: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({
        ...prev,
        [field]: field === 'partySize' ? Number(e.target.value) : e.target.value,
      }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { booking } = await createBooking({
        ...form,
        notes: form.notes.trim() || undefined,
      });
      router.push(`/book-table/confirmation?id=${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not complete booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Full name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Phone</label>
          <input
            required
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Party size</label>
          <input
            type="number"
            min={1}
            max={50}
            required
            value={form.partySize}
            onChange={handleChange('partySize')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Date</label>
          <input
            type="date"
            required
            min={todayISODate()}
            value={form.bookingDate}
            onChange={handleChange('bookingDate')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Time</label>
          <input
            type="time"
            required
            value={form.bookingTime}
            onChange={handleChange('bookingTime')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-white/60">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={handleChange('notes')}
          rows={3}
          placeholder="Allergies, special occasion, seating preference…"
          className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-gold py-4 text-sm font-semibold text-brand-dark hover:brightness-110 transition disabled:opacity-60"
      >
        {submitting ? 'Booking…' : 'Book Table'}
      </button>

      {!user && (
        <p className="text-center text-xs text-white/40">
          Booking as a guest — no account required.
        </p>
      )}
    </form>
  );
}