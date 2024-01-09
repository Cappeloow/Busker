// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import OrderItem from './orderItem.js';
import { isNumber } from '../validation.js';
const Order = sequelize.define('orders', {
    OrderID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
            isNumber: (value) => isNumber(value, 'TotalPrice'),
        },
    },
    Status: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
        defaultValue: 'Pending',
    },
    SessionID: {
        type: DataTypes.STRING,
    },
});

Order.hasMany(OrderItem, {
    foreignKey: 'OrderID',
    onDelete: 'cascade',
})
export default Order;