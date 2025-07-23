// routes/userRoutes.js - Routes for User CRUD operations

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route for getting all users and creating a new user
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Route for getting, updating, and deleting a user by ID
router
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;