import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const io = new Server({
    cors: process.env.CONFIG_CORS,
});

export default io;
