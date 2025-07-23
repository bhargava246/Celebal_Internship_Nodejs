// routes/productRoutes.js - Routes for Product CRUD operations

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for getting all products and creating a new product
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

// Route for getting, updating, and deleting a product by ID
router
  .route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;