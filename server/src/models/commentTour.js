import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

//?  Comment
const CommentTour = sequelize.define('commenttours', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tours',
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default CommentTour;
