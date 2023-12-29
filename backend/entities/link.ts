// entities/link.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Import the User model

const Link = sequelize.define('links', {
    LinkID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    UserID: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    Icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    URL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Define association with the User model
Link.belongsTo(User, { foreignKey: 'UserID' });
sequelize.sync();

export default Link;