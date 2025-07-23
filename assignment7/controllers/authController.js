// authController.js - Controller for authentication routes

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/userModel');

// Register a new user
const register = async (req, res) => {
  try {
    // Create user in database
    const user = await createUser(req.body);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Return user data and token
    res.status(201).json({
      success: true,
      token,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }
    
    // Check if user exists
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Return user data without password and token
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      token,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get current user
const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

module.exports = {
  register,
  login,
  getMe
};