import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4001', // Replace with your API base URL
    timeout: 10000, // Optional: Set timeout for requests
})

export default axiosInstance