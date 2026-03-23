import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  auth: {
    username: import.meta.env.VITE_REACT_APP_API_USER,
    password: import.meta.env.VITE_REACT_APP_API_PASS,
  },
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_REACT_APP_API_KEY,
  },
});

export default api;