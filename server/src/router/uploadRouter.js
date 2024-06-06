import express from 'express';
import { uploadCloudinary } from '../controllers/uploadController.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadCloudinary);

export default router;
