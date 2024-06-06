import express from 'express';
import {
    createTourSchedule,
    getTourSchedules,
    getTourSchedule,
    getClientTourSchedule,
    getClient,
    updateTourSchedule,
    deleteTourSchedule,
} from '../controllers/tourScheduleController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getTourSchedules);
router.get('/detail/client/:tourSchId', getClient);
// router.get('/v2/detail/client/:tourSchId', getClient);
router.get('/:id', getTourSchedule);
router.post('/create', verifyToken, authorizeAdmin, createTourSchedule);
router.put('/:id', verifyToken, authorizeAdmin, updateTourSchedule);
router.delete('/:id', verifyToken, authorizeAdmin, deleteTourSchedule);

export default router;
