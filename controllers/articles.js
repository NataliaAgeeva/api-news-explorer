const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.json({ data: article }))
    .catch((err) => next(err.message));
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((card) => res.status(201).json({ data: card }))
    .catch((err) => err.message);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.articleId, owner: req.user._id })
    .orFail(() => new Error('Article not found'))
    .then(() => {
      res.json('Article has been deleted');
    })
    .catch((err) => err.message);
};
