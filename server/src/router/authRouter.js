import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyToken, logout);

export default router;
