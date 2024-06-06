import { TourSchedule, Order, User, Tour } from '../models/index.js';
import sequelize from '../database/db.js';

const getTourSchedules = async (req, res, next) => {
    try {
        const tourSchedules = await TourSchedule.findAll({
            order: [['departureDay', 'DESC']],
            include: [
                {
                    model: Tour,
                    as: 'tourSchedule',
                    attributes: ['tourName'],
                },
            ],
        });

        const valueTourSchedules = tourSchedules.map(tour => tour.dataValues);

        res.status(200).json(valueTourSchedules);
    } catch (error) {
        next(error);
    }
};

const getTourSchedule = async (req, res, next) => {
    try {
        const tourSchedule = await TourSchedule.findByPk(req.params.id, {
            include: [
                {
                    model: Tour,
                    as: 'tourSchedule',
                    attributes: ['tourName'],
                },
            ],
        });
        res.status(200).json(tourSchedule);
    } catch (error) {
        next(error);
    }
};

const getClientTourSchedule = async (req, res, next) => {
    try {
        const query = `SELECT users.* FROM users, orders, orderdetails 
        WHERE users.id = orderdetails.userId AND orders.id = orderdetails.orderId 
        AND orders.tourScheduleId = :tourScheduleId AND orders.status = 'confirm' `;

        const replacements = {
            tourScheduleId: req.params.tourSchId,
        };

        const results = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

const getClient = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: [
                    'password',
                    'avatar',
                    'isAdmin',
                    'createdAt',
                    'updatedAt',
                ],
            },
            include: [
                {
                    model: Order,
                    where: {
                        status: 'confirm',
                    },
                    include: [
                        {
                            model: TourSchedule,
                            as: 'tourSch',
                            where: {
                                id: req.params.tourSchId,
                            },
                        },
                    ],
                },
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const createTourSchedule = async (req, res, next) => {
    try {
        const {
            tourId,
            departureDay,
            returnDay,
            childPrice,
            adultPrice,
            maxParticipants,
        } = req.body;

        const newTourSchedule = await TourSchedule.create({
            tourId,
            departureDay,
            returnDay,
            childPrice,
            adultPrice,
            maxParticipants,
        });

        res.status(201).json(newTourSchedule);
    } catch (error) {
        next(error);
    }
};

const updateTourSchedule = async (req, res, next) => {
    try {
        const tourSchedule = await TourSchedule.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(tourSchedule);
    } catch (error) {
        next(error);
    }
};

const deleteTourSchedule = async (req, res, next) => {
    try {
        await TourSchedule.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export {
    getTourSchedules,
    getTourSchedule,
    getClientTourSchedule,
    createTourSchedule,
    updateTourSchedule,
    deleteTourSchedule,
    getClient,
};
