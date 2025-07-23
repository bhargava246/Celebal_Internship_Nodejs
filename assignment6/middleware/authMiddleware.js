// middleware/authMiddleware.js - Middleware for JWT authentication

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in the Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token
      const user = User.getById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }
      
      // Add user to request object
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};