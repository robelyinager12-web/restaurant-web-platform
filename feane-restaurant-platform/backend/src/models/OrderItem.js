// File: backend/src/models/OrderItem.js

async function createMany(runner, orderId, items) {
  // items: [{ menuItemId, quantity, unitPrice, subtotal }]
  const inserted = [];
  for (const item of items) {
    const { rows } = await runner.query(
      `INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [orderId, item.menuItemId, item.quantity, item.unitPrice, item.subtotal]
    );
    inserted.push(rows[0]);
  }
  return inserted;
}

module.exports = { createMany };