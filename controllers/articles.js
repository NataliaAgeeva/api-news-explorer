const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.json({ data: article }))
    .catch((err) => next(err.message));
};

module.exports.postArticles = () => {

};
