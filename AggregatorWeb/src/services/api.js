import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-aggregator-backend-jd0a.onrender.com/api/v1/ai',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export default api;