// entities/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import Link from './link.js';
import Order from './order.js';
import Availability from './availability.js';
import { isString, isNumber } from '../validation.js';
const User = sequelize.define('users', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    artistName: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'ArtistName'),
        },
    },
    country: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'Country'),
        },
    },
    city: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'City'),
        },
    },
    profileImg: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    stripeId: {
        type: DataTypes.STRING,
    }
});

User.hasMany(Link, {
    foreignKey: 'userId',
    onDelete: 'cascade',
});

User.hasMany(Order, {
    foreignKey: 'userId',
    onDelete: 'cascade',
});

User.hasMany(Availability, {
    foreignKey: 'userId',
    onDelete: 'cascade',
})
sequelize.sync();

export default User;