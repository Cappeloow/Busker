// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import OrderItem from './orderItem.js';
const Order = sequelize.define('orders', {
    OrderID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
    },
});

Order.hasMany(OrderItem, {
    foreignKey: 'OrderID',
    onDelete: 'cascade',
})
export default Order;