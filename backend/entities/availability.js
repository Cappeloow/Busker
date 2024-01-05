// entities/availability.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Availability = sequelize.define('availability', {
  availabilityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('Available', 'In Talks', 'Booked'),
    allowNull: false,
    defaultValue: 'Available',
  },

  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  bookedDateTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  showDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options, e.g., timestamps, underscored, etc.
});


export default Availability;