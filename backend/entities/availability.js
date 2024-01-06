// entities/availability.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { isString } from '../validation.js';
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
    validate: {
      isString: (value) => isString(value, 'Location'),
    },
  },

  bookedDateTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isString: (value) => isString(value, 'Description'),
    },
  },
},
);


export default Availability;