// File: backend/src/middlewares/auth.middleware.js
const { verifyToken } = require('../utils/jwt');
const ApiError = require('../utils/apiError');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const token = header.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = payload; // { id, role, email }
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
}

module.exports = authMiddleware;