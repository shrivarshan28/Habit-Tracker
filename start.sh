#!/bin/bash

# Habit Tracker Quick Start for macOS/Linux

echo ""
echo "========================================"
echo "  Habit Tracker - Quick Start"
echo "========================================"
echo ""

# Check if MongoDB is installed
if command -v mongod &> /dev/null; then
    echo "MongoDB found locally. Starting MongoDB..."
    mongod &
    MONGO_PID=$!
    sleep 3
else
    echo "MongoDB not found locally."
    echo "Please either:"
    echo "1. Install MongoDB from https://www.mongodb.com/try/download/community"
    echo "2. Use MongoDB Atlas (free cloud option)"
    echo ""
    echo "To use MongoDB Atlas:"
    echo "- Create account at https://www.mongodb.com/cloud/atlas"
    echo "- Create a cluster"
    echo "- Get connection string"
    echo "- Update MONGODB_URI in backend/.env"
    echo ""
    read -p "Press Enter to continue..."
fi

echo ""
echo "Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!

sleep 3

echo ""
echo "========================================"
echo "Application is ready!"
echo "========================================"
echo ""
echo "Home:      http://localhost:5000"
echo "Register:  http://localhost:5000/pages/register.html"
echo "Login:     http://localhost:5000/pages/login.html"
echo ""
echo "To stop the server, press Ctrl+C"
echo ""

# Keep script running
wait
