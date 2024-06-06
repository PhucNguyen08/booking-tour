import { News } from '../models/index.js';
import uploadImage, { deleteImage } from '../utils/uploadImage.js';
import { splitFileName } from '../utils/splitFilename.js';

const getNews = async (req, res, next) => {
    try {
        const news = await News.findAll({
            attributes: {
                exclude: ['userId'],
            },
            include: ['userNews'],
        });

        const valueNews = news.map(location => location.dataValues);

        res.status(200).json(valueNews);
    } catch (error) {
        next(error);
    }
};

const getOneNews = async (req, res, next) => {
    try {
        const oneNews = await News.findByPk(req.params.id, {
            include: 'userNews',
        });
        res.status(200).json(oneNews);
    } catch (error) {
        next(error);
    }
};

const createNews = async (req, res, next) => {
    try {
        const { title, coverImg, content } = req.body;

        const coverImgUpload = await uploadImage(coverImg);

        const news = await News.create({
            userId: +req.userId,
            title,
            content,
            coverImg: coverImgUpload.secure_url,
        });

        res.status(201).json(news);
    } catch (error) {
        next(error);
    }
};

const updateNews = async (req, res, next) => {
    try {
        const { title, content, coverImg } = req.body;

        const update = {
            title: title,
            content: content,
            coverImg: coverImg,
        };

        const oneNews = await News.findByPk(req.params.id);

        if (oneNews.coverImg !== coverImg) {
            const fileName = splitFileName(oneNews.coverImg);
            deleteImage(fileName);

            const coverImgUpload = await uploadImage(coverImg);
            update.coverImg = coverImgUpload.secure_url;
        }

        await News.update(update, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({
            message: 'Updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

const deleteNews = async (req, res, next) => {
    try {
        const oneNews = await News.findByPk(req.params.id);

        const fileName = splitFileName(oneNews.coverImg);
        deleteImage(fileName);

        await News.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export { createNews, updateNews, deleteNews, getNews, getOneNews };
