// File: backend/src/models/Booking.js
const { query } = require('../config/database');

async function create({ userId, name, email, phone, partySize, bookingDate, bookingTime, notes }) {
  const { rows } = await query(
    `INSERT INTO bookings (user_id, name, email, phone, party_size, booking_date, booking_time, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId || null, name, email, phone, partySize, bookingDate, bookingTime, notes || null]
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await query('SELECT * FROM bookings WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findByUser(userId) {
  const { rows } = await query(
    'SELECT * FROM bookings WHERE user_id = $1 ORDER BY booking_date DESC, booking_time DESC',
    [userId]
  );
  return rows;
}

async function findAll({ date, status } = {}) {
  const conditions = [];
  const values = [];
  let i = 1;

  if (date) { conditions.push(`booking_date = $${i++}`); values.push(date); }
  if (status) { conditions.push(`status = $${i++}`); values.push(status); }

  let sql = 'SELECT * FROM bookings';
  if (conditions.length > 0) sql += ` WHERE ${conditions.join(' AND ')}`;
  sql += ' ORDER BY booking_date ASC, booking_time ASC';

  const { rows } = await query(sql, values);
  return rows;
}

async function updateStatus(id, status) {
  const { rows } = await query(
    'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0] || null;
}

async function countForSlot(bookingDate, bookingTime) {
  const { rows } = await query(
    `SELECT COALESCE(SUM(party_size), 0) AS total_guests, COUNT(*) AS total_bookings
     FROM bookings
     WHERE booking_date = $1 AND booking_time = $2 AND status != 'cancelled'`,
    [bookingDate, bookingTime]
  );
  return { totalGuests: Number(rows[0].total_guests), totalBookings: Number(rows[0].total_bookings) };
}

module.exports = { create, findById, findByUser, findAll, updateStatus, countForSlot };