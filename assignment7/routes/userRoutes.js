// userRoutes.js - Routes for user management

const express = require('express');
const {
  getUsers,
  getUser,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all user routes with JWT authentication
router.use(authenticateToken);

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Update user
router.put('/:id', updateUserById);

// Delete user
router.delete('/:id', deleteUserById);

module.exports = router;