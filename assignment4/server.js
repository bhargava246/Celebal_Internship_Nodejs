// server.js - Simple Express.js web server with routing and middleware

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware for request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware for parsing JSON body
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Route 1: Home endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Express.js server!',
    endpoints: [
      { method: 'GET', path: '/', description: 'Home endpoint' },
      { method: 'GET', path: '/api/users', description: 'Get all users' },
      { method: 'POST', path: '/api/users', description: 'Create a new user' },
      { method: 'GET', path: '/api/users/:id', description: 'Get user by ID' }
    ]
  });
});

// Route 2: Get all users
app.get('/api/users', (req, res) => {
  // Mock data - in a real app, this would come from a database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json(users);
});

// Route 3: Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Mock data - in a real app, this would come from a database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});

// Route 4: Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Validate input
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  // In a real app, this would be saved to a database
  const newUser = {
    id: 4, // In a real app, this would be generated
    name,
    email
  };
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});