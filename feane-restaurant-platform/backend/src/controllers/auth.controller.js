// File: backend/src/controllers/auth.controller.js
const authService = require('../services/auth.service');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  apiResponse(res, 201, { user, token }, 'Account created successfully');
});

const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  apiResponse(res, 200, { user, token }, 'Logged in successfully');
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  apiResponse(res, 200, { user });
});

module.exports = { register, login, me };