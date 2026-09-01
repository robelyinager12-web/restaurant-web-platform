// File: backend/src/services/menu.service.js
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/apiError');

// ---- Categories ----

async function listCategories() {
  return MenuCategory.findAll();
}

async function createCategory(data) {
  const existing = await MenuCategory.findBySlug(data.slug);
  if (existing) {
    throw new ApiError(409, 'A category with this slug already exists');
  }
  return MenuCategory.create(data);
}

async function updateCategory(id, data) {
  const category = await MenuCategory.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  if (data.slug && data.slug !== category.slug) {
    const clash = await MenuCategory.findBySlug(data.slug);
    if (clash) {
      throw new ApiError(409, 'A category with this slug already exists');
    }
  }
  return MenuCategory.update(id, data);
}

async function deleteCategory(id) {
  const category = await MenuCategory.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  try {
    await MenuCategory.remove(id);
  } catch (err) {
    // FK RESTRICT on menu_items.category_id
    if (err.code === '23503') {
      throw new ApiError(409, 'Cannot delete a category that still has menu items');
    }
    throw err;
  }
}

// ---- Menu items ----

async function listItems(filters) {
  return MenuItem.findAll(filters);
}

async function getItem(id) {
  const item = await MenuItem.findById(id);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }
  return item;
}

async function createItem(data) {
  const category = await MenuCategory.findById(data.categoryId);
  if (!category) {
    throw new ApiError(400, 'categoryId does not reference an existing category');
  }
  return MenuItem.create(data);
}

async function updateItem(id, data) {
  const item = await MenuItem.findById(id);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }
  if (data.categoryId) {
    const category = await MenuCategory.findById(data.categoryId);
    if (!category) {
      throw new ApiError(400, 'categoryId does not reference an existing category');
    }
  }
  return MenuItem.update(id, data);
}

async function deleteItem(id) {
  const item = await MenuItem.findById(id);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }
  try {
    await MenuItem.remove(id);
  } catch (err) {
    // FK RESTRICT on order_items.menu_item_id
    if (err.code === '23503') {
      throw new ApiError(409, 'Cannot delete an item that appears in existing orders — set it unavailable instead');
    }
    throw err;
  }
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};