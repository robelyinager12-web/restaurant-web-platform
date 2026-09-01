// File: backend/src/controllers/menu.controller.js
const menuService = require('../services/menu.service');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');

const listCategories = asyncHandler(async (req, res) => {
  const categories = await menuService.listCategories();
  apiResponse(res, 200, { categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await menuService.createCategory(req.body);
  apiResponse(res, 201, { category }, 'Category created');
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await menuService.updateCategory(req.params.id, req.body);
  apiResponse(res, 200, { category }, 'Category updated');
});

const deleteCategory = asyncHandler(async (req, res) => {
  await menuService.deleteCategory(req.params.id);
  apiResponse(res, 200, null, 'Category deleted');
});

const listItems = asyncHandler(async (req, res) => {
  const items = await menuService.listItems(req.validatedQuery);
  apiResponse(res, 200, { items });
});

const getItem = asyncHandler(async (req, res) => {
  const item = await menuService.getItem(req.params.id);
  apiResponse(res, 200, { item });
});

const createItem = asyncHandler(async (req, res) => {
  const item = await menuService.createItem(req.body);
  apiResponse(res, 201, { item }, 'Menu item created');
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await menuService.updateItem(req.params.id, req.body);
  apiResponse(res, 200, { item }, 'Menu item updated');
});

const deleteItem = asyncHandler(async (req, res) => {
  await menuService.deleteItem(req.params.id);
  apiResponse(res, 200, null, 'Menu item deleted');
});

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