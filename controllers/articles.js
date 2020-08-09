const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/errors');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.json({ data: article }))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((card) => res.status(201).json({ data: card }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Article not found'))
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        res.json('Article has been deleted');
      } else {
        next(new ForbiddenError('Action forbidden'));
      }
    })
    .catch(next);
};
