import axios from 'axios';

export const BASE_URL = 'https://marathon-api.clevertec.ru';

export const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
