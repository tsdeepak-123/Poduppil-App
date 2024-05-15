import axios from 'axios';
import { getToken } from './AuthService';


// const BASE_URL = 'http://192.168.1.9:5003/admin';
const BASE_URL = 'https://server.poduppilconstructions.com/admin';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {axiosInstance}