// File: frontend/src/lib/orders.ts
import { apiClient } from './api-client';
import type { Order, CreateOrderPayload } from '../types/order';

export function createOrder(payload: CreateOrderPayload) {
  return apiClient.post<{ order: Order }>('/orders', payload);
}

export function getOrder(id: string) {
  return apiClient.get<{ order: Order }>(`/orders/${id}`);
}

export function getMyOrders() {
  return apiClient.get<{ orders: Order[] }>('/orders/mine');
}