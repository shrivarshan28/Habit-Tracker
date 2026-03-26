// Home page functionality
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  
  // Redirect to dashboard if already logged in
  if (token) {
    const cta = document.querySelector('.cta-buttons');
    if (cta) {
      cta.innerHTML = '<a href="pages/dashboard.html" class="cta-btn primary">Go to Dashboard</a>';
    }
  }
});
