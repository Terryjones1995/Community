import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5002/api', // Ensure the port matches your backend
});

export default api;