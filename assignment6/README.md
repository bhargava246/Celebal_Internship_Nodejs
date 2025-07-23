# Assignment 6: RESTful API with Node.js and Express

A simple RESTful API built with Node.js and Express that supports basic CRUD operations on a user resource.

## Features

- RESTful API endpoints for user management
- Create, Read, Update, and Delete (CRUD) operations
- In-memory data storage
- Input validation and error handling
- Simple web interface for testing API operations

## Prerequisites

- Node.js installed

## Installation

1. Clone the repository
2. Navigate to the assignment6 directory
3. Install dependencies:

```
npm install
```

4. Create a `.env` file in the root directory with the following content:

```
PORT=3000
```

## Running the Application

1. Start the server:

```
npm start
```

Or for development with auto-restart:

```
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Users

1. **Get All Users**
   - URL: `/api/users`
   - Method: `GET`
   - Description: Returns a list of all users

2. **Get User by ID**
   - URL: `/api/users/:id`
   - Method: `GET`
   - Description: Returns a specific user by ID
   - Parameters: `id` - User ID

3. **Create User**
   - URL: `/api/users`
   - Method: `POST`
   - Description: Creates a new user
   - Body: JSON object with user details
   - Required fields: `name`, `email`

4. **Update User**
   - URL: `/api/users/:id`
   - Method: `PUT`
   - Description: Updates an existing user
   - Parameters: `id` - User ID
   - Body: JSON object with user details to update

5. **Delete User**
   - URL: `/api/users/:id`
   - Method: `DELETE`
   - Description: Deletes a user
   - Parameters: `id` - User ID

## Testing the API

### Using the Web Interface

The application includes a simple web interface for testing CRUD operations. You can:

- View all users
- Add a new user
- Edit an existing user
- Delete a user

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
   curl -X POST -H "Content-Type: application/json" -d '{"name":"New User","email":"new@example.com","age":25,"location":"Boston"}' http://localhost:3000/api/users
   ```

4. Update a user:
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:3000/api/users/1
   ```

5. Delete a user:
   ```
   curl -X DELETE http://localhost:3000/api/users/1
   ```

## Project Structure

```
assignment6/
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── routes/
│   └── userRoutes.js
├── .env
├── package.json
├── README.md
└── server.js
```

## Technologies Used

- Node.js
- Express.js
- HTML/CSS/JavaScript (for the frontend)