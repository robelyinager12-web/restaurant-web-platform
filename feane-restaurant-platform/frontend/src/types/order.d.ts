// File: frontend/src/types/order.d.ts
export interface OrderItemLine {
  menu_item_id: string;
  item_name: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  order_type: 'delivery' | 'pickup';
  total_amount: string;
  delivery_address: string | null;
  contact_phone: string;
  notes: string | null;
  created_at: string;
  items?: OrderItemLine[];
}

export interface CreateOrderPayload {
  items: { menuItemId: string; quantity: number }[];
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  contactPhone: string;
  notes?: string;
}