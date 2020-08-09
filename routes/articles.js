const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    source: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      throw new Error('ValidationError');
    }),
    link: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      throw new Error('ValidationError');
    }),
    image: Joi.string().required().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      throw new Error('ValidationError');
    }),
  }),
}), postArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
