import axios from 'axios';
import conf from '../config/conf.js';


const axiosInstance = axios.create({
  baseURL: `${conf.backendUrl}`,
  withCredentials: true,
});

export default axiosInstance;