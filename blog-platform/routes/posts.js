const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Include comments routes
const commentRouter = require('./comments');
router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(getPosts)
  .post(protect, createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;