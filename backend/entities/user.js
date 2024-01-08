// entities/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import Link from './link.js';
import Order from './order.js';
import Availability from './availability.js';
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
    },
    Country: {
        type: DataTypes.STRING,
    },
    City: {
        type: DataTypes.STRING,
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
    foreignKey: 'UserID', // Assuming 'UserID' is the name of the foreign key column in the 'links' table
    onDelete: 'cascade',  // This ensures that associated links are deleted when a user is deleted
});

User.hasMany(Order, {
    foreignKey: 'UserID', // Assuming 'stripeId' is the name of the foreign key column in the 'orders' table
    onDelete: 'cascade',   // This ensures that associated orders are deleted when a user is deleted
});

User.hasMany(Availability, {
    foreignKey: 'UserID', // Assuming 'UserID' is the name of the foreign key column in the 'links' table
    onDelete: 'cascade',  // This ensures that associated links are deleted when a user is deleted
})
sequelize.sync();

export default User;