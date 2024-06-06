import cloudinary from './cloudinary.js';

const uploadImage = async image => {
    const upload = await cloudinary.uploader.upload(image, {
        folder: 'bookingTour',
        resource_type: 'image',
    });

    return upload;
};

export const deleteImage = image => {
    cloudinary.api.delete_resources([`bookingTour/${image}`], {
        type: 'upload',
        resource_type: 'image',
    });
};

export default uploadImage;
