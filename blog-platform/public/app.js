// app.js - Frontend JavaScript for the Blog Platform

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const postsContainer = document.getElementById('posts-container');
  const postDetails = document.getElementById('post-details');
  const commentsContainer = document.getElementById('comments-container');
  const categoriesContainer = document.getElementById('categories-container');
  const searchResults = document.getElementById('search-results');
  const pagination = document.getElementById('pagination');
  
  // Sections
  const postsSection = document.getElementById('posts-section');
  const singlePostSection = document.getElementById('single-post-section');
  const categoriesSection = document.getElementById('categories-section');
  const searchSection = document.getElementById('search-section');
  
  // Forms
  const commentForm = document.getElementById('comment-form');
  const postForm = document.getElementById('post-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const searchForm = document.getElementById('search-input');
  
  // Modals
  const authModal = document.getElementById('auth-modal');
  const postModal = document.getElementById('post-modal');
  
  // Buttons
  const loginButton = document.getElementById('login-button');
  const registerButton = document.getElementById('register-button');
  const logoutButton = document.getElementById('logout-button');
  const createPostLink = document.getElementById('create-post-link');
  const searchButton = document.getElementById('search-button');
  
  // Navigation
  const homeLink = document.getElementById('home-link');
  const categoriesLink = document.getElementById('categories-link');
  const searchLink = document.getElementById('search-link');
  
  // Auth tabs
  const authTabs = document.querySelectorAll('.auth-tab');
  
  // Close buttons
  const closeButtons = document.querySelectorAll('.close');
  
  // Current page state
  let currentPage = 1;
  let totalPages = 1;
  let currentPostId = null;
  
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (token) {
    fetchCurrentUser(token);
  } else {
    updateAuthUI(false);
  }
  
  // Initialize the app
  fetchPosts();
  fetchCategories();
  
  // Event Listeners
  
  // Navigation
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(postsSection);
    fetchPosts();
  });
  
  categoriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(categoriesSection);
    fetchCategories();
  });
  
  searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(searchSection);
  });
  
  createPostLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      showAuthModal();
      return;
    }
    showPostModal();
  });
  
  // Auth
  loginButton.addEventListener('click', showAuthModal);
  registerButton.addEventListener('click', showAuthModal);
  logoutButton.addEventListener('click', logout);
  
  // Auth tabs
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const formName = tab.dataset.form;
      
      // Update active tab
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding form
      document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
        if (form.id === `${formName}-form`) {
          form.classList.add('active');
        }
      });
    });
  });
  
  // Close modals
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      authModal.style.display = 'none';
      postModal.style.display = 'none';
    });
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
    }
    if (e.target === postModal) {
      postModal.style.display = 'none';
    }
  });
  
  // Forms
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  postForm.addEventListener('submit', handlePostSubmit);
  commentForm.addEventListener('submit', handleCommentSubmit);
  
  // Search
  searchButton.addEventListener('click', () => {
    const query = searchForm.value.trim();
    if (query) {
      searchPosts(query);
    }
  });
  
  searchForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchForm.value.trim();
      if (query) {
        searchPosts(query);
      }
    }
  });
  
  // API Functions
  
  // Fetch all posts
  async function fetchPosts(page = 1, limit = 6) {
    try {
      const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
      const data = await response.json();
      
      if (data.success) {
        displayPosts(data.data);
        
        // Update pagination
        currentPage = page;
        totalPages = Math.ceil(data.count / limit);
        updatePagination();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to fetch posts', 'error');
    }
  }
  
  // Fetch single post
  async function fetchPost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      
      if (data.success) {
        displaySinglePost(data.data);
        currentPostId = postId;
        showSection(singlePostSection);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to fetch post', 'error');
    }
  }
  
  // Fetch categories
  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (data.success) {
        displayCategories(data.data);
        populateCategorySelect(data.data);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to fetch categories', 'error');
    }
  }
  
  // Search posts
  async function searchPosts(query) {
    try {
      const response = await fetch(`/api/posts?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        displaySearchResults(data.data, query);
        showSection(searchSection);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to search posts', 'error');
    }
  }
  
  // Create post
  async function createPost(postData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('Post created successfully');
        postModal.style.display = 'none';
        fetchPosts();
        showSection(postsSection);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to create post', 'error');
    }
  }
  
  // Update post
  async function updatePost(postId, postData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('Post updated successfully');
        postModal.style.display = 'none';
        fetchPost(postId);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to update post', 'error');
    }
  }
  
  // Delete post
  async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('Post deleted successfully');
        fetchPosts();
        showSection(postsSection);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to delete post', 'error');
    }
  }
  
  // Add comment
  async function addComment(postId, content) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please login first', 'error');
        return;
      }
      
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('Comment added successfully');
        fetchPost(postId);
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to add comment', 'error');
    }
  }
  
  // Auth functions
  async function login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        showMessage('Login successful');
        authModal.style.display = 'none';
        updateAuthUI(true, data.data);
        fetchPosts();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to login', 'error');
    }
  }
  
  async function register(userData) {
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
        localStorage.setItem('token', data.token);
        showMessage('Registration successful');
        authModal.style.display = 'none';
        updateAuthUI(true, data.data);
        fetchPosts();
      } else {
        showMessage(data.error, 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showMessage('Failed to register', 'error');
    }
  }
  
  async function fetchCurrentUser(token) {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        updateAuthUI(true, data.data);
      } else {
        localStorage.removeItem('token');
        updateAuthUI(false);
      }
    } catch (err) {
      console.error('Error:', err);
      localStorage.removeItem('token');
      updateAuthUI(false);
    }
  }
  
  function logout() {
    localStorage.removeItem('token');
    updateAuthUI(false);
    showMessage('Logged out successfully');
    fetchPosts();
    showSection(postsSection);
  }
  
  // UI Functions
  
  // Display posts in grid
  function displayPosts(posts) {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts found</p>';
      return;
    }
    
    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      
      const tagsHtml = post.tags && post.tags.length > 0 
        ? `<div class="post-tags">${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}</div>` 
        : '';
      
      postCard.innerHTML = `
        <div class="post-image" style="background-image: url('${post.featuredImage || '/default-post.jpg'}')"></div>
        <div class="post-content">
          <h3 class="post-title">${post.title}</h3>
          <p class="post-summary">${post.summary}</p>
          <div class="post-meta">
            <span>By ${post.author ? post.author.name : 'Unknown'}</span>
            <span>${new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="post-category">${post.category ? post.category.name : 'Uncategorized'}</div>
          ${tagsHtml}
        </div>
      `;
      
      postCard.addEventListener('click', () => fetchPost(post._id));
      
      postsContainer.appendChild(postCard);
    });
  }
  
  // Display single post
  function displaySinglePost(post) {
    const tagsHtml = post.tags && post.tags.length > 0 
      ? `<div class="post-tags">${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}</div>` 
      : '';
    
    const commentsHtml = post.comments && post.comments.length > 0
      ? post.comments.map(comment => {
          return `
            <div class="comment">
              <div class="comment-header">
                <div class="comment-author">
                  <div class="comment-avatar" style="background-image: url('${comment.user.avatar || '/default-avatar.jpg'}')"></div>
                  <span>${comment.user.name}</span>
                </div>
                <span class="comment-date">${new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <div class="comment-content">${comment.content}</div>
            </div>
          `;
        }).join('')
      : '<p>No comments yet</p>';
    
    // Check if user is the author of the post
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const isAuthor = user && post.author && user.id === post.author._id;
    
    const editDeleteButtons = isAuthor ? `
      <div class="post-actions">
        <button class="edit-post-btn" data-id="${post._id}">Edit Post</button>
        <button class="delete-post-btn" data-id="${post._id}">Delete Post</button>
      </div>
    ` : '';
    
    postDetails.innerHTML = `
      <div class="post-header">
        <h1>${post.title}</h1>
        <div class="post-header-meta">
          <div class="post-author">
            <div class="author-avatar" style="background-image: url('${post.author ? post.author.avatar || '/default-avatar.jpg' : '/default-avatar.jpg'}')"></div>
            <span>${post.author ? post.author.name : 'Unknown'}</span>
          </div>
          <span>${new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="post-category">${post.category ? post.category.name : 'Uncategorized'}</div>
        ${tagsHtml}
        ${editDeleteButtons}
      </div>
      <div class="post-body">
        ${post.content}
      </div>
    `;
    
    commentsContainer.innerHTML = commentsHtml;
    
    // Add event listeners to edit and delete buttons
    const editBtn = postDetails.querySelector('.edit-post-btn');
    const deleteBtn = postDetails.querySelector('.delete-post-btn');
    
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        openEditPostModal(post);
      });
    }
    
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        deletePost(post._id);
      });
    }
  }
  
  // Display categories
  function displayCategories(categories) {
    categoriesContainer.innerHTML = '';
    
    if (categories.length === 0) {
      categoriesContainer.innerHTML = '<p>No categories found</p>';
      return;
    }
    
    categories.forEach(category => {
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('category-card');
      
      categoryCard.innerHTML = `
        <h3 class="category-name">${category.name}</h3>
        <p class="category-description">${category.description}</p>
      `;
      
      categoryCard.addEventListener('click', () => {
        searchPosts(`category=${category._id}`);
      });
      
      categoriesContainer.appendChild(categoryCard);
    });
  }
  
  // Display search results
  function displaySearchResults(posts, query) {
    searchResults.innerHTML = '';
    
    if (posts.length === 0) {
      searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
      return;
    }
    
    searchResults.innerHTML = `<h3>Search results for "${query}"</h3>`;
    
    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');
      
      const tagsHtml = post.tags && post.tags.length > 0 
        ? `<div class="post-tags">${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}</div>` 
        : '';
      
      postCard.innerHTML = `
        <div class="post-image" style="background-image: url('${post.featuredImage || '/default-post.jpg'}')"></div>
        <div class="post-content">
          <h3 class="post-title">${post.title}</h3>
          <p class="post-summary">${post.summary}</p>
          <div class="post-meta">
            <span>By ${post.author ? post.author.name : 'Unknown'}</span>
            <span>${new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="post-category">${post.category ? post.category.name : 'Uncategorized'}</div>
          ${tagsHtml}
        </div>
      `;
      
      postCard.addEventListener('click', () => fetchPost(post._id));
      
      searchResults.appendChild(postCard);
    });
  }
  
  // Populate category select
  function populateCategorySelect(categories) {
    const categorySelect = document.getElementById('post-category');
    categorySelect.innerHTML = '<option value="">Select a category</option>';
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category._id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  }
  
  // Update pagination
  function updatePagination() {
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('pagination-btn');
      prevBtn.textContent = 'Previous';
      prevBtn.addEventListener('click', () => fetchPosts(currentPage - 1));
      pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.classList.add('pagination-btn');
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', () => fetchPosts(i));
      pagination.appendChild(pageBtn);
    }
    
    // Next button
    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('pagination-btn');
      nextBtn.textContent = 'Next';
      nextBtn.addEventListener('click', () => fetchPosts(currentPage + 1));
      pagination.appendChild(nextBtn);
    }
  }
  
  // Show section
  function showSection(section) {
    // Hide all sections
    postsSection.style.display = 'none';
    singlePostSection.style.display = 'none';
    categoriesSection.style.display = 'none';
    searchSection.style.display = 'none';
    
    // Show the selected section
    section.style.display = 'block';
  }
  
  // Show auth modal
  function showAuthModal() {
    authModal.style.display = 'block';
  }
  
  // Show post modal
  function showPostModal() {
    // Reset form
    document.getElementById('post-form-title').textContent = 'Create New Post';
    document.getElementById('post-id').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-summary').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-category').value = '';
    document.getElementById('post-tags').value = '';
    
    postModal.style.display = 'block';
  }
  
  // Open edit post modal
  function openEditPostModal(post) {
    document.getElementById('post-form-title').textContent = 'Edit Post';
    document.getElementById('post-id').value = post._id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-summary').value = post.summary;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-category').value = post.category._id;
    document.getElementById('post-tags').value = post.tags ? post.tags.join(', ') : '';
    
    postModal.style.display = 'block';
  }
  
  // Update auth UI
  function updateAuthUI(isLoggedIn, userData = null) {
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const authRequired = document.querySelectorAll('.auth-required');
    
    if (isLoggedIn && userData) {
      authButtons.style.display = 'none';
      userInfo.style.display = 'flex';
      userName.textContent = userData.name;
      
      // Show auth required elements
      authRequired.forEach(el => {
        el.style.display = 'block';
      });
    } else {
      authButtons.style.display = 'block';
      userInfo.style.display = 'none';
      userName.textContent = '';
      
      // Hide auth required elements
      authRequired.forEach(el => {
        el.style.display = 'none';
      });
    }
  }
  
  // Check if user is logged in
  function isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
  
  // Event Handlers
  
  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    login(email, password);
  }
  
  // Handle register form submission
  function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
      name: document.getElementById('register-name').value,
      email: document.getElementById('register-email').value,
      password: document.getElementById('register-password').value,
      bio: document.getElementById('register-bio').value || undefined
    };
    
    register(userData);
  }
  
  // Handle post form submission
  function handlePostSubmit(e) {
    e.preventDefault();
    
    const postId = document.getElementById('post-id').value;
    const postData = {
      title: document.getElementById('post-title').value,
      summary: document.getElementById('post-summary').value,
      content: document.getElementById('post-content').value,
      category: document.getElementById('post-category').value,
      tags: document.getElementById('post-tags').value
        ? document.getElementById('post-tags').value.split(',').map(tag => tag.trim())
        : []
    };
    
    if (postId) {
      updatePost(postId, postData);
    } else {
      createPost(postData);
    }
  }
  
  // Handle comment form submission
  function handleCommentSubmit(e) {
    e.preventDefault();
    
    if (!isLoggedIn()) {
      showAuthModal();
      return;
    }
    
    const content = document.getElementById('comment-content').value;
    
    if (content.trim() === '') {
      showMessage('Comment cannot be empty', 'error');
      return;
    }
    
    addComment(currentPostId, content);
    document.getElementById('comment-content').value = '';
  }
  
  // Show message
  function showMessage(message, type = 'success') {
    alert(message);
  }
});