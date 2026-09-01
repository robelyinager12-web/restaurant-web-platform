// File: backend/src/routes/order.routes.js
const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const validateQuery = require('../middlewares/validateQuery.middleware');
const {
  createOrderSchema,
  updateOrderStatusSchema,
  listOrdersQuerySchema,
} = require('../validators/order.validator');

const router = express.Router();

// All order routes require a logged-in user.
router.use(authMiddleware);

router.post('/', validate(createOrderSchema), orderController.createOrder);
router.get('/mine', orderController.listMyOrders);
router.get('/:id', orderController.getOrder);

// Admin-only
router.get(
  '/',
  requireRole('admin'),
  validateQuery(listOrdersQuerySchema),
  orderController.listAllOrders
);
router.patch(
  '/:id/status',
  requireRole('admin'),
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

module.exports = router;