import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Your backend API URL
  withCredentials: true, // Ensure cookies (like JWT) are sent with requests
});

export default axiosInstance;