const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  getAllPosts,
  publishPost,
  getPost,
  getSearchedResult,
  updatePost,
  deletePost,
} = require('../controllers/posts');

router.use(validateToken);
router.route('/search').get(getSearchedResult);
router.route('/').get(getAllPosts).post(publishPost);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
