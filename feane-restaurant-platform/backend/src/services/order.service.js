// File: backend/src/services/order.service.js
const { withTransaction } = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/apiError');

const TERMINAL_STATUSES = ['completed', 'cancelled'];

async function createOrder(userId, { items, orderType, deliveryAddress, contactPhone, notes }) {
  // Look up every requested menu item to get its REAL current price and
  // availability. Never trust a price sent from the client.
  const menuItems = await Promise.all(items.map((i) => MenuItem.findById(i.menuItemId)));

  const lineItems = items.map((requested, idx) => {
    const menuItem = menuItems[idx];
    if (!menuItem) {
      throw new ApiError(400, `Menu item ${requested.menuItemId} does not exist`);
    }
    if (!menuItem.is_available) {
      throw new ApiError(409, `"${menuItem.name}" is currently unavailable`);
    }
    const unitPrice = Number(menuItem.price);
    const subtotal = Number((unitPrice * requested.quantity).toFixed(2));
    return {
      menuItemId: menuItem.id,
      quantity: requested.quantity,
      unitPrice,
      subtotal,
      name: menuItem.name,
    };
  });

  const totalAmount = Number(
    lineItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );

  const order = await withTransaction(async (client) => {
    const createdOrder = await Order.create(client, {
      userId,
      orderType,
      deliveryAddress,
      contactPhone,
      notes,
      totalAmount,
    });
    await OrderItem.createMany(client, createdOrder.id, lineItems);
    return createdOrder;
  });

  return { ...order, items: lineItems };
}

async function getOrder(orderId, requestingUser) {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  if (requestingUser.role !== 'admin' && order.user_id !== requestingUser.id) {
    throw new ApiError(403, 'You do not have permission to view this order');
  }
  const items = await Order.findItemsByOrderId(orderId);
  return { ...order, items };
}

async function listMyOrders(userId) {
  return Order.findByUser(userId);
}

async function listAllOrders(filters) {
  return Order.findAll(filters);
}

async function updateOrderStatus(orderId, status) {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  if (TERMINAL_STATUSES.includes(order.status)) {
    throw new ApiError(409, `Order is already ${order.status} and cannot be changed`);
  }
  return Order.updateStatus(orderId, status);
}

module.exports = { createOrder, getOrder, listMyOrders, listAllOrders, updateOrderStatus };