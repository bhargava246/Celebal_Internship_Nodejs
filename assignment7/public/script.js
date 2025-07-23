// script.js - Frontend JavaScript for the RESTful API with JWT Authentication

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (token) {
    fetchCurrentUser(token);
  }
  
  // DOM Elements
  const userForm = document.getElementById('user-form');
  const usersContainer = document.getElementById('users-container');
  const editModal = document.getElementById('edit-modal');
  const editForm = document.getElementById('edit-form');
  const closeBtn = document.querySelector('.close');
  
  // Fetch all users and display them
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        displayUsers(data.data);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to connect to the server', 'error');
    }
  };
  
  // Display users in the UI
  const displayUsers = (users) => {
    usersContainer.innerHTML = '';
    
    if (users.length === 0) {
      usersContainer.innerHTML = '<p>No users found</p>';
      return;
    }
    
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
      
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age || 'N/A'}</p>
        <p><strong>Location:</strong> ${user.location || 'N/A'}</p>
        <div class="user-actions">
          <button class="btn btn-edit" data-id="${user.id}">Edit</button>
          <button class="btn btn-danger" data-id="${user.id}">Delete</button>
        </div>
      `;
      
      usersContainer.appendChild(userCard);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-danger').forEach(btn => {
      btn.addEventListener('click', () => deleteUser(btn.dataset.id));
    });
  };
  
  // Create a new user
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      age: document.getElementById('age').value || null,
      location: document.getElementById('location').value || null
    };
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('User created successfully');
        userForm.reset();
        fetchUsers();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to create user', 'error');
    }
  });
  
  // Open edit modal with user data
  const openEditModal = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        const user = data.data;
        
        document.getElementById('edit-id').value = user.id;
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-age').value = user.age || '';
        document.getElementById('edit-location').value = user.location || '';
        
        editModal.style.display = 'block';
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to fetch user data', 'error');
    }
  };
  
  // Close modal when clicking the close button
  closeBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  });
  
  // Close modal when clicking outside the modal
  window.addEventListener('click', (e) => {
    if (e.target === editModal) {
      editModal.style.display = 'none';
    }
  });
  
  // Update user
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('edit-id').value;
    const userData = {
      name: document.getElementById('edit-name').value,
      email: document.getElementById('edit-email').value,
      age: document.getElementById('edit-age').value || null,
      location: document.getElementById('edit-location').value || null
    };
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('User updated successfully');
        editModal.style.display = 'none';
        fetchUsers();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to update user', 'error');
    }
  });
  
  // Delete user
  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('User deleted successfully');
        fetchUsers();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to delete user', 'error');
    }
  };
  
  // Show message to the user
  const showMessage = (message, type = 'success') => {
    alert(message);
  };
  
  // Authentication related functions
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const authContainer = document.getElementById('auth-container');
  const userInfoContainer = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');
  const userNameSpan = document.getElementById('user-name');
  const userEmailSpan = document.getElementById('user-email');
  
  // Switch between login and register tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding form
      authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${tabName}-form`) {
          form.classList.add('active');
        }
      });
    });
  });
  
  // Handle login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    };
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        showMessage('Login successful');
        
        // Update UI
        displayUserInfo(data.data);
        loginForm.reset();
        fetchUsers();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to login', 'error');
    }
  });
  
  // Handle register form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
      name: document.getElementById('register-name').value,
      email: document.getElementById('register-email').value,
      password: document.getElementById('register-password').value,
      age: document.getElementById('register-age').value || null,
      location: document.getElementById('register-location').value || null
    };
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        showMessage('Registration successful');
        
        // Update UI
        displayUserInfo(data.data);
        registerForm.reset();
        fetchUsers();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to register', 'error');
    }
  });
  
  // Handle logout
  logoutBtn.addEventListener('click', () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Update UI
    authContainer.style.display = 'block';
    userInfoContainer.style.display = 'none';
    
    // Clear user data
    userNameSpan.textContent = '';
    userEmailSpan.textContent = '';
    
    showMessage('Logged out successfully');
  });
  
  // Fetch current user data
  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        displayUserInfo(data.data);
        fetchUsers();
      } else {
        // Token invalid or expired
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Error:', err);
      localStorage.removeItem('token');
    }
  };
  
  // Display user info
  const displayUserInfo = (user) => {
    userNameSpan.textContent = user.name;
    userEmailSpan.textContent = user.email;
    
    authContainer.style.display = 'none';
    userInfoContainer.style.display = 'block';
  };
  
  // Fetch users on page load if logged in, otherwise show auth forms
  const token = localStorage.getItem('token');
  if (token) {
    fetchUsers();
  } else {
    authContainer.style.display = 'block';
    userInfoContainer.style.display = 'none';
  }
});