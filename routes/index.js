const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/articles', require('./articles'));

module.exports = routes;
