import axios from 'axios';
import { auth } from './stores/authStore';
import { get } from 'svelte/store';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const authStore = get(auth);
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
});

export default api;