// File: backend/src/validators/menu.validator.js
const { z } = require('zod');

const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  displayOrder: z.number().int().min(0).optional().default(0),
});

const updateCategorySchema = createCategorySchema.partial();

const createMenuItemSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().trim().min(2).max(150),
  description: z.string().trim().max(2000).optional(),
  price: z.number().positive().max(100000),
  imageUrl: z.string().trim().url().optional(),
  isAvailable: z.boolean().optional().default(true),
});

const updateMenuItemSchema = createMenuItemSchema.partial();

const listMenuItemsQuerySchema = z.object({
  categorySlug: z.string().trim().optional(),
  availableOnly: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => v === 'true'),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  createMenuItemSchema,
  updateMenuItemSchema,
  listMenuItemsQuerySchema,
};