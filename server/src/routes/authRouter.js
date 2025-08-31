import express from 'express';
import { googleLogin, login, signup } from '../controllers/authController.js';

const Authrouter = express.Router();


Authrouter.get('/test', (req, res) => {
    res.send('Test route');
});

Authrouter.get('/google',googleLogin)
Authrouter.post('/signup',signup)
Authrouter.post('/signin',login)

export default Authrouter;