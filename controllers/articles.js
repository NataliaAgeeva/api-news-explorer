const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors/errors');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.json({ data: article }))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, source, link, image, date,
  } = req.body;

  Article.create({
    keyword, title, text, source, link, image, date, owner: req.user._id,
  })
    .then((card) => res.status(201).json({ data: card }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Article not found'))
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        return Article.deleteOne(article)
          .then(() => {
            res.json({ message: 'Article has been deleted' });
          })
          .catch(next);
      }
      return next(new ForbiddenError('Action forbidden'));
    })
    .catch(next);
};
