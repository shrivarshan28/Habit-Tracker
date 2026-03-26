const express = require('express');
const auth = require('../middleware/auth');
const Habit = require('../models/Habit');

const router = express.Router();

// Get all habits for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new habit
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, frequency } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Habit name is required' });
    }

    const habit = new Habit({
      userId: req.userId,
      name,
      description,
      category,
      frequency,
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update habit
router.put('/:id', auth, async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark habit as completed
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const alreadyCompleted = habit.completedDates.some(
      date => new Date(date).setHours(0, 0, 0, 0) === today
    );

    if (!alreadyCompleted) {
      habit.completedDates.push(new Date());
      habit.streak += 1;
    }

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
