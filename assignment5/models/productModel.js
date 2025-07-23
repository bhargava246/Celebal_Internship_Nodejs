// models/productModel.js - Mongoose model for Product

const mongoose = require('mongoose');

// Define the schema for Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  category: {
    type: String,
    required: false,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Product model
module.exports = mongoose.model('Product', productSchema);