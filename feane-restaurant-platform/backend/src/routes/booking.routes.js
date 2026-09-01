// File: backend/src/routes/booking.routes.js
const express = require('express');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const optionalAuth = require('../middlewares/optionalAuth.middleware');
const requireRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const validateQuery = require('../middlewares/validateQuery.middleware');
const {
  createBookingSchema,
  updateBookingStatusSchema,
  listBookingsQuerySchema,
} = require('../validators/booking.validator');

const router = express.Router();

// Guests can book a table; logged-in users get it linked to their account.
router.post('/', optionalAuth, validate(createBookingSchema), bookingController.createBooking);

// Logged-in customer's own bookings.
router.get('/mine', authMiddleware, bookingController.listMyBookings);

// Single booking — owner or admin (checked in the service layer).
router.get('/:id', optionalAuth, bookingController.getBooking);

// Admin-only management.
router.get(
  '/',
  authMiddleware,
  requireRole('admin'),
  validateQuery(listBookingsQuerySchema),
  bookingController.listAllBookings
);
router.patch(
  '/:id/status',
  authMiddleware,
  requireRole('admin'),
  validate(updateBookingStatusSchema),
  bookingController.updateBookingStatus
);

module.exports = router;