// File: backend/src/validators/order.validator.js
const { z } = require('zod');

const orderItemSchema = z.object({
  menuItemId: z.string().uuid(),
  quantity: z.number().int().positive().max(50),
});

const createOrderSchema = z
  .object({
    items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
    orderType: z.enum(['delivery', 'pickup']),
    deliveryAddress: z.string().trim().max(500).optional(),
    contactPhone: z.string().trim().min(5).max(30),
    notes: z.string().trim().max(1000).optional(),
  })
  .refine((data) => data.orderType !== 'delivery' || !!data.deliveryAddress, {
    message: 'deliveryAddress is required when orderType is delivery',
    path: ['deliveryAddress'],
  });

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
});

const listOrdersQuerySchema = z.object({
  status: z
    .enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'])
    .optional(),
});

module.exports = { createOrderSchema, updateOrderStatusSchema, listOrdersQuerySchema };