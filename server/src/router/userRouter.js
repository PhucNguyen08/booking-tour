import express from 'express';
import {
    getUser,
    getProfile,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePasswordUser,
} from '../controllers/userController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/token/getProfile', getProfile);
router.post('/create', verifyToken, authorizeAdmin, createUser);
router.put('/:id', verifyToken, updateUser);
router.put('/change/c-password', verifyToken, changePasswordUser);
router.delete('/:id', verifyToken, authorizeAdmin, deleteUser);

export default router;
