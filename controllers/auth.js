const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  ServerError, ValidationError,
} = require('../errors/errors');
const { AuthorizationError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      const error = new AuthorizationError(err.message);
      next(error);
    });
};

module.exports.signUp = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  if (!req.body.password || req.body.password.length < 8) {
    next(new ValidationError('Invalid password'));
  } else {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        email, password: hash, name,
      }))
      .then(() => res.status(201).json({
        email, name,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError(err.message));
        } else {
          next(new ServerError(err.message));
        }
      });
  }
};
