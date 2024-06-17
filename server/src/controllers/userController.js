import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uploadImage, { deleteImage } from '../utils/uploadImage.js';
import { splitFileName } from '../utils/splitFilename.js';

const createUser = async (req, res, next) => {
    try {
        const { fullName, account, password, email, isAdmin } = req.body;

        const user = await User.findOne({ where: { account: account } });

        if (user) {
            next(createError(400, 'Account already exists'));
        }

        const salt = bcrypt.genSaltSync(10);

        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            fullName,
            account,
            password: passwordHash,
            email,
            isAdmin,
        });

        res.status(201).json({ message: 'Create User successfully' });
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                isAdmin: false,
            },
        });

        const valueUsers = users.map(user => user.dataValues);

        res.status(200).json(valueUsers);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (token) {
            jwt.verify(token, process.env.TOKEN, {}, async (err, user) => {
                if (err) throw err;
                const getUser = await User.findByPk(user.userId, {
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt'],
                    },
                });
                res.status(200).json(getUser);
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { fullName, email, birthDate, address, avatar } = req.body;

        const update = {
            fullName: fullName,
            email: email,
            birthDate: birthDate,
            address: address,
        };

        const user = await User.findByPk(req.params.id);
        if (user.avatar !== avatar) {
            if (user.avatar !== null) {
                const fileName = splitFileName(user.avatar);
                deleteImage(fileName);
            }

            const avatarUpload = await uploadImage(avatar);
            update.avatar = avatarUpload.secure_url;
        }
        await User.update(update, {
            where: {
                id: req.params.id,
            },
        });

        const updatedUser = await User.findByPk(req.params.id);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const changePasswordUser = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findByPk(req.userId);

        const isPassword = bcrypt.compareSync(oldPassword, user.password);

        if (!isPassword) {
            next(createError(400, 'Wrong password'));
        }

        const salt = bcrypt.genSaltSync(10);

        const passwordHash = bcrypt.hashSync(newPassword, salt);

        await User.update(
            {
                password: passwordHash,
            },
            {
                where: {
                    id: req.userId,
                },
            }
        );

        res.status(200).json({ message: 'Bạn đã đổi mật khẩu thành công' });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// const testUser = async (req, res, next) => {
//     try {
//         // const coverImgUpload = await uploadImage(req.file.path);
//         const deleteImg = deleteImage(req.body.img);
//         // res.status(200).json({ message: coverImgUpload.secure_url });
//         res.status(200).json({ message: 'đã xóa thành công' });
//     } catch (error) {
//         next(error);
//     }
// };

export {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    getProfile,
    changePasswordUser,
};
