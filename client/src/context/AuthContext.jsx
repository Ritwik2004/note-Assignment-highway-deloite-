import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL
})

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);