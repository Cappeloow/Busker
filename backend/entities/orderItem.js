// models/OrderItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path to your Sequelize configuration
import { isNumber } from '../validation.js';
const OrderItem = sequelize.define('orderItems', {
    orderItemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.UUID,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
            isNumber: (value) => isNumber(value, 'Quantity'),
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            isNumber: (value) => isNumber(value, 'Quantity'),
        }
    },
    // Add other order item fields here
});



export default OrderItem;
