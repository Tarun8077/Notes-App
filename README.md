# Notes App

A full-stack Notes App built with React, Node.js, Express, MongoDB, JWT Authentication, and Role-Based Access (User/Admin).

## Live Demo

### Frontend
https://notes-work-app.netlify.app

### Backend API
https://notes-app-backend-jban.onrender.com

## GitHub Repository

https://github.com/Tarun8077/Notes-App

## Features

- User Registration & Login
- JWT Authentication
- User & Admin Roles
- Create, Read, Update, Delete Notes
- MongoDB Atlas
- REST API
- Responsive UI

## Tech Stack

- React (Vite)
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Axios

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Backend `.env`

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

## API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/notes
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id