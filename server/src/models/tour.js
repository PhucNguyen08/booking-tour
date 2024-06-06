import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Tour
const Tour = sequelize.define('tours', {
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'typetours',
            key: 'id',
        },
    },
    departurePlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locations',
            key: 'id',
        },
    },
    destinationPlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locations',
            key: 'id',
        },
    },
    tourName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tourProgramDesc: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    shortDesc: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    coverImg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numberOfNight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vehicle: {
        type: DataTypes.ENUM,
        values: ['plane', 'car'],
    },
});

export default Tour;
