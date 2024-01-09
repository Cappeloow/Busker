// entities/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import Link from './link.js';
import Order from './order.js';
import Availability from './availability.js';
import { isString, isNumber } from '../validation.js';
const User = sequelize.define('users', {
    UserID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ArtistName: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'ArtistName'),
        },
    },
    Country: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'Country'),
        },
    },
    City: {
        type: DataTypes.STRING,
        validate: {
            isString: (value) => isString(value, 'City'),
        },
    },
    ProfileImg: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    CreatedAt: {
        type: DataTypes.DATE,
    },
    stripeId: {
        type: DataTypes.STRING,
    }
});

User.hasMany(Link, {
    foreignKey: 'UserID',
    onDelete: 'cascade',
});

User.hasMany(Order, {
    foreignKey: 'UserID',
    onDelete: 'cascade',
});

User.hasMany(Availability, {
    foreignKey: 'UserID',
    onDelete: 'cascade',
})
sequelize.sync();

export default User;