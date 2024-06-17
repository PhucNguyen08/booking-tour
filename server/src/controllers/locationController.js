import { Op } from 'sequelize';
import Location from '../models/location.js';

const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.findAll({
            include: 'parent',
            // where: {
            //     parentId: {
            //         [Op.not]: null,
            //     },
            // },
            order: [['locationName', 'ASC']],
        });

        const valueLocations = locations.map(location => location.dataValues);

        res.status(200).json(valueLocations);
    } catch (error) {
        next(error);
    }
};

const getParentLocations = async (req, res, next) => {
    try {
        const locations = await Location.findAll({
            include: 'parent',
            where: {
                parentId: {
                    [Op.is]: null,
                },
            },
        });

        const valueLocations = locations.map(location => location.dataValues);

        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
};

const getLocation = async (req, res, next) => {
    try {
        const location = await Location.findByPk(req.params.id);
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
};

const createLocation = async (req, res, next) => {
    try {
        const { locationName, parentId } = req.body;

        const newLocation = await Location.create({
            locationName,
            parentId: parentId ? +parentId : null,
        });

        res.status(201).json(newLocation);
    } catch (error) {
        next(error);
    }
};

const updateLocation = async (req, res, next) => {
    try {
        const updateData = {
            locationName: req.body.locationName,
        };

        if (req.body.parentId) {
            updateData.parentId = req.body.parentId;
        }

        const location = await Location.update(updateData, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
};

const deleteLocation = async (req, res, next) => {
    try {
        await Location.destroy({
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
    createLocation,
    updateLocation,
    deleteLocation,
    getLocations,
    getParentLocations,
    getLocation,
};
