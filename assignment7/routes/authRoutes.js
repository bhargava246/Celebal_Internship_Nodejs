// authRoutes.js - Routes for authentication

const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (protected route)
router.get('/me', authenticateToken, getMe);

module.exports = router;