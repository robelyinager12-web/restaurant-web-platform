// File: frontend/src/components/admin/OrderStatusBadge.tsx
import type { Order } from '../../types/order';

const STYLES: Record<Order['status'], string> = {
  pending: 'bg-white/10 text-white/70',
  confirmed: 'bg-blue-500/20 text-blue-300',
  preparing: 'bg-brand-gold/20 text-brand-gold',
  ready: 'bg-green-500/20 text-green-300',
  completed: 'bg-white/10 text-white/40',
  cancelled: 'bg-red-500/20 text-red-300',
};

export function OrderStatusBadge({ status }: { status: Order['status'] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${STYLES[status]}`}>
      {status}
    </span>
  );
}