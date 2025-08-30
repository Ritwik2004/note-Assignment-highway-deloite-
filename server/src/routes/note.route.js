import express from 'express';
import { createNote, deleteNote, fetchNote } from '../controllers/noteController.js';
import { protectRoute } from '../middlewire/auth.middlewire.js';

const Noterouter = express.Router();

Noterouter.post('/create',protectRoute,createNote)
Noterouter.get('/fetchNote',protectRoute,fetchNote)
Noterouter.get('/deleteNote',protectRoute,deleteNote)

export default Noterouter;