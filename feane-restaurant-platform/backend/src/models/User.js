// File: backend/src/models/User.js
const { query } = require('../config/database');

async function findByEmail(email) {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await query(
    'SELECT id, name, email, phone, role, is_active, created_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function create({ name, email, passwordHash, phone, role = 'customer' }) {
  const { rows } = await query(
    `INSERT INTO users (name, email, password_hash, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role, created_at`,
    [name, email, passwordHash, phone || null, role]
  );
  return rows[0];
}

module.exports = { findByEmail, findById, create };