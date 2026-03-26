// Dashboard page functionality
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  // Redirect to login if not authenticated
  if (!token) {
    window.location.href = '/pages/login.html';
    return;
  }

  const addHabitBtn = document.getElementById('addHabitBtn');
  const addHabitModal = document.getElementById('addHabitModal');
  const addHabitForm = document.getElementById('addHabitForm');
  const closeBtn = document.querySelector('.close');
  const habitsGrid = document.getElementById('habitsGrid');

  // Modal functionality
  addHabitBtn.addEventListener('click', () => {
    addHabitModal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    addHabitModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === addHabitModal) {
      addHabitModal.style.display = 'none';
    }
  });

  // Add habit form submission
  addHabitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const habitName = document.getElementById('habitName').value.trim();
    const habitDescription = document.getElementById('habitDescription').value.trim();
    const habitCategory = document.getElementById('habitCategory').value;
    const habitFrequency = document.getElementById('habitFrequency').value;

    if (!habitName) {
      alert('Habit name is required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: habitName,
          description: habitDescription,
          category: habitCategory,
          frequency: habitFrequency,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Failed to create habit');
        return;
      }

      // Clear form and close modal
      addHabitForm.reset();
      addHabitModal.style.display = 'none';

      // Reload habits
      loadHabits();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the habit');
    }
  });

  // Load and display habits
  async function loadHabits() {
    try {
      const response = await fetch(`${API_URL}/habits`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch habits');
        return;
      }

      const habits = await response.json();

      if (habits.length === 0) {
        habitsGrid.innerHTML = '<p class="empty-message">No habits yet. Create one to get started!</p>';
        return;
      }

      habitsGrid.innerHTML = habits
        .map((habit) => createHabitCard(habit, token))
        .join('');

      // Add event listeners to habit buttons
      document.querySelectorAll('.btn-success').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const habitId = e.target.dataset.habitId;
          completeHabit(habitId, token);
        });
      });

      document.querySelectorAll('.btn-danger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const habitId = e.target.dataset.habitId;
          if (confirm('Are you sure you want to delete this habit?')) {
            deleteHabit(habitId, token);
          }
        });
      });
    } catch (error) {
      console.error('Error loading habits:', error);
      habitsGrid.innerHTML = '<p class="empty-message">Error loading habits</p>';
    }
  }

  // Create habit card HTML
  function createHabitCard(habit, token) {
    const streakClass = habit.streak > 0 ? 'success' : 'warning';
    const categoryEmojis = {
      health: '❤️',
      fitness: '💪',
      learning: '📚',
      productivity: '⚡',
      other: '📌',
    };

    return `
      <div class="habit-card">
        <div class="habit-header">
          <div>
            <h3 class="habit-name">${habit.name}</h3>
            <span class="habit-category">${categoryEmojis[habit.category] || ''} ${habit.category}</span>
          </div>
        </div>
        ${habit.description ? `<p class="habit-description">${habit.description}</p>` : ''}
        <div class="habit-stats">
          <div class="stat">
            <div class="stat-value" style="color: var(--success-color);">${habit.streak}</div>
            <div class="stat-label">Streak</div>
          </div>
          <div class="stat">
            <div class="stat-value">${habit.completedDates.length}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat">
            <div class="stat-value">${habit.frequency.charAt(0).toUpperCase()}</div>
            <div class="stat-label">Frequency</div>
          </div>
        </div>
        <div class="habit-actions">
          <button class="btn btn-success" data-habit-id="${habit._id}">✓ Complete Today</button>
          <button class="btn btn-danger" data-habit-id="${habit._id}">Delete</button>
        </div>
      </div>
    `;
  }

  // Complete habit
  async function completeHabit(habitId, token) {
    try {
      const response = await fetch(`${API_URL}/habits/${habitId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Failed to complete habit');
        return;
      }

      alert('Great! Habit marked as completed!');
      loadHabits();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  }

  // Delete habit
  async function deleteHabit(habitId, token) {
    try {
      const response = await fetch(`${API_URL}/habits/${habitId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Failed to delete habit');
        return;
      }

      alert('Habit deleted successfully');
      loadHabits();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  }

  // Load habits on page load
  loadHabits();
});
