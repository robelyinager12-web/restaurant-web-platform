// File: frontend/src/lib/adminBookings.ts
import { apiClient } from './api-client';
import type { Booking } from '../types/booking';

export function getAllBookings(filters?: { date?: string; status?: Booking['status'] }) {
  const params = new URLSearchParams();
  if (filters?.date) params.set('date', filters.date);
  if (filters?.status) params.set('status', filters.status);
  const qs = params.toString();
  return apiClient.get<{ bookings: Booking[] }>(`/bookings${qs ? `?${qs}` : ''}`);
}

export function updateBookingStatus(id: string, status: Booking['status']) {
  return apiClient.patch<{ booking: Booking }>(`/bookings/${id}/status`, { status });
}