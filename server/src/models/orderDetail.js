import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Order
const OrderDetail = sequelize.define('orderdetails', {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'orders',
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
});

export default OrderDetail;
