import { Site } from '../models/index.js';

const getSites = async (req, res, next) => {
    try {
        const sites = await Site.findAll({
            include: 'location',
        });

        const valueSites = sites.map(location => location.dataValues);

        res.status(200).json(valueSites);
    } catch (error) {
        next(error);
    }
};

const getSite = async (req, res, next) => {
    try {
        const site = await Site.findByPk(req.params.id, {
            include: 'location',
        });
        res.status(200).json(site);
    } catch (error) {
        next(error);
    }
};

const createSite = async (req, res, next) => {
    try {
        const { locationId, siteName, siteNote } = req.body;

        const newSite = await Site.create({
            locationId,
            siteName,
            siteNote,
        });

        res.status(201).json(newSite);
    } catch (error) {
        next(error);
    }
};

const updateSite = async (req, res, next) => {
    try {
        const site = await Site.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(site);
    } catch (error) {
        next(error);
    }
};

const deleteSite = async (req, res, next) => {
    try {
        await Site.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export { createSite, updateSite, deleteSite, getSites, getSite };
