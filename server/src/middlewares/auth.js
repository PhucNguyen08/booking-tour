import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            next(createError(403, 'Access Denied'));
        }

        const decoded = jwt.verify(token, process.env.TOKEN);

        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;

        next();
    } catch (e) {
        next(createError(401, 'Please authenticate'));
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.userId && req.isAdmin) {
        next();
    } else {
        res.status(401).send('Not authorized as an admin.');
    }
};

export { verifyToken, authorizeAdmin };
