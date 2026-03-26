# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-deployed-url.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens are obtained from `/auth/login` or `/auth/register` responses.

---

## Endpoints

### Authentication Endpoints

#### 1. Register User
**POST** `/auth/register`

Request body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

#### 3. Get Current User
**GET** `/auth/me`

Headers: `Authorization: Bearer {token}`

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-03-26T10:30:00.000Z"
}
```

---

#### 4. Logout User
**POST** `/auth/logout`

Headers: `Authorization: Bearer {token}`

Response (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### Habit Endpoints

#### 1. Get All Habits
**GET** `/habits`

Headers: `Authorization: Bearer {token}`

Response (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "Morning Exercise",
    "description": "30 minutes of cardio",
    "category": "fitness",
    "frequency": "daily",
    "completedDates": ["2024-03-25T00:00:00.000Z"],
    "streak": 5,
    "createdAt": "2024-03-20T10:30:00.000Z",
    "updatedAt": "2024-03-25T10:30:00.000Z"
  }
]
```

---

#### 2. Create Habit
**POST** `/habits`

Headers: `Authorization: Bearer {token}`

Request body:
```json
{
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "category": "fitness",
  "frequency": "daily"
}
```

Response (201):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "category": "fitness",
  "frequency": "daily",
  "completedDates": [],
  "streak": 0,
  "createdAt": "2024-03-26T10:30:00.000Z",
  "updatedAt": "2024-03-26T10:30:00.000Z"
}
```

---

#### 3. Update Habit
**PUT** `/habits/:id`

Headers: `Authorization: Bearer {token}`

Request body:
```json
{
  "name": "Morning Workout",
  "description": "Updated description"
}
```

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Morning Workout",
  "description": "Updated description",
  "category": "fitness",
  "frequency": "daily",
  "completedDates": ["2024-03-25T00:00:00.000Z"],
  "streak": 5,
  "createdAt": "2024-03-20T10:30:00.000Z",
  "updatedAt": "2024-03-26T10:30:00.000Z"
}
```

---

#### 4. Complete Habit (Mark as Done Today)
**POST** `/habits/:id/complete`

Headers: `Authorization: Bearer {token}`

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Morning Exercise",
  "completedDates": ["2024-03-25T00:00:00.000Z", "2024-03-26T00:00:00.000Z"],
  "streak": 6,
  "updatedAt": "2024-03-26T10:30:00.000Z"
}
```

---

#### 5. Delete Habit
**DELETE** `/habits/:id`

Headers: `Authorization: Bearer {token}`

Response (200):
```json
{
  "message": "Habit deleted"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "All fields are required"
}
```

### 401 - Unauthorized
```json
{
  "message": "Token is not valid"
}
```

### 404 - Not Found
```json
{
  "message": "Habit not found"
}
```

### 500 - Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Categories

- `health` - Health-related habits
- `fitness` - Exercise and fitness
- `learning` - Educational goals
- `productivity` - Work and productivity
- `other` - Other habits

## Frequencies

- `daily` - Every day
- `weekly` - Once per week
- `monthly` - Once per month

---

## Testing the API

You can test these endpoints using:

1. **Postman** - Import the endpoints and test manually
2. **cURL** - Command-line testing
3. **Frontend UI** - Use the provided web interface

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider adding rate limiting middleware.

## CORS

CORS is enabled for development. Update in `backend/server.js` for production.

## Security Notes

- Always use HTTPS in production
- Change JWT_SECRET to a strong, random string
- Never commit `.env` files to version control
- Use environment-specific configurations
- Validate all user inputs
- Keep dependencies updated
