# Assignment 5: MongoDB CRUD Application

A simple application to Create, Read, Update, and Delete (CRUD) entries in a MongoDB database using Mongoose.

## Features

- Connect to MongoDB using Mongoose
- Create, read, update, and delete products
- RESTful API endpoints
- Simple web interface for testing CRUD operations
- Input validation and error handling

## Prerequisites

- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas account)

## Installation

1. Clone the repository
2. Navigate to the assignment5 directory
3. Install dependencies:

```
npm install
```

4. Create a `.env` file in the root directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/assignment5
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

### Products

1. **Get All Products**
   - URL: `/api/products`
   - Method: `GET`
   - Description: Returns a list of all products

2. **Get Product by ID**
   - URL: `/api/products/:id`
   - Method: `GET`
   - Description: Returns a specific product by ID
   - Parameters: `id` - Product ID

3. **Create Product**
   - URL: `/api/products`
   - Method: `POST`
   - Description: Creates a new product
   - Body: JSON object with product details
   - Required fields: `name`, `price`, `quantity`

4. **Update Product**
   - URL: `/api/products/:id`
   - Method: `PUT`
   - Description: Updates an existing product
   - Parameters: `id` - Product ID
   - Body: JSON object with product details to update

5. **Delete Product**
   - URL: `/api/products/:id`
   - Method: `DELETE`
   - Description: Deletes a product
   - Parameters: `id` - Product ID

## Testing the API

### Using the Web Interface

The application includes a simple web interface for testing CRUD operations. You can:

- View all products
- Add a new product
- Edit an existing product
- Delete a product

### Using curl

1. Get all products:
   ```
   curl http://localhost:3000/api/products
   ```

2. Get product by ID:
   ```
   curl http://localhost:3000/api/products/[product-id]
   ```

3. Create a new product:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"name":"New Product","price":29.99,"quantity":10}' http://localhost:3000/api/products
   ```

4. Update a product:
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{"price":39.99}' http://localhost:3000/api/products/[product-id]
   ```

5. Delete a product:
   ```
   curl -X DELETE http://localhost:3000/api/products/[product-id]
   ```

## Project Structure

```
assignment5/
├── controllers/
│   └── productController.js
├── models/
│   └── productModel.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── routes/
│   └── productRoutes.js
├── .env
├── package.json
├── README.md
└── server.js
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML/CSS/JavaScript (for the frontend)