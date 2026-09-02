// File: frontend/src/components/admin/OrderRow.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { updateOrderStatus } from '../../lib/adminOrders';
import { apiClient } from '../../lib/api-client';
import type { Order, OrderItemLine } from '../../types/order';

const NEXT_STATUS: Record<Order['status'], Order['status'][]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['completed'],
  completed: [],
  cancelled: [],
};

interface Props {
  order: Order;
  onChange: () => void;
}

export function OrderRow({ order, onChange }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<OrderItemLine[] | null>(order.items ?? null);
  const [updating, setUpdating] = useState(false);

  const toggleExpand = async () => {
    setExpanded((prev) => !prev);
    if (!items) {
      const { order: fullOrder } = await apiClient.get<{ order: Order }>(`/orders/${order.id}`);
      setItems(fullOrder.items ?? []);
    }
  };

  const handleStatusChange = async (status: Order['status']) => {
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, status);
      onChange();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not update order status');
    } finally {
      setUpdating(false);
    }
  };

  const nextOptions = NEXT_STATUS[order.status];

  return (
    <div className="border-b border-white/10">
      <div className="flex items-center gap-4 py-4">
        <button onClick={toggleExpand} className="text-white/40 hover:text-white">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <div className="flex-1">
          <p className="text-sm text-white">#{order.id.slice(0, 8)}</p>
          <p className="text-xs text-white/40">
            {new Date(order.created_at).toLocaleString()} · {order.order_type}
          </p>
        </div>

        <span className="w-20 text-right text-sm font-semibold text-brand-gold">
          ${Number(order.total_amount).toFixed(2)}
        </span>

        <OrderStatusBadge status={order.status} />

        {nextOptions.length > 0 && (
          <select
            disabled={updating}
            defaultValue=""
            onChange={(e) => e.target.value && handleStatusChange(e.target.value as Order['status'])}
            className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white outline-none ring-1 ring-white/10"
          >
            <option value="" className="bg-brand-dark">Update…</option>
            {nextOptions.map((status) => (
              <option key={status} value={status} className="bg-brand-dark capitalize">
                {status}
              </option>
            ))}
          </select>
        )}
      </div>

      {expanded && (
        <div className="ml-8 mb-4 rounded-lg bg-white/5 p-4 text-sm">
          <p className="text-white/50">Contact: {order.contact_phone}</p>
          {order.delivery_address && <p className="text-white/50">Deliver to: {order.delivery_address}</p>}
          {order.notes && <p className="mt-1 text-white/50">Notes: {order.notes}</p>}
          <div className="mt-3 space-y-1 border-t border-white/10 pt-3">
            {items === null ? (
              <p className="text-white/40">Loading items…</p>
            ) : (
              items.map((line) => (
                <div key={line.menu_item_id} className="flex justify-between text-white/70">
                  <span>{line.quantity} × {line.item_name}</span>
                  <span>${Number(line.subtotal).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}