import axios from "axios";

// Central axios instance pointing to the backend API
const api = axios.create({
  baseURL: "https://notes-app-backend-jban.onrender.com/api",
});

// Attach the JWT (from localStorage) to every request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
