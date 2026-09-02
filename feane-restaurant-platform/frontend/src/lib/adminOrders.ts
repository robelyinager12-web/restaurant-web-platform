// File: frontend/src/lib/adminOrders.ts
import { apiClient } from './api-client';
import type { Order } from '../types/order';

export function getAllOrders(status?: Order['status']) {
  const qs = status ? `?status=${status}` : '';
  return apiClient.get<{ orders: Order[] }>(`/orders${qs}`);
}

export function updateOrderStatus(id: string, status: Order['status']) {
  return apiClient.patch<{ order: Order }>(`/orders/${id}/status`, { status });
}