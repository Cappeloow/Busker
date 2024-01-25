// entities/availability.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { isString } from '../validation.js';
const Availability = sequelize.define('availability', {
  availabilityId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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

  bookingTime: {
    type: DataTypes.TIME,
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