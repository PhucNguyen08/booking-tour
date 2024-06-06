import express from 'express';
import {
    createCommentTour,
    getCommentsTour,
} from '../controllers/commentTourController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createCommentTour);
router.get('/:id', getCommentsTour);

export default router;
