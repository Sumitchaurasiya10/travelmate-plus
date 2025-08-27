import axios from "axios";

// If deployed on Netlify, set REACT_APP_BASE_URL in Netlify environment variables
// Example: https://travelmate-plus.onrender.com/api
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
