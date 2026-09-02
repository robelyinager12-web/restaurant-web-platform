// File: frontend/src/components/admin/BookingStatusBadge.tsx
import type { Booking } from '../../types/booking';

const STYLES: Record<Booking['status'], string> = {
  pending: 'bg-white/10 text-white/70',
  confirmed: 'bg-brand-gold/20 text-brand-gold',
  completed: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
};

export function BookingStatusBadge({ status }: { status: Booking['status'] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STYLES[status]}`}>
      {status}
    </span>
  );
}