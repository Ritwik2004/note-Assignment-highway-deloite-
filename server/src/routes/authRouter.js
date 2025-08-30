import express from 'express';
import { googleLogin } from '../controllers/authController.js';

const Authrouter = express.Router();


Authrouter.get('/test', (req, res) => {
    res.send('Test route');
});

Authrouter.get('/google',googleLogin)

export default Authrouter;