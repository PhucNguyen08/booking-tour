import db from '../database/db.js';

const connectDb = () => {
    db.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(error => {
            console.error('Unable to connect to the database: ', error);
        });
};

export default connectDb;
