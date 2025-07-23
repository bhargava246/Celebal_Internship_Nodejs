const express = require('express');
const {
  getComments,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getComments)
  .post(protect, addComment);

router
  .route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;