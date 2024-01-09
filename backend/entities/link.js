// entities/link.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Import the User model
import { isString } from '../validation.js';
const Link = sequelize.define('links', {
    LinkID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Icon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'Icon'),
        },
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'Title'),
        },
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isString: (value) => isString(value, 'URL'),
        },
    },
});
sequelize.sync();

export default Link;