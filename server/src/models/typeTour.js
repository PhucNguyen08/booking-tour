import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//? Loại Tour
const TypeTour = sequelize.define('typetours', {
    typeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    englishName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default TypeTour;
