const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { ValidationError, AuthorizationError, ConflictingError } = require('../errors/errors');

const { JWT_SECRET } = require('../config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const WEEK = 3600000 * 24 * 7;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: WEEK,
        httpOnly: true,
        sameSite: 'lax',
      })
        .send({ token })
        .end();
    })
    .catch(() => {
      next(new AuthorizationError('Authorization error'));
    });
};

module.exports.signUp = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        next(new ConflictingError('This email already exists'));
      }
    })
    .then(() => {
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
              next(new ValidationError('Invalid input'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};
