# Habit Tracker - Workspace Instructions

## Project Overview
Full-stack Habit Tracker application with:
- Node.js/Express backend
- MongoDB database  
- User authentication (Login/Register)
- Responsive dashboard with habit tracking
- Deployable to Heroku or any cloud platform

## Development Status
- [x] Project scaffolded
- [x] Backend API complete (Express + MongoDB)
- [x] Frontend complete (HTML/CSS/JS with auth pages)
- [x] Database models configured (User, Habit)
- [x] Deployment configuration ready (Heroku, Docker)

## Quick Start

### Option 1: Quick Start Script (Recommended for Windows)
```bash
# Windows
double-click start.bat

# macOS/Linux
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

1. **Ensure MongoDB is running**
   - Local: `mongod` command
   - Or use MongoDB Atlas (cloud)

2. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

3. **Access Application**
   - Open browser: `http://localhost:5000`
   - Register: `/pages/register.html`
   - Login: `/pages/login.html`
   - Dashboard: `/pages/dashboard.html`

## Project Structure
```
Habit_Tracker/
├── backend/
│   ├── models/           # User, Habit schemas
│   ├── routes/           # Auth, Habits API
│   ├── middleware/       # JWT authentication
│   ├── server.js         # Express app
│   ├── package.json      # Dependencies
│   └── .env              # Environment config
├── frontend/
│   ├── pages/            # HTML (index, login, register, dashboard)
│   ├── css/              # Styling
│   ├── js/               # Client logic (auth, dashboard)
│   └── index.html        # Home page
├── Dockerfile            # Docker container
├── docker-compose.yml    # Docker multi-container setup
├── Procfile              # Heroku deployment
├── README.md             # Full documentation
├── API_DOCUMENTATION.md  # API endpoints reference
├── DEVELOPMENT.md        # Dev guide
├── start.sh              # Linux/Mac startup
└── start.bat             # Windows startup
```

## Features Implemented
✅ User Registration & Login
✅ JWT Authentication
✅ Create/Read/Update/Delete Habits
✅ Streak Tracking
✅ Habit Categories
✅ Responsive Design
✅ Progress Tracking
✅ Security (Password hashing, CORS)

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/habits` - Get user's habits
- `POST /api/habits` - Create habit
- `PUT /api/habits/:id` - Update habit
- `POST /api/habits/:id/complete` - Mark habit completed
- `DELETE /api/habits/:id` - Delete habit

## Deployment

### Heroku Deployment
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_atlas_url
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

See README.md for detailed deployment instructions.

## Development
- Changes to backend require server restart
- Frontend changes auto-reload
- Check browser console for client errors
- Check terminal for server errors

## Documentation
- README.md - Full overview and deployment guide
- API_DOCUMENTATION.md - Complete API reference
- DEVELOPMENT.md - Development workflow guide
