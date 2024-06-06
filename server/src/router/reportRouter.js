import express from 'express';
import {
    reportNumberOfOrders,
    reportTotalMoneyOfDay,
    reportTotalMoneyByMonth,
    reportTotalUsers,
} from '../controllers/reportController.js';
import { verifyToken, authorizeAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/detail/order', verifyToken, authorizeAdmin, reportNumberOfOrders);
router.get(
    '/detail/total-money',
    verifyToken,
    authorizeAdmin,
    reportTotalMoneyOfDay
);
router.get(
    '/detail/total-amount-month',
    verifyToken,
    authorizeAdmin,
    reportTotalMoneyByMonth
);
router.get(
    '/detail/total-users',
    verifyToken,
    authorizeAdmin,
    reportTotalUsers
);

export default router;
