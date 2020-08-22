const routes = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { NotFoundError } = require('../errors/errors');
const limiter = require('../middlewares/rateLimiter');
const { login, signUp } = require('../controllers/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const auth = require('../middlewares/auth');

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use(helmet());
routes.use(cookieParser());
routes.use(limiter);

routes.use(requestLogger);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), signUp);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/articles', require('./articles'));

routes.use('*', () => {
  throw new NotFoundError('Page not found');
});

routes.use(errorLogger);

routes.use(errors());

routes.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'Server Error' });
  next();
});

module.exports = routes;
