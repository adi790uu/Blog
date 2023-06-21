const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const {
  postLike,
  postComment,
  postFavorite,
  removeLike,
} = require('../controllers/feedback');

router.use(validateToken);

router.route('/like/:postId').post(postLike);
router.route('/removeLike/:postId').post(removeLike);
router.route('/comment/:postId').post(postComment);
router.route('/favorite/:postId').post(postFavorite);

module.exports = router;
