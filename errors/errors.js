const AuthorizationError = require('./authError');
const NotFoundError = require('./notFoundError');
const ValidationError = require('./validationError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  AuthorizationError, NotFoundError, ValidationError, ForbiddenError,
};
