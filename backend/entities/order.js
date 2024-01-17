// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import OrderItem from './orderItem.js';
import { isNumber } from '../validation.js';
const Order = sequelize.define('orders', {
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
            isNumber: (value) => isNumber(value, 'TotalPrice'),
        },
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
        defaultValue: 'Pending',
    },
    sessionId: {
        type: DataTypes.STRING,
    },
});

Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    onDelete: 'cascade',
})
export default Order;