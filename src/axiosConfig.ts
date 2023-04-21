import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
});

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (config.headers) config.headers.Authorization = token || '';

    return config;
});

export default instance;
