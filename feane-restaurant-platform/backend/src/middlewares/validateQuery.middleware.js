// File: backend/src/middlewares/validateQuery.middleware.js
// Separate from validate.middleware.js because query params need req.query,
// not req.body, and should merge into a typed object rather than replace it.
const ApiError = require('../utils/apiError');

function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return next(new ApiError(422, 'Invalid query parameters', result.error.flatten()));
    }
    req.validatedQuery = result.data;
    next();
  };
}

module.exports = validateQuery;