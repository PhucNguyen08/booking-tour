import { CommentTour, User } from '../models/index.js';

import io from '../socket/socket.js';

const createCommentTour = async (req, res, next) => {
    try {
        const { tourId, content } = req.body;

        const newComment = await CommentTour.create({
            userId: +req.userId,
            tourId: +tourId,
            content: content,
        });

        io.emit('comment-response', { comment: newComment });

        res.status(200).json({ comment: newComment });
    } catch (error) {
        next(error);
    }
};

const getCommentsTour = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const totalComments = await CommentTour.count({
            where: {
                tourId: req.params.id,
            },
        });

        const commentTours = await CommentTour.findAll({
            attributes: {
                exclude: ['userId', 'tourId'],
            },
            where: {
                tourId: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: 'userComment',
                    attributes: ['fullName', 'avatar'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset,
        });

        res.status(200).json({
            comments: commentTours,
            totalComments: totalComments,
        });
    } catch (error) {
        next(error);
    }
};

export { createCommentTour, getCommentsTour };
