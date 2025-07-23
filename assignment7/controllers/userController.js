// userController.js - Controller for user routes

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../models/userModel');

// Get all users
const getUsers = (req, res) => {
  try {
    const users = getAllUsers();
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single user
const getUser = (req, res) => {
  try {
    const user = getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update user
const updateUserById = (req, res) => {
  try {
    // Check if user exists
    const user = getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is updating their own profile
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this user'
      });
    }
    
    // Update user
    const updatedUser = updateUser(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete user
const deleteUserById = (req, res) => {
  try {
    // Check if user exists
    const user = getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is deleting their own profile
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this user'
      });
    }
    
    // Delete user
    const deleted = deleteUser(req.params.id);
    
    if (!deleted) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete user'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUserById,
  deleteUserById
};