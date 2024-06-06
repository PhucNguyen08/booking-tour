import express from 'express';
import {
    getSites,
    getSite,
    createSite,
    updateSite,
    deleteSite,
} from '../controllers/siteController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getSites);
router.get('/:id', getSite);
router.post('/create', verifyToken, authorizeAdmin, createSite);
router.put('/:id', verifyToken, authorizeAdmin, updateSite);
router.delete('/:id', verifyToken, authorizeAdmin, deleteSite);

export default router;
