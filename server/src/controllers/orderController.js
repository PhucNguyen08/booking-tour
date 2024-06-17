import { Order, User, TourSchedule, OrderDetail } from '../models/index.js';
import { createPayment } from './paymentController.js';
import bcrypt from 'bcryptjs';
import transporter from '../email/email.js';
import dotenv from 'dotenv';
dotenv.config();

const createOrder = async (req, res, next) => {
    try {
        const {
            tourScheduleId,
            numberOfChild,
            numberOfAdult,
            totalPrice,
            clients,
            paymentMethod,
        } = req.body;

        const tourSchedule = await TourSchedule.findByPk(tourScheduleId);

        if (
            tourSchedule.maxParticipants -
                tourSchedule.numberOfParticipantsBooked -
                numberOfChild -
                numberOfAdult <
            0
        ) {
            return res
                .status(404)
                .send({ message: 'Số lượng đặt vượt quá số chỗ còn lại' });
        }

        const order = await Order.create({
            tourScheduleId,
            userId: +req.userId,
            numberOfChild,
            numberOfAdult,
            totalPrice,
        });

        const users = [];

        for (const user of clients) {
            const checkUser = await User.findOne({
                where: {
                    account: user.phoneNumber,
                },
            });

            if (!checkUser) {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync('123456', salt);

                const newUser = await User.create({
                    account: user.phoneNumber,
                    birthDate: user.birthDate,
                    email: user.email,
                    password: passwordHash,
                    fullName: user.fullName,
                });

                users.push(newUser.dataValues.id);
            } else {
                users.push(checkUser.id);
            }
        }

        for (const user of users) {
            await OrderDetail.create({
                userId: user,
                orderId: order.dataValues.id,
            });
        }

        if (paymentMethod === 'direct') {
            res.status(201).json({ message: 'Success' });
        } else {
            const newPayment = await createPayment({
                id: order.dataValues.id,
                totalAmount: +totalPrice,
            });

            res.status(201).json({ url: newPayment });
        }
    } catch (error) {
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            attributes: {
                exclude: ['userId'],
            },
            include: ['userOrder'],
            order: [['createdAt', 'DESC']],
        });

        const valueOrders = orders.map(order => order.dataValues);

        res.status(200).json(valueOrders);
    } catch (error) {
        next(error);
    }
};

const getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            attributes: {
                exclude: ['userId'],
            },
            include: ['userOrder', User],
        });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']],
        });

        const valueOrders = orders.map(order => order.dataValues);

        res.status(200).json(valueOrders);
    } catch (error) {
        next(error);
    }
};

const confirmOrder = async (req, res, next) => {
    try {
        const oneOrder = await Order.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        const order = await Order.findByPk(req.params.id);

        const tourSchedule = await TourSchedule.findByPk(order.tourScheduleId);

        const totalParticipants = order.numberOfChild + order.numberOfAdult;

        const availableParticipants =
            tourSchedule.maxParticipants -
            tourSchedule.numberOfParticipantsBooked -
            totalParticipants;

        await TourSchedule.update(
            {
                numberOfParticipantsBooked:
                    tourSchedule.numberOfParticipantsBooked + totalParticipants,
                status:
                    availableParticipants === 0 ? 'full' : tourSchedule.status,
            },
            {
                where: {
                    id: order.tourScheduleId,
                },
            }
        );

        const options = {
            from: process.env.EMAIL_LOGIN,
            to: 'npnguyen812@gmail.com',
            subject: 'Đơn xác nhận đặt tour du lịch',
            html: req.body.detail,
        };

        await transporter.sendMail(options);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Successfully' });
    } catch (error) {
        next(error);
    }
};

export { getOrders, getOneOrder, confirmOrder, createOrder, getOrdersByUser };
