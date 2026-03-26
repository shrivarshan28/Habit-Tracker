# Debugging Troubleshooting Guide

## Issue: Login/Register shows "Connection Error"

### Check These Steps (in order):

### 1. **MongoDB Running?** (CRITICAL)
```powershell
# Windows - Open PowerShell and run:
mongod

# If you don't have MongoDB installed locally, use MongoDB Atlas instead:
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create a cluster
# 4. Get connection string
# 5. Update backend\.env MONGODB_URI
```

### 2. **Backend Server Running?**
```powershell
# Open new PowerShell terminal and run:
cd d:\Java\ Workspaces\Habit_Tracker\backend
npm start
```

**You should see:**
```
Server running on port 5000
MongoDB connected
```

If you see **"MongoDB connection error"**, it means MongoDB isn't running or the URI is wrong.

### 3. **Check Browser Console**
- Open browser Developer Tools (F12)
- Go to Console tab
- Try to login/register
- Look for error messages
- Send me the error details

### 4. **Verify API is working**
Open new PowerShell and test:
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -Headers @{'Content-Type'='application/json'} `
  -Body '{"email":"test@example.com","password":"password123"}'
```

Should return JSON response (either error or success data).

### 5. **Check if port 5000 is in use**
```powershell
netstat -ano | findstr :5000
```

If shows something, port is in use. Stop other apps using port 5000.

---

## Solution: Quick Start

### Windows (Recommended):
1. **Start MongoDB** (if local):
```powershell
mongod
```

2. **Open new PowerShell**:
```powershell
cd d:\Java\ Workspaces\Habit_Tracker\backend
npm start
```

3. **Open browser**:
```
http://localhost:5000
```

4. **Register & Login** - Should work now!

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot connect to server" | Start backend: `cd backend && npm start` |
| "MongoDB connection error" | Start MongoDB: `mongod` OR use MongoDB Atlas |
| Port 5000 already in use | Kill process: `netstat -ano \| findstr :5000` then stop it |
| User already exists | Register with different email |
| Passwords don't match | Check both password fields match exactly |

---

## Need Help?

1. Run the commands above step by step
2. Take screenshot of any errors
3. Check browser console (F12 → Console tab)
4. Check backend terminal output
5. Share what you see

---

## Files I Fixed:
✅ `frontend/pages/login.html` - Added auth.js script
✅ `frontend/pages/register.html` - Added auth.js script  
✅ `frontend/js/register.js` - Better error messages
✅ `frontend/js/login.js` - Better error messages
✅ `backend/routes/habits.js` - Fixed deprecated MongoDB methods

Now try again! 🚀
