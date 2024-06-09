import express from 'express';
import {
    getLocations,
    getParentLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation,
} from '../controllers/locationController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getLocations);
router.get('/parent/list', getParentLocations);
router.post('/create', verifyToken, authorizeAdmin, createLocation);
router.get('/:id', getLocation);
router.put('/:id', verifyToken, authorizeAdmin, updateLocation);
router.delete('/:id', verifyToken, authorizeAdmin, deleteLocation);

export default router;
