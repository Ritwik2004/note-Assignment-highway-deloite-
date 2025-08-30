import express from 'express';
import { createNote, fetchNote } from '../controllers/noteController.js';

const Noterouter = express.Router();

Noterouter.get('/create',protectRoute,createNote)
Noterouter.get('/fetchNote',protectRoute,fetchNote)
Noterouter.get('/deleteNote',protectRoute,deleteNote)

export default Noterouter;