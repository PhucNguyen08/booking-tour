import express from 'express';
import {
    getTypeTours,
    getTypeTour,
    createTypeTour,
    updateTypeTour,
    deleteTypeTour,
} from '../controllers/typeTourController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTypeTours);
router.get('/:id', getTypeTour);
router.post('/create', verifyToken, authorizeAdmin, createTypeTour);
router.put('/:id', verifyToken, authorizeAdmin, updateTypeTour);
router.delete('/:id', verifyToken, authorizeAdmin, deleteTypeTour);

export default router;
