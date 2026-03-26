// Login page functionality
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validation
    if (!email || !password) {
      showMessage('Email and password are required', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(data.message || 'Login failed', 'error');
        console.error('Login error:', data);
        return;
      }

      // Store token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showMessage('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/pages/dashboard.html';
      }, 1500);
    } catch (error) {
      console.error('Network Error:', error);
      showMessage(`Connection Error: ${error.message || 'Cannot connect to server. Make sure backend is running on http://localhost:5000'}`, 'error');
    }
  });

  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
  }
});
