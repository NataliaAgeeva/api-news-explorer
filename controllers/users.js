const validator = require('validator');
const User = require('../models/user');
const {
  NotFoundError, ServerError, ValidationError,
} = require('../errors/errors');

module.exports.getUser = (req, res, next) => {
  if (validator.isMongoId(req.user._id)) {
    User.findById(req.user._id)
      .orFail(() => new NotFoundError('User not found'))
      .then((user) => res.json({ data: user }))
      .catch((err) => next(new ServerError(err.message)));
  } else {
    next(new ValidationError('Invalid input data'));
  }
};
