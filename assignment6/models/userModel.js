// models/userModel.js - Model for User resource

class User {
  constructor(id, name, email, age, location, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.location = location;
    this.password = password;
  }
}

// In-memory database for users
let users = [
  new User(1, 'John Doe', 'john@example.com', 28, 'New York'),
  new User(2, 'Jane Smith', 'jane@example.com', 32, 'Los Angeles'),
  new User(3, 'Bob Johnson', 'bob@example.com', 45, 'Chicago')
];

// Get all users
exports.getAll = () => {
  return users;
};

// Get user by ID
exports.getById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Create a new user
exports.create = (userData) => {
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  const newUser = new User(
    newId,
    userData.name,
    userData.email,
    userData.age,
    userData.location,
    userData.password
  );
  users.push(newUser);
  return newUser;
};

// Update a user
exports.update = (id, userData) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) return null;
  
  const updatedUser = { ...users[index] };
  
  // Update only the provided fields
  if (userData.name) updatedUser.name = userData.name;
  if (userData.email) updatedUser.email = userData.email;
  if (userData.age) updatedUser.age = userData.age;
  if (userData.location) updatedUser.location = userData.location;
  
  users[index] = updatedUser;
  return updatedUser;
};

// Delete a user
exports.delete = (id) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) return null;
  
  const deletedUser = users[index];
  users = users.filter(user => user.id !== parseInt(id));
  return deletedUser;
};