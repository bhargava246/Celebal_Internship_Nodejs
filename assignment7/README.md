# Assignment 7: RESTful API with JWT Authentication

This assignment implements a RESTful API with JWT (JSON Web Token) authentication to secure routes and protect user data.

## Features

- User registration and login with JWT authentication
- Protected routes that require valid JWT tokens
- User management (CRUD operations)
- Secure password storage with bcrypt hashing
- Token-based authentication for API endpoints

## Technologies Used

- Node.js and Express.js for the backend
- JWT for authentication
- bcrypt for password hashing
- In-memory data storage (for demonstration purposes)

## Project Structure

```
├── controllers/       # Route controllers
│   ├── authController.js  # Authentication controller
│   └── userController.js  # User management controller
├── middleware/        # Express middleware
│   └── authMiddleware.js  # JWT authentication middleware
├── models/            # Data models
│   └── userModel.js   # User model with CRUD operations
├── public/            # Static frontend files
│   ├── index.html     # Main HTML file
│   ├── script.js      # Frontend JavaScript
│   └── styles.css     # CSS styles
├── routes/            # API routes
│   ├── authRoutes.js  # Authentication routes
│   └── userRoutes.js  # User management routes
├── .env               # Environment variables
├── package.json       # Project dependencies
└── server.js          # Main application entry point
```

## Setup and Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=1h
   ```
5. Start the server:
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (protected route)

### User Management (All Protected Routes)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## JWT Authentication Flow

1. User registers or logs in
2. Server validates credentials and returns a JWT token
3. Client stores the token (in localStorage)
4. Client includes the token in the Authorization header for subsequent requests
5. Server validates the token for protected routes
6. If token is valid, the request is processed; otherwise, it's rejected

## Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT tokens have an expiration time
- Protected routes verify token authenticity
- Users can only modify their own data