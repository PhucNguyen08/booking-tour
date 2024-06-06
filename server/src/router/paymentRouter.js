import express from 'express';
import { payment, callback } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', payment);
router.post('/callback', callback);

export default router;
