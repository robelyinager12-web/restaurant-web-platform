// File: frontend/src/lib/bookings.ts
import { apiClient } from './api-client';
import type { Booking, CreateBookingPayload } from '../types/booking';

export function createBooking(payload: CreateBookingPayload) {
  return apiClient.post<{ booking: Booking }>('/bookings', payload);
}

export function getBooking(id: string) {
  return apiClient.get<{ booking: Booking }>(`/bookings/${id}`);
}

export function getMyBookings() {
  return apiClient.get<{ bookings: Booking[] }>('/bookings/mine');
}