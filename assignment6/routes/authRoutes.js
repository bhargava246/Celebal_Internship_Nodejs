// routes/authRoutes.js - Routes for authentication

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register and login routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route - Get current user
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;