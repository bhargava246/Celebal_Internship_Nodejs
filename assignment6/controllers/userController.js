// controllers/userController.js - Controller for User CRUD operations

const User = require('../models/userModel');

// Get all users
exports.getAllUsers = (req, res) => {
  try {
    const users = User.getAll();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  try {
    const user = User.getById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User not found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Create a new user
exports.createUser = (req, res) => {
  try {
    // Validate required fields
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name and email'
      });
    }
    
    const user = User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Update a user
exports.updateUser = (req, res) => {
  try {
    const user = User.update(req.params.id, req.body);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User not found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Delete a user
exports.deleteUser = (req, res) => {
  try {
    const user = User.delete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User not found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};