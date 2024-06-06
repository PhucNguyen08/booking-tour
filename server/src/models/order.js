import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Order
const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: function () {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const randomNumber = Math.floor(Math.random() * 1000000);
            return `${day}${month}${year}${randomNumber}`;
        },
    },
    tourScheduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'tourdays',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    numberOfChild: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numberOfAdult: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['waiting', 'confirm'],
        defaultValue: 'waiting',
    },
});

export default Order;
