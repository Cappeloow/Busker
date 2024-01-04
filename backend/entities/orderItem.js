// models/OrderItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration

const OrderItem = sequelize.define('orderItems', {
    OrderItemID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    ProductID: {
        type: DataTypes.UUID,
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    Quantity: {
        type: DataTypes.INTEGER,
    },
    // Add other order item fields here
});



export default OrderItem;
