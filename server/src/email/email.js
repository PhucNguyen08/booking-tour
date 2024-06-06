import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'npnguyen6868@gmail.com',
        pass: 'ezuoeqagjtokbvje',
    },
});

export default transporter;
