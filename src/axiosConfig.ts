import axios from "axios";

const instance = axios.create({
    baseURL: String(process.env.REACT_APP_API_URL),
});

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem("token");
    if (config.headers) config.headers.Authorization = token || "";

    return config;
});

export default instance;
