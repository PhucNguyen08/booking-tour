import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Tour
const TourImg = sequelize.define('tourimgs', {
    tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tours',
            key: 'id',
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TourImg;
