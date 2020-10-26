const AuthorizationError = require('./authError');
const NotFoundError = require('./notFoundError');
const ValidationError = require('./validationError');
const ForbiddenError = require('./forbiddenError');
const ConflictingError = require('./conflictingError');

module.exports = {
  AuthorizationError, NotFoundError, ValidationError, ForbiddenError, ConflictingError,
};
