import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../email/email.js';
import createError from '../utils/createError.js';
import dotenv from 'dotenv';
dotenv.config();

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
            next(createError(404, 'Tài khoản không chính xác'));
            return;
        }

        const isPassword = bcrypt.compareSync(password, user.password);

        if (!isPassword) {
            next(createError(400, 'Tài khoản hoặc mật khẩu không đúng'));
            return;
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

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            next(createError(404, 'Không tìm thấy email!'));
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN,
            {
                expiresIn: 60 * 60,
            }
        );

        const url = `${process.env.CONFIG_CORS}/reset-password?userId=${user.id}&token=${token}`;

        const html = `
        <p>Xin chào ${user.fullName},</p>
        <p>Chúng tôi được biết bạn đã quên mật khẩu. Xin lỗi về điều đó!</p>
        <p>Nhưng đừng lo lắng! Bạn có thể sử dụng liên kết sau để đặt lại mật khẩu của mình:</p>
        <a href=${url}>${url}</a>
        <p>Nếu bạn không sử dụng liên kết này trong vòng 1 giờ, liên kết sẽ hết hạn.</p>
        <p>Hãy làm điều gì đó bên ngoài ngay hôm nay! </p>
        <p>OH!Travel</p>`;

        const options = {
            from: process.env.EMAIL_LOGIN,
            to: email,
            subject: 'Đặt lại mật khẩu',
            html: html,
        };

        await transporter.sendMail(options);

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ where: { id: id } });

        const payload = jwt.decode(token, process.env.TOKEN);

        if (payload.userId === user.id) {
            const salt = bcrypt.genSaltSync(10);

            const passwordHash = bcrypt.hashSync(password, salt);

            await User.update(
                {
                    password: passwordHash,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            res.status(202).json('Password changed accepted');
        } else {
            next(createError(404, 'Tài khoản không tồn tại'));
        }
    } catch (error) {
        next(error);
    }
};

export { register, login, logout, forgotPassword, resetPassword };
