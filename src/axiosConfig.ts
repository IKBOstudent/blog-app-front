import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blog-app-server-docker.onrender.com/',
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (config.headers) config.headers.Authorization = token || '';

    return config;
});

export default instance;
