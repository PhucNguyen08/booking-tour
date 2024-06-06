import Site from './site.js';
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//? Vị trí
const Location = sequelize.define('locations', {
    locationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'locations',
            key: 'id',
        },
    },
});

Location.belongsTo(Location, { as: 'parent', foreignKey: 'parentId' });

export default Location;
