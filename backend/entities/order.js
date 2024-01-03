// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import OrderItem from './orderItem.js';
const Order = sequelize.define('orders', {
    OrderItemID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
    },
});

Order.hasMany(OrderItem, {
    foreignKey: 'OrderItemID', // Assuming 'UserID' is the name of the foreign key column in the 'links' table
    onDelete: 'cascade',  // This ensures that associated links are deleted when a user is deleted
})
export default Order;