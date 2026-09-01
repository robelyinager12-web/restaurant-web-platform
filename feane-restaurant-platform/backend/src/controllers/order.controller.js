// File: backend/src/controllers/order.controller.js
const orderService = require('../services/order.service');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  apiResponse(res, 201, { order }, 'Order placed successfully');
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await orderService.getOrder(req.params.id, req.user);
  apiResponse(res, 200, { order });
});

const listMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listMyOrders(req.user.id);
  apiResponse(res, 200, { orders });
});

const listAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listAllOrders(req.validatedQuery);
  apiResponse(res, 200, { orders });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  apiResponse(res, 200, { order }, 'Order status updated');
});

module.exports = { createOrder, getOrder, listMyOrders, listAllOrders, updateOrderStatus };