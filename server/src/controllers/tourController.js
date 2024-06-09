import { Op } from 'sequelize';
import { Tour, TourImg, TourSite, TourSchedule } from '../models/index.js';
import uploadImage, { deleteImage } from '../utils/uploadImage.js';
import { splitFileName } from '../utils/splitFilename.js';

const createTour = async (req, res, next) => {
    try {
        const {
            typeId,
            departurePlaceId,
            destinationPlaceId,
            tourName,
            tourProgramDesc,
            shortDesc,
            coverImg,
            numberOfDay,
            numberOfNight,
            vehicle,
            images,
            sites,
        } = req.body;

        const coverImgUpload = await uploadImage(coverImg);

        const newTour = await Tour.create({
            typeId,
            departurePlaceId,
            destinationPlaceId,
            tourName,
            tourProgramDesc,
            shortDesc,
            numberOfDay,
            numberOfNight,
            vehicle,
            coverImg: coverImgUpload.secure_url,
        });

        const tour = await newTour.save();

        await images.map(async image => {
            const imgUrl = await uploadImage(image);
            await TourImg.create({
                tourId: newTour.id,
                url: imgUrl.secure_url,
            });
        });

        await sites.map(async site => {
            await TourSite.create({
                tourId: newTour.id,
                siteId: +site.siteId,
                day: site.day,
            });
        });

        res.status(201).json(tour);
    } catch (error) {
        next(error);
    }
};

const getTour = async (req, res, next) => {
    try {
        const tour = await Tour.findByPk(req.params.id, {
            attributes: {
                exclude: ['departurePlaceId', 'destinationPlaceId'],
            },
            include: [
                {
                    model: TourSchedule,
                    as: 'schedules',
                    where: {
                        departureDay: {
                            [Op.gte]: new Date(),
                        },
                    },
                    required: false,
                    include: [
                        {
                            model: Tour,
                            as: 'tourSchedule',
                        },
                    ],
                },
                {
                    model: TourSite,
                    as: 'tourSites',
                },
                'images',
                'departurePlace',
                'destinationPlace',
            ],
            order: [
                [{ model: TourSite, as: 'tourSites' }, 'day', 'ASC'],
                [
                    { model: TourSchedule, as: 'schedules' },
                    'departureDay',
                    'ASC',
                ],
            ],
        });
        res.status(200).json(tour);
    } catch (error) {
        next(error);
    }
};

const getTours = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const tours = await Tour.findAll({
            attributes: {
                exclude: ['departurePlaceId', 'destinationPlaceId'],
            },
            include: [
                'departurePlace',
                'destinationPlace',
                {
                    model: TourSchedule,
                    as: 'schedules',
                    order: [['departureDay', 'ASC']],
                    limit: 1,
                    required: false,
                },
            ],
        });
        res.status(200).json(tours);
    } catch (error) {
        next(error);
    }
};

const updateTour = async (req, res, next) => {
    try {
        const {
            typeId,
            departurePlaceId,
            destinationPlaceId,
            tourName,
            tourProgramDesc,
            shortDesc,
            coverImg,
            numberOfDay,
            numberOfNight,
            vehicle,
            images,
            sites,
        } = req.body;

        const update = {
            typeId: typeId,
            departurePlaceId: departurePlaceId,
            destinationPlaceId: destinationPlaceId,
            tourName: tourName,
            tourProgramDesc: tourProgramDesc,
            shortDesc: shortDesc,
            numberOfDay: numberOfDay,
            numberOfNight: numberOfNight,
            vehicle: vehicle,
        };

        const tour = await Tour.findByPk(req.params.id, {
            attributes: {
                exclude: ['departurePlaceId', 'destinationPlaceId'],
            },
            include: [
                {
                    model: TourImg,
                    as: 'images',
                    attributes: ['id', 'url'],
                },
                'tourSites',
                'departurePlace',
                'destinationPlace',
            ],
        });

        if (tour.coverImg !== coverImg) {
            const fileName = splitFileName(tour.coverImg);
            deleteImage(fileName);

            const coverImgUpload = await uploadImage(coverImg);
            update.coverImg = coverImgUpload.secure_url;
        }

        const existingImageMap = new Map(
            tour.images.map(image => [image.url, image.id])
        );

        const newImageUrls = images.filter(url => !existingImageMap.has(url));

        await newImageUrls.map(async image => {
            const imgUrl = await uploadImage(image);
            await TourImg.create({
                tourId: tour.id,
                url: imgUrl.secure_url,
            });
        });

        const deletedImageIds = tour.images.filter(
            image => !images.includes(image.url)
        );

        await deletedImageIds.map(async image => {
            const fileName = splitFileName(image.url);
            deleteImage(fileName);
            await TourImg.destroy({
                where: {
                    id: image.id,
                },
            });
        });

        await TourSite.destroy({
            where: {
                tourId: tour.id,
            },
        });

        await sites.map(async site => {
            await TourSite.create({
                tourId: tour.id,
                siteId: +site.siteId,
                day: site.day,
            });
        });

        await Tour.update(update, {
            where: {
                id: tour.id,
            },
        });

        res.status(200).json({ message: 'Update successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteTour = async (req, res, next) => {
    try {
        await Tour.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const searchToursPagination = async (req, res, next) => {
    try {
        const { departurePlaceId, destinationPlaceId, typeId, departureDay } =
            req.body;

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const totalTours = await Tour.count();

        const searchTour = {};

        if (departurePlaceId) {
            searchTour.departurePlaceId = +departurePlaceId;
        }

        if (destinationPlaceId) {
            searchTour.destinationPlaceId = +destinationPlaceId;
        }

        if (typeId) {
            searchTour.typeId = +typeId;
        }

        if (
            !departurePlaceId &&
            !destinationPlaceId &&
            !typeId &&
            !departureDay
        ) {
            const toursAll = await Tour.findAll({
                attributes: {
                    exclude: [
                        'departurePlaceId',
                        'destinationPlaceId',
                        'typeId',
                        'shortDesc',
                        'tourProgramDesc',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                include: [
                    'departurePlace',
                    {
                        model: TourSchedule,
                        as: 'schedules',
                        order: [['departureDay', 'ASC']],
                        limit: 1,
                        required: false,
                    },
                ],
                limit: limit,
                offset: offset,
            });
            return res.status(200).json({
                tours: toursAll,
                totalTours: totalTours,
            });
        }
        const tours = await Tour.findAll({
            attributes: {
                exclude: [
                    'departurePlaceId',
                    'destinationPlaceId',
                    'typeId',
                    'shortDesc',
                    'tourProgramDesc',
                    'createdAt',
                    'updatedAt',
                ],
            },
            where: searchTour,
            include: [
                {
                    model: TourSchedule,
                    as: 'schedules',
                    where: {
                        departureDay: {
                            [Op.eq]: departureDay,
                        },
                    },
                    required: false,
                },
                'departurePlace',
            ],
            limit: limit,
            offset: offset,
        });

        res.status(200).json({
            tours: tours,
            totalTours: totalTours,
        });
    } catch (error) {
        next(error);
    }
};

export {
    createTour,
    getTour,
    getTours,
    searchToursPagination,
    updateTour,
    deleteTour,
};
