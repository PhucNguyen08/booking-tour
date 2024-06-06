import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//? Tour địa danh
const TourSite = sequelize.define('toursite', {
    tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tours',
            key: 'id',
        },
    },
    siteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sites',
            key: 'id',
        },
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default TourSite;
