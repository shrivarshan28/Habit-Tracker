// API base URL - works for both local and deployed
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Check authentication and update UI
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    updateAuthUI(JSON.parse(user), token);
  } else {
    updateUnauthenticatedUI();
  }
}

// Update UI when user is authenticated
function updateAuthUI(user, token) {
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const userGreeting = document.getElementById('userGreeting');

  if (loginLink) loginLink.style.display = 'none';
  if (registerLink) registerLink.style.display = 'none';
  
  if (logoutBtn) {
    logoutBtn.style.display = 'block';
    logoutBtn.addEventListener('click', logout);
  }

  if (userGreeting) {
    userGreeting.textContent = `Welcome, ${user.username}!`;
  }
}

// Update UI when user is not authenticated
function updateUnauthenticatedUI() {
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const userGreeting = document.getElementById('userGreeting');

  if (loginLink) loginLink.style.display = 'block';
  if (registerLink) registerLink.style.display = 'block';
  if (logoutBtn) logoutBtn.style.display = 'none';
  if (userGreeting) userGreeting.textContent = '';
}

// Logout function
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  alert('Logged out successfully!');
  window.location.href = '/';
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', checkAuth);
