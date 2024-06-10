import express from 'express';
import {
    getOneOrder,
    getOrders,
    getOrdersByUser,
    confirmOrder,
    createOrder,
} from '../controllers/orderController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, authorizeAdmin, getOrders);
router.get('/:id', verifyToken, getOneOrder);
router.get('/list/:userId', verifyToken, getOrdersByUser);
router.post('/create', verifyToken, createOrder);
router.put('/:id', verifyToken, confirmOrder);

export default router;
