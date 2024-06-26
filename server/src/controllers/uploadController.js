import uploadImage from '../utils/uploadImage.js';

const uploadCloudinary = async (req, res, next) => {
    try {
        console.log(req.file.path);
        const imgUpload = await uploadImage(req.file.path);
        res.status(200).send(imgUpload.secure_url);
    } catch (error) {
        next(error);
    }
};

export { uploadCloudinary };
