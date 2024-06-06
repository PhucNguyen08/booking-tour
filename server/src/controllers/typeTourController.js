import TypeTour from '../models/typeTour.js';

const getTypeTours = async (req, res, next) => {
    try {
        const typeTours = await TypeTour.findAll();

        const valueTypeTours = typeTours.map(typeTour => typeTour.dataValues);

        res.status(200).json(valueTypeTours);
    } catch (error) {
        next(error);
    }
};

const getTypeTour = async (req, res, next) => {
    try {
        const typeTour = await TypeTour.findByPk(req.params.id);
        res.status(200).json(typeTour);
    } catch (error) {
        next(error);
    }
};

const createTypeTour = async (req, res, next) => {
    try {
        const { typeName, englishName } = req.body;

        const newTypeTour = await TypeTour.create({
            typeName,
            englishName,
        });

        res.status(201).json(newTypeTour);
    } catch (error) {
        next(error);
    }
};

const updateTypeTour = async (req, res, next) => {
    try {
        const typeTour = await TypeTour.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(typeTour);
    } catch (error) {
        next(error);
    }
};

const deleteTypeTour = async (req, res, next) => {
    try {
        await TypeTour.destroy({
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
    createTypeTour,
    updateTypeTour,
    deleteTypeTour,
    getTypeTour,
    getTypeTours,
};
