// File: backend/src/controllers/booking.controller.js
const bookingService = require('../services/booking.service');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');

const createBooking = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const booking = await bookingService.createBooking(userId, req.body);
  apiResponse(res, 201, { booking }, 'Table booked successfully');
});

const getBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBooking(req.params.id, req.user);
  apiResponse(res, 200, { booking });
});

const listMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.listMyBookings(req.user.id);
  apiResponse(res, 200, { bookings });
});

const listAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.listAllBookings(req.validatedQuery);
  apiResponse(res, 200, { bookings });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
  apiResponse(res, 200, { booking }, 'Booking status updated');
});

module.exports = {
  createBooking,
  getBooking,
  listMyBookings,
  listAllBookings,
  updateBookingStatus,
};