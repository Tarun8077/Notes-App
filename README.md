# Notes App

A full-stack Notes application with user authentication, role-based access (User/Admin), and full CRUD for notes.

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- Swagger (swagger-jsdoc + swagger-ui-express)

**Frontend**
- React + Vite
- React Router
- Axios

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Role-based access (User / Admin)
- CRUD APIs for a Notes entity
- API validation and centralized error handling
- Swagger API documentation at `/api-docs`
- React frontend with Login, Register, and Dashboard pages
- JWT stored in localStorage with protected routes

## Folder Structure

```
notes-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── noteValidator.js
│   ├── swagger.js
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── .gitignore
    └── package.json
```

## Prerequisites

- Node.js (v18 or later)
- MongoDB (running locally or a MongoDB Atlas connection string)

## Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Then set your values:

   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/notes_app
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=1d
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The API runs at `http://localhost:5000`.

## Swagger Documentation

Once the backend is running, open:

```
http://localhost:5000/api-docs
```

## Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint            | Description         | Access  |
| ------ | ------------------- | ------------------- | ------- |
| POST   | `/api/auth/register` | Register a new user | Public  |
| POST   | `/api/auth/login`    | Log in a user       | Public  |

### Notes

| Method | Endpoint         | Description                              | Access  |
| ------ | ---------------- | ---------------------------------------- | ------- |
| POST   | `/api/notes`     | Create a note                            | Private |
| GET    | `/api/notes`     | Get notes (own for user, all for admin)  | Private |
| GET    | `/api/notes/:id` | Get a single note                        | Private |
| PUT    | `/api/notes/:id` | Update a note                            | Private |
| DELETE | `/api/notes/:id` | Delete a note                            | Private |

## Notes on Roles

- A **user** can only view and manage their own notes.
- An **admin** can view all notes. To create an admin, send `"role": "admin"` in the registration request body.
