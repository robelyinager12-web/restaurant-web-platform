// File: backend/src/models/Order.js
const { query } = require('../config/database');

// `runner` is either the pool (query fn) or a transaction client — both
// expose a .query()-compatible interface, so the model doesn't care which.

async function create(runner, { userId, orderType, deliveryAddress, contactPhone, notes, totalAmount }) {
  const { rows } = await runner.query(
    `INSERT INTO orders (user_id, order_type, delivery_address, contact_phone, notes, total_amount)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, orderType, deliveryAddress || null, contactPhone, notes || null, totalAmount]
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findItemsByOrderId(orderId) {
  const { rows } = await query(
    `SELECT oi.*, mi.name AS item_name
     FROM order_items oi
     JOIN menu_items mi ON mi.id = oi.menu_item_id
     WHERE oi.order_id = $1
     ORDER BY oi.created_at ASC`,
    [orderId]
  );
  return rows;
}

async function findByUser(userId) {
  const { rows } = await query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

async function findAll({ status } = {}) {
  if (status) {
    const { rows } = await query(
      'SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC',
      [status]
    );
    return rows;
  }
  const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
  return rows;
}

async function updateStatus(id, status) {
  const { rows } = await query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0] || null;
}

module.exports = { create, findById, findItemsByOrderId, findByUser, findAll, updateStatus };