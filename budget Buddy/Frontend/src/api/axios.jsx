import axios from 'axios';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // Make sure the variable is prefixed with VITE_
  timeout: 10000, 
});

export default apiInstance;
