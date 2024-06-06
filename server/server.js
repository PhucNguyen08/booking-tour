import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sequelize from './src/database/db.js';
import connectDb from './src/utils/connectDb.js';
import authRouter from './src/router/authRouter.js';
import siteRouter from './src/router/siteRouter.js';
import locationRouter from './src/router/locationRouter.js';
import tourRouter from './src/router/tourRouter.js';
import typeTourRouter from './src/router/typeTourRouter.js';
import userRouter from './src/router/userRouter.js';
import tourScheduleRouter from './src/router/tourScheduleRouter.js';
import newsRouter from './src/router/newsRouter.js';
import orderRouter from './src/router/orderRouter.js';
import reportRouter from './src/router/reportRouter.js';
import commentTourRouter from './src/router/commentTourRouter.js';
import uploadRouter from './src/router/uploadRouter.js';
import paymentRouter from './src/router/paymentRouter.js';
import io from './src/socket/socket.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: process.env.CONFIG_CORS,
    credentials: true,
    // optionSuccessStatus: 200,
};

io.on('connection', socket => {
    console.log('new connection');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

sequelize
    .sync()
    .then(() => {
        console.log('Tables created.');
    })
    .catch(err => {
        console.log(err);
    });

// app.use(cors());
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/site', siteRouter);
app.use('/location', locationRouter);
app.use('/tour', tourRouter);
app.use('/typeTour', typeTourRouter);
app.use('/users', userRouter);
app.use('/tourSchedule', tourScheduleRouter);
app.use('/news', newsRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);
app.use('/comment', commentTourRouter);
app.use('/upload', uploadRouter);
app.use('/payment', paymentRouter);

app.listen(PORT, () => {
    connectDb();
    console.log('Serving on port ' + PORT);
});

io.listen(3000);
