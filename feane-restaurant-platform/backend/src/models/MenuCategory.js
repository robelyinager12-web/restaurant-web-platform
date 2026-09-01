// File: backend/src/models/MenuCategory.js
const { query } = require('../config/database');

async function findAll() {
  const { rows } = await query(
    'SELECT * FROM menu_categories ORDER BY display_order ASC, name ASC'
  );
  return rows;
}

async function findById(id) {
  const { rows } = await query('SELECT * FROM menu_categories WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findBySlug(slug) {
  const { rows } = await query('SELECT * FROM menu_categories WHERE slug = $1', [slug]);
  return rows[0] || null;
}

async function create({ name, slug, displayOrder }) {
  const { rows } = await query(
    `INSERT INTO menu_categories (name, slug, display_order)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, slug, displayOrder]
  );
  return rows[0];
}

async function update(id, fields) {
  const columns = [];
  const values = [];
  let i = 1;

  if (fields.name !== undefined) { columns.push(`name = $${i++}`); values.push(fields.name); }
  if (fields.slug !== undefined) { columns.push(`slug = $${i++}`); values.push(fields.slug); }
  if (fields.displayOrder !== undefined) { columns.push(`display_order = $${i++}`); values.push(fields.displayOrder); }

  if (columns.length === 0) return findById(id);

  values.push(id);
  const { rows } = await query(
    `UPDATE menu_categories SET ${columns.join(', ')} WHERE id = $${i} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await query('DELETE FROM menu_categories WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, findBySlug, create, update, remove };