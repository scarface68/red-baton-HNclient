import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;