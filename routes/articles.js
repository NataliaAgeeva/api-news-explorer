const router = require('express').Router();
const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', postArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
