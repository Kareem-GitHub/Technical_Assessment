# 📝 Task Management Application

A simple full-stack Task Management Application built with a RESTful backend and a modern frontend.  
The app allows users to register, log in, and manage their own tasks securely.

---

## 📦 Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

---

## 🚀 Features

- User registration & login
- JWT-based authentication
- Protected frontend routes
- Create, read, update, delete tasks
- Task status management (pending, in_progress, done)
- Pagination for task list
- Loading and error handling
- Responsive and clean UI

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL
- npm or yarn

---

## 🔙 Backend Setup

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create .env file:
```bash
PORT=5000
DATABASE_URL=postgres://postgres:password@localhost:5432/task_manager
JWT_SECRET=supersecretkey
```
⚠️ Replace postgres, password, and database name with your local credentials.

### 4. Create database:
```bash
CREATE DATABASE task_manager;
```

### 5. Start backend server:
```bash
npm run dev
```
Backend will run at:
```bash
http://localhost:5000
```

## 🎨 Frontend Setup

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start frontend server
```bash
npm run dev
```

### 4. Frontend will run at:
```bash
http://localhost:5173
```
### 🔐 Authentication Flow

1. Users register and log in using email & password

2. Backend returns a JWT token

3. Token is stored in localStorage

4. Token is attached to API requests via Authorization header

5. Protected routes are guarded on frontend and backend

### 📡 API Endpoints

#### Authentication

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | Login user        |

#### Tasks (Protected)

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| POST   | `/tasks`     | Create a new task          |
| GET    | `/tasks`     | Get user tasks (paginated) |
| PUT    | `/tasks/:id` | Update a task              |
| DELETE | `/tasks/:id` | Delete a task              |

#### Pagination Example:
```bash
GET /tasks?page=1&limit=10
```

#### Response:
```bash
{
  "data": [
    {
      "id": 1,
      "title": "Sample Task",
      "description": "Example description",
      "status": "pending",
      "created_at": "2024-01-01T12:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

### 🧠 Assumptions Made

Each task belongs to one user

Users can only access their own tasks

Single user role (no admin roles)

Simple UI without advanced animations

Passwords are hashed before storing

JWT access token only (no refresh token)

No task filtering or search
   

