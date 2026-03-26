# Habit Tracker - Build Better Habits 🚀

A full-stack web application for tracking daily habits, building streaks, and achieving personal goals. Perfect for upskilling, fitness, learning, and productivity tracking.

## Features

✅ **User Authentication** - Secure login and registration with JWT  
✅ **Habit Management** - Create, edit, and delete habits  
✅ **Streak Tracking** - Monitor your daily streaks  
✅ **Multiple Categories** - Health, Fitness, Learning, Productivity, and More  
✅ **Beautiful Dashboard** - Track all your habits in one place  
✅ **Full-Stack Application** - Node.js + Express + MongoDB + Vanilla JS  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Ready for Deployment** - Deploy to Heroku, Vercel, or any cloud platform  

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- RESTful API integration

**Deployment:**
- Heroku ready
- MongoDB Atlas compatible
- Environment-based configuration

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone this repository**
```bash
git clone <repository-url>
cd Habit_Tracker
```

2. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

3. **Setup environment variables**
Create a `.env` file in the backend folder:
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

Update the `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
```

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Start the backend server**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

6. **Open the frontend**
In your browser, navigate to:
```
http://localhost:5000
```

The app will automatically serve the frontend files from the backend.

## Project Structure

```
Habit_Tracker/
├── backend/
│   ├── models/               # Database models (User, Habit)
│   ├── routes/               # API routes (auth, habits)
│   ├── middleware/           # Authentication middleware
│   ├── server.js             # Express app setup
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (create from .env.example)
├── frontend/
│   ├── pages/                # HTML pages (login, register, dashboard)
│   ├── css/                  # Styling
│   ├── js/                   # Client-side JavaScript
│   └── index.html            # Home page
├── .gitignore
├── package.json              # Root configuration
├── Procfile                  # Heroku deployment
├── app.json                  # Heroku app manifest
└── README.md                 # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Habits
- `GET /api/habits` - Get all habits for user
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/:id` - Update a habit
- `POST /api/habits/:id/complete` - Mark habit as completed
- `DELETE /api/habits/:id` - Delete a habit

## Usage

1. **Register** - Go to `/pages/register.html` and create an account
2. **Login** - Enter your credentials on `/pages/login.html`
3. **Create Habits** - Navigate to dashboard and click "Add New Habit"
4. **Track Progress** - Click "Complete Today" to mark your habit done
5. **View Stats** - See your streak and completion count
6. **Manage Habits** - Edit or delete habits as needed

## Deployment

### Option 1: Deploy to Heroku

1. **Create a Heroku account** at https://www.heroku.com

2. **Install Heroku CLI**
```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku
```

3. **Login to Heroku**
```bash
heroku login
```

4. **Create a Heroku app**
```bash
heroku create your-app-name
```

5. **Create MongoDB Atlas**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string

6. **Set environment variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_url
heroku config:set JWT_SECRET=your_super_secret_key
```

7. **Deploy**
```bash
git push heroku main
```

8. **Open your app**
```bash
heroku open
```

### Option 2: Deploy to Vercel (Frontend Only)

For full-stack deployment with Vercel, follow the Express.js serverless guide.

### Option 3: Deploy to Your Own Server

1. Setup Node.js and MongoDB on your server
2. Clone the repository
3. Install dependencies
4. Set environment variables
5. Start the server using PM2 or similar process manager

## Development

### Run in development mode with auto-reload
```bash
cd backend
npm run dev
```

### View logs
```bash
# Heroku
heroku logs --tail

# Local
# Check terminal output
```

## Troubleshooting

**Cannot connect to MongoDB:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas: whitelist your IP in network settings

**CORS errors:**
- Backend CORS is configured for localhost
- Update CORS settings in `backend/server.js` for production

**API calls failing:**
- Check if backend server is running on port 5000
- Verify environment variables are set correctly
- Check browser console for detailed errors

**Login/Register issues:**
- Clear browser's localStorage: `localStorage.clear()`
- Check network tab in developer tools for API responses

## Future Enhancements

- ✨ Social features (share habits, follow friends)
- 📊 Advanced analytics and charts
- 🔔 Push notifications for reminders
- 📱 Mobile app (React Native)
- 🎯 AI-powered habit recommendations
- 🌙 Dark mode theme
- 📤 Export data as PDF/CSV

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the code comments
3. Open an issue on GitHub

## Author

Created for personal growth and upskilling goals. Happy tracking! 🎯

---

**Get Started Today:** Track your habits, build your future! 🚀
