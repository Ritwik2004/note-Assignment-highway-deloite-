import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL
})

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
export const Signup = (body) => api.post('/auth/signup', body);
export const Signin = (body) => api.post('/auth/signin', body);
export const createNote = (body, head) => api.post('/note/create', body, head);
export const fetchNotes = (head) => api.get('/note/fetchNote', head);
export const deleteNotes = (id, head) => api.delete(`/note/deleteNote/${id}`, head);
export const sendOtp = (email) => api.post('/otp/send-otp', {email});
export const verifyOtp = (email, otp) => api.post('/otp/verify-otp', {email,otp});
