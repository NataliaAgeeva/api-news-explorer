const User = require('../models/user');
const { NotFoundError } = require('../errors/errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => res.json({ data: user }))
    .catch(next);
};
