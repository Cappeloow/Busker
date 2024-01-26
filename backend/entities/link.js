// entities/link.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Import the User model
import { isString } from '../validation.js';
const Link = sequelize.define('links', {
    linkId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'Icon'),
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'Title'),
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'URL'),
        },
    },
    linkClicks: {
        type: DataTypes.INTEGER,
    }
});
sequelize.sync();

export default Link;