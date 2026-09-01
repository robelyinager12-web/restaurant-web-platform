// File: backend/src/services/booking.service.js
const Booking = require('../models/Booking');
const ApiError = require('../utils/apiError');

// Simple capacity guard — no seat-map modeling, just a per-slot ceiling.
// Tune these to the restaurant's real capacity.
const MAX_GUESTS_PER_SLOT = 40;
const MAX_BOOKINGS_PER_SLOT = 15;

function isInThePast(bookingDate, bookingTime) {
  const slot = new Date(`${bookingDate}T${bookingTime}:00`);
  return slot.getTime() < Date.now();
}

async function createBooking(userId, data) {
  if (isInThePast(data.bookingDate, data.bookingTime)) {
    throw new ApiError(422, 'Booking date/time must be in the future');
  }

  const { totalGuests, totalBookings } = await Booking.countForSlot(
    data.bookingDate,
    data.bookingTime
  );

  if (
    totalBookings + 1 > MAX_BOOKINGS_PER_SLOT ||
    totalGuests + data.partySize > MAX_GUESTS_PER_SLOT
  ) {
    throw new ApiError(409, 'This time slot is fully booked — please choose a different time');
  }

  return Booking.create({ userId, ...data });
}

async function getBooking(bookingId, requestingUser) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  const isOwner = requestingUser && booking.user_id === requestingUser.id;
  const isAdmin = requestingUser && requestingUser.role === 'admin';
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You do not have permission to view this booking');
  }
  return booking;
}

async function listMyBookings(userId) {
  return Booking.findByUser(userId);
}

async function listAllBookings(filters) {
  return Booking.findAll(filters);
}

async function updateBookingStatus(bookingId, status) {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  if (booking.status === 'completed') {
    throw new ApiError(409, 'A completed booking cannot be changed');
  }
  return Booking.updateStatus(bookingId, status);
}

module.exports = {
  createBooking,
  getBooking,
  listMyBookings,
  listAllBookings,
  updateBookingStatus,
};