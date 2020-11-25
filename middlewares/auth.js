const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/errors');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Authorization required'));
  }
  const token = req.cookies.jwt || authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError('Authorization required'));
  }
  req.user = payload;
  return next();
};
