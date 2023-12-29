// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import Link from './link.js';
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
        type: DataTypes.STRING,
    },
    CreatedAt: {
        type: DataTypes.DATE,
    },
});

User.hasMany(Link, {
    foreignKey: 'UserID', // Assuming 'UserID' is the name of the foreign key column in the 'links' table
    onDelete: 'cascade',  // This ensures that associated links are deleted when a user is deleted
});
sequelize.sync();

export default User;