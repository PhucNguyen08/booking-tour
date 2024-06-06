import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_STORE);
    },
    filename: function (req, file, cb) {
        const uniqueFilename =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

        // Lấy phần mở rộng của tệp tin
        const fileExtension = file.originalname.split('.').pop();

        // Thiết lập tên tệp tin
        cb(null, uniqueFilename + '.' + fileExtension);
    },
});

const upload = multer({ storage: storage });

export default upload;
