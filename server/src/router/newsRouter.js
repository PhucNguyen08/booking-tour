import express from 'express';
import {
    getNews,
    getOneNews,
    createNews,
    updateNews,
    deleteNews,
} from '../controllers/newsController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getOneNews);
router.post('/create', verifyToken, authorizeAdmin, createNews);
router.put('/:id', verifyToken, authorizeAdmin, updateNews);
router.delete('/:id', verifyToken, authorizeAdmin, deleteNews);

export default router;
