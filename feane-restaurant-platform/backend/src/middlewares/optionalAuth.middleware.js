// File: backend/src/middlewares/optionalAuth.middleware.js
// Attaches req.user if a valid token is present, but does NOT reject the
// request if it's missing — bookings are allowed as a guest.
const { verifyToken } = require('../utils/jwt');

function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    const token = header.split(' ')[1];
    try {
      req.user = verifyToken(token);
    } catch (err) {
      // Invalid/expired token on an optional-auth route: proceed as guest
      // rather than blocking the request.
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

module.exports = optionalAuth;