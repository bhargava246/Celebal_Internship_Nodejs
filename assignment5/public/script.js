// script.js - Client-side JavaScript for the MongoDB CRUD Application

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const productForm = document.getElementById('product-form');
  const productsList = document.getElementById('products-list');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');
  const productIdInput = document.getElementById('product-id');
  
  // Load all products when the page loads
  loadProducts();
  
  // Event Listeners
  productForm.addEventListener('submit', handleFormSubmit);
  resetBtn.addEventListener('click', resetForm);
  
  // Functions
  
  // Load all products from the API
  async function loadProducts() {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        displayProducts(result.data);
      } else {
        showError('Failed to load products');
      }
    } catch (error) {
      showError('Error loading products: ' + error.message);
    }
  }
  
  // Display products in the UI
  function displayProducts(products) {
    productsList.innerHTML = '';
    
    if (products.length === 0) {
      productsList.innerHTML = '<p>No products found. Add a product to get started.</p>';
      return;
    }
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.innerHTML = `
        <div class="product-header">
          <span class="product-title">${product.name}</span>
          <span class="product-price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-description">${product.description || 'No description'}</div>
        <div class="product-details">
          <span>Quantity: ${product.quantity}</span>
          <span>Category: ${product.category || 'Uncategorized'}</span>
        </div>
        <div class="product-actions">
          <button class="edit-btn" data-id="${product._id}">Edit</button>
          <button class="delete-btn" data-id="${product._id}">Delete</button>
        </div>
      `;
      
      productsList.appendChild(productCard);
      
      // Add event listeners to the buttons
      productCard.querySelector('.edit-btn').addEventListener('click', () => editProduct(product));
      productCard.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product._id));
    });
  }
  
  // Handle form submission (create or update product)
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
      name: document.getElementById('name').value,
      price: parseFloat(document.getElementById('price').value),
      description: document.getElementById('description').value,
      quantity: parseInt(document.getElementById('quantity').value),
      category: document.getElementById('category').value
    };
    
    const productId = productIdInput.value;
    
    try {
      let response;
      
      if (productId) {
        // Update existing product
        response = await fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        });
      } else {
        // Create new product
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        });
      }
      
      const result = await response.json();
      
      if (result.success) {
        resetForm();
        loadProducts();
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('Error saving product: ' + error.message);
    }
  }
  
  // Load product data into the form for editing
  function editProduct(product) {
    productIdInput.value = product._id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description || '';
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('category').value = product.category || '';
    
    submitBtn.textContent = 'Update Product';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Delete a product
  async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        loadProducts();
      } else {
        showError(result.error);
      }
    } catch (error) {
      showError('Error deleting product: ' + error.message);
    }
  }
  
  // Reset the form
  function resetForm() {
    productForm.reset();
    productIdInput.value = '';
    submitBtn.textContent = 'Add Product';
  }
  
  // Show error message
  function showError(message) {
    console.error(message);
    alert(message);
  }
});