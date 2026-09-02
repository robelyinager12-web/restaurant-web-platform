// File: frontend/src/types/booking.d.ts
export interface Booking {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  party_size: number;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  created_at: string;
}

export interface CreateBookingPayload {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  notes?: string;
}