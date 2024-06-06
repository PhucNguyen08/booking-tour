import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Tour
const TourSchedule = sequelize.define('tourdays', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tours',
            key: 'id',
        },
    },
    departureDay: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    returnDay: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    childPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    adultPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    maxParticipants: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numberOfParticipantsBooked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['still', 'full'],
        defaultValue: 'still',
    },
});

export default TourSchedule;
