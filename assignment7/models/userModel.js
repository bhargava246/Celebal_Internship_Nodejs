// userModel.js - User model for the RESTful API

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// In-memory database for users
let users = [];

// Create a new user
const createUser = async (userData) => {
  // Check if user with the same email already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Create new user object
  const newUser = {
    id: uuidv4(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    age: userData.age || null,
    location: userData.location || null,
    createdAt: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Get all users
const getAllUsers = () => {
  // Return users without passwords
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

// Get user by ID
const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (!user) return null;
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Get user by email (with password for authentication)
const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Update user
const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  // Update user data
  users[index] = {
    ...users[index],
    name: userData.name || users[index].name,
    email: userData.email || users[index].email,
    age: userData.age !== undefined ? userData.age : users[index].age,
    location: userData.location !== undefined ? userData.location : users[index].location,
    updatedAt: new Date().toISOString()
  };
  
  // Return updated user without password
  const { password, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
};

// Delete user
const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};