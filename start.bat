@echo off
REM Habit Tracker Quick Start for Windows

echo.
echo ========================================
echo   Habit Tracker - Quick Start
echo ========================================
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo MongoDB found locally. Starting MongoDB...
    start mongod
    timeout /t 3
) else (
    echo MongoDB not found locally.
    echo Please either:
    echo 1. Install MongoDB from https://www.mongodb.com/try/download/community
    echo 2. Use MongoDB Atlas (free cloud option)
    echo.
    echo To use MongoDB Atlas:
    echo - Create account at https://www.mongodb.com/cloud/atlas
    echo - Create a cluster
    echo - Get connection string
    echo - Update MONGODB_URI in backend\.env
    echo.
    set /p continue="Press Enter to continue with MongoDB Atlas..."
)

echo.
echo Starting backend server...
cd backend
start cmd /k npm start

echo.
echo Backend is starting on http://localhost:5000
echo.
echo Opening application in browser...
timeout /t 3
start http://localhost:5000

echo.
echo ========================================
echo Application is ready!
echo ========================================
echo.
echo Home:      http://localhost:5000
echo Register:  http://localhost:5000/pages/register.html
echo Login:     http://localhost:5000/pages/login.html
echo.
echo To stop the server, close the terminal window.
echo.
pause
