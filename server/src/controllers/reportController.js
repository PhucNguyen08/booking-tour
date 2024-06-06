import { Order, User } from '../models/index.js';
import { Op } from 'sequelize';

const reportNumberOfOrders = async (req, res, next) => {
    try {
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        const NOW = new Date();

        const { count } = await Order.findAndCountAll({
            where: {
                status: 'confirm',
                createdAt: {
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW,
                },
            },
        });

        res.status(200).json({ count: count });
    } catch (error) {
        next(error);
    }
};

const reportTotalMoneyOfDay = async (req, res, next) => {
    try {
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        const NOW = new Date();
        const sumPriceOfDay = await Order.sum('totalPrice', {
            where: {
                status: 'confirm',
                createdAt: {
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW,
                },
            },
        });

        res.status(200).json({ sum: sumPriceOfDay });
    } catch (error) {
        next(error);
    }
};

const reportTotalMoneyByMonth = async (req, res, next) => {
    try {
        const currentYear = new Date().getFullYear();

        const monthlyRevenue = [];

        for (let month = 1; month <= 12; month++) {
            const firstDayOfMonth = new Date(currentYear, month - 1, 1);
            const lastDayOfMonth = new Date(currentYear, month, 0);

            const sumPriceOfMonth = await Order.sum('totalPrice', {
                where: {
                    status: 'confirm',
                    createdAt: {
                        [Op.gte]: firstDayOfMonth,
                        [Op.lte]: lastDayOfMonth,
                    },
                },
            });

            monthlyRevenue.push({
                month,
                revenue: sumPriceOfMonth || 0,
            });
        }

        res.status(200).json(monthlyRevenue);
    } catch (error) {
        next(error);
    }
};

const reportTotalUsers = async (req, res, next) => {
    try {
        const users = await User.count({
            where: {
                isAdmin: false,
            },
        });

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export {
    reportNumberOfOrders,
    reportTotalMoneyOfDay,
    reportTotalMoneyByMonth,
    reportTotalUsers,
};
