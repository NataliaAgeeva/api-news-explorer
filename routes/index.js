const routes = require('express').Router();
const { NotFoundError } = require('../errors/errors');

routes.use('/users', require('./users'));
routes.use('/articles', require('./articles'));

routes.use('*', () => {
  throw new NotFoundError('Page not found');
});

module.exports = routes;
