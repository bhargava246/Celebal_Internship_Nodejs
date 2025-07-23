# Assignment 4: Express.js Web Server

This assignment demonstrates a simple web server using Express.js that handles basic routing and middleware.

## Features

- Express.js web server with multiple routes
- Request logging middleware
- Error handling middleware
- Static file serving
- API endpoints with different HTTP methods (GET, POST)

## Installation

1. Navigate to the assignment4 directory:
   ```
   cd assignment4
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server

1. Start the server:
   ```
   npm start
   ```
   
   Or for development with auto-restart:
   ```
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

1. **Home Endpoint**
   - URL: `/`
   - Method: `GET`
   - Description: Returns information about available endpoints

2. **Get All Users**
   - URL: `/api/users`
   - Method: `GET`
   - Description: Returns a list of all users

3. **Get User by ID**
   - URL: `/api/users/:id`
   - Method: `GET`
   - Description: Returns a specific user by ID
   - Parameters: `id` - User ID

4. **Create User**
   - URL: `/api/users`
   - Method: `POST`
   - Description: Creates a new user
   - Body: JSON object with `name` and `email` fields

## Testing the API

You can test the API using the web interface or tools like curl or Postman:

### Using curl

1. Get all users:
   ```
   curl http://localhost:3000/api/users
   ```

2. Get user by ID:
   ```
   curl http://localhost:3000/api/users/1
   ```

3. Create a new user:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"name":"New User","email":"newuser@example.com"}' http://localhost:3000/api/users
   ```