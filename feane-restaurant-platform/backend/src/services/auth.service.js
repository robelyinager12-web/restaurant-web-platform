// File: backend/src/services/auth.service.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const ApiError = require('../utils/apiError');

async function register({ name, email, password, phone }) {
  const existing = await User.findByEmail(email);
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash, phone });

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return { user, token };
}

async function login({ email, password }) {
  const user = await User.findByEmail(email);
  if (!user || !user.is_active) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const match = await comparePassword(password, user.password_hash);
  if (!match) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  const { password_hash, ...safeUser } = user;
  return { user: safeUser, token };
}

module.exports = { register, login };