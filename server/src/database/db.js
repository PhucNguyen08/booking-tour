import Sequelize from 'sequelize';

const sequelize = new Sequelize('booking', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: console.log,
});

export default sequelize;
