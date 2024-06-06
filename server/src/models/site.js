import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//? Địa điểm
const Site = sequelize.define('sites', {
    locationId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'locations',
            key: 'id',
        },
    },
    siteName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siteNote: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
});

export default Site;
