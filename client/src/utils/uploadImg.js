import newRequest from './axios-utils';

const transformFile = (file, callback) => {
    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            callback(reader.result);
        };
    } else {
        callback('');
    }
};

const uploadToCloudinary = async file => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await newRequest.post('/upload', formData);

    return res.data;
};

export { transformFile, uploadToCloudinary };
