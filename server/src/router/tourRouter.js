import express from 'express';
import {
    createTour,
    getTours,
    getTour,
    updateTour,
    searchToursPagination,
} from '../controllers/tourController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', verifyToken, authorizeAdmin, createTour);
router.post('/search/all', searchToursPagination);
router.get('/', getTours);
router.get('/:id', getTour);
router.put('/:id', verifyToken, authorizeAdmin, updateTour);

export default router;
