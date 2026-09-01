// File: backend/src/routes/menu.routes.js
const express = require('express');
const menuController = require('../controllers/menu.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const validateQuery = require('../middlewares/validateQuery.middleware');
const {
  createCategorySchema,
  updateCategorySchema,
  createMenuItemSchema,
  updateMenuItemSchema,
  listMenuItemsQuerySchema,
} = require('../validators/menu.validator');

const router = express.Router();

// ---- Public browsing ----
router.get('/categories', menuController.listCategories);
router.get('/items', validateQuery(listMenuItemsQuerySchema), menuController.listItems);
router.get('/items/:id', menuController.getItem);

// ---- Admin-only management ----
router.post(
  '/categories',
  authMiddleware,
  requireRole('admin'),
  validate(createCategorySchema),
  menuController.createCategory
);
router.put(
  '/categories/:id',
  authMiddleware,
  requireRole('admin'),
  validate(updateCategorySchema),
  menuController.updateCategory
);
router.delete(
  '/categories/:id',
  authMiddleware,
  requireRole('admin'),
  menuController.deleteCategory
);

router.post(
  '/items',
  authMiddleware,
  requireRole('admin'),
  validate(createMenuItemSchema),
  menuController.createItem
);
router.put(
  '/items/:id',
  authMiddleware,
  requireRole('admin'),
  validate(updateMenuItemSchema),
  menuController.updateItem
);
router.delete(
  '/items/:id',
  authMiddleware,
  requireRole('admin'),
  menuController.deleteItem
);

module.exports = router;