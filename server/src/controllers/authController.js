import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

//? Đăng ký
const register = async (req, res, next) => {
    try {
        const { fullName, account, password, email } = req.body;

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
        });

        res.status(201).json({ message: 'You have successfully registered' });
    } catch (err) {
        next(err);
    }
};

//? Đăng nhập
const login = async (req, res, next) => {
    try {
        const { account, password } = req.body;

        const user = await User.findOne({ where: { account: account } });

        if (!user) {
            next(createError(404, 'Account incorrect'));
        }

        const isPassword = bcrypt.compareSync(password, user.password);

        if (!isPassword) {
            next(createError(400, 'Wrong password or email'));
        }

        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.TOKEN
        );

        const userInfo = { ...user.dataValues };
        delete userInfo.password;

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
            .status(200)
            .json(userInfo);
    } catch (error) {
        next(error);
    }
};

//? Đăng xuất
const logout = async (req, res, next) => {
    res.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
    })
        .status(200)
        .json({ Status: 'Success' });
};

export { register, login, logout };
