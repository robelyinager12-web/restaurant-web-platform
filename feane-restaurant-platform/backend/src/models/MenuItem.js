// File: backend/src/models/MenuItem.js
const { query } = require('../config/database');

async function findAll({ categorySlug, availableOnly } = {}) {
  const conditions = [];
  const values = [];
  let i = 1;

  let sql = `
    SELECT mi.*, mc.name AS category_name, mc.slug AS category_slug
    FROM menu_items mi
    JOIN menu_categories mc ON mc.id = mi.category_id
  `;

  if (categorySlug) {
    conditions.push(`mc.slug = $${i++}`);
    values.push(categorySlug);
  }
  if (availableOnly) {
    conditions.push(`mi.is_available = TRUE`);
  }
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }
  sql += ' ORDER BY mc.display_order ASC, mi.name ASC';

  const { rows } = await query(sql, values);
  return rows;
}

async function findById(id) {
  const { rows } = await query(
    `SELECT mi.*, mc.name AS category_name, mc.slug AS category_slug
     FROM menu_items mi
     JOIN menu_categories mc ON mc.id = mi.category_id
     WHERE mi.id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function create({ categoryId, name, description, price, imageUrl, isAvailable }) {
  const { rows } = await query(
    `INSERT INTO menu_items (category_id, name, description, price, image_url, is_available)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [categoryId, name, description || null, price, imageUrl || null, isAvailable]
  );
  return rows[0];
}

async function update(id, fields) {
  const map = {
    categoryId: 'category_id',
    name: 'name',
    description: 'description',
    price: 'price',
    imageUrl: 'image_url',
    isAvailable: 'is_available',
  };

  const columns = [];
  const values = [];
  let i = 1;

  for (const [key, column] of Object.entries(map)) {
    if (fields[key] !== undefined) {
      columns.push(`${column} = $${i++}`);
      values.push(fields[key]);
    }
  }

  if (columns.length === 0) return findById(id);

  values.push(id);
  const { rows } = await query(
    `UPDATE menu_items SET ${columns.join(', ')} WHERE id = $${i} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await query('DELETE FROM menu_items WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };