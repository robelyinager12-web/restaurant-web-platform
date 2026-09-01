// File: backend/src/validators/booking.validator.js
const { z } = require('zod');

// Basic YYYY-MM-DD / HH:MM checks — Postgres will do the real validation,
// this just catches obviously malformed input before it hits the DB.
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const createBookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5).max(30),
  partySize: z.number().int().positive().max(50),
  bookingDate: z.string().regex(dateRegex, 'bookingDate must be in YYYY-MM-DD format'),
  bookingTime: z.string().regex(timeRegex, 'bookingTime must be in HH:MM (24h) format'),
  notes: z.string().trim().max(1000).optional(),
});

const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
});

const listBookingsQuerySchema = z.object({
  date: z.string().regex(dateRegex).optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
});

module.exports = { createBookingSchema, updateBookingStatusSchema, listBookingsQuerySchema };