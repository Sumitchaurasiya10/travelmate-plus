import axios from 'axios';

const API = axios.create({ 
  // baseURL:'http://localhost:5000/api'
  //baseURL:'https://travelmate-plus.onrender.com'
  baseURL:process.env.REACT_APP_BASE_URL || "http://localhost:5000/api"
 });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export default API;
