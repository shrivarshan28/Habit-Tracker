# Development Guide

## Getting Started

This guide will help you set up and run the Habit Tracker application locally.

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git
- A code editor (VS Code recommended)

## Setup Steps

### 1. Clone/Open the Project

```bash
cd path/to/Habit_Tracker
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Create Environment File

Copy the example env file:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your settings:
```
MONGODB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in `.env`

### 5. Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:5000`

### 6. Access Frontend

Open your browser:
```
http://localhost:5000
```

You'll see the home page with options to register or login.

## Quick Test

1. **Register** - Click "Get Started" and create an account
2. **Add Habit** - Go to dashboard and create a habit
3. **Track** - Click "Complete Today" to mark habit done
4. **View** - See your progress and streak

## Development Workflow

### API Testing

Use Postman or VS Code REST Client:

```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get Habits
GET http://localhost:5000/api/habits
Authorization: Bearer YOUR_TOKEN_HERE
```

### File Structure Reference

- `backend/server.js` - Main Express app
- `backend/models/` - Database schemas
- `backend/routes/` - API endpoints
- `backend/middleware/` - Authentication, etc
- `frontend/pages/` - HTML pages
- `frontend/css/` - Styling
- `frontend/js/` - Client logic

### Common Tasks

**Add a new API endpoint:**
1. Create route in `backend/routes/`
2. Export router in `backend/server.js`
3. Update frontend code to call it

**Modify frontend:**
1. Edit HTML in `frontend/pages/`
2. Update CSS in `frontend/css/style.css`
3. Update JS in `frontend/js/`

**Fix bugs:**
1. Check browser console for errors
2. Check terminal for backend errors
3. Use browser DevTools Network tab
4. Add console.log() for debugging

## Docker Development

Run everything in containers:

```bash
docker-compose up
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend accessible at http://localhost:5000

## Troubleshooting

**Problem: Cannot connect to MongoDB**
- Solution: Make sure MongoDB is running (mongod command)
- Or use MongoDB Atlas connection string

**Problem: Port 5000 already in use**
- Solution: Change PORT in .env or kill process using port
- On Windows: `netstat -ano | findstr :5000`

**Problem: Module not found**
- Solution: Run `npm install` in backend folder

**Problem: CORS errors**
- Solution: Check backend server has cors enabled
- Frontend must call correct API URL

**Problem: Login not working**
- Solution: Check .env has JWT_SECRET set
- Clear browser localStorage: `localStorage.clear()`

## Next Steps

- Deploy to Heroku (see README.md)
- Add more features (notifications, social, etc)
- Improve UI/UX
- Add tests
- Optimize performance

## Resources

- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Node.js Docs](https://nodejs.org/docs/)

## Getting Help

1. Check README.md for deployment help
2. Review API_DOCUMENTATION.md for API details
3. Check error messages in console
4. Review code comments

Happy coding! 🚀
