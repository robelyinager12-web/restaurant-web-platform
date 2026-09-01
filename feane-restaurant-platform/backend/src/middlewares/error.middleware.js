// File: backend/src/middlewares/error.middleware.js
const ApiError = require('../utils/apiError');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || undefined,
    });
  }

  // Postgres unique violation (e.g. duplicate email)
  if (err.code === '23505') {
    return res.status(409).json({ success: false, message: 'Resource already exists' });
  }

  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal server error' });
}

module.exports = errorMiddleware;