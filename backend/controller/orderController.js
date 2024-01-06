import dotenv from 'dotenv';
dotenv.config();
import initStripe from '../stripe.js';
const stripe = initStripe();
import Order from '../entities/order.js';
import OrderItem from '../entities/orderItem.js';
export async function stripeCheckout(req, res, next) {
    const cartItems = req.body;
    console.log(cartItems);
    const user = req.user;
    if (!user) {
        return res.status(403).send("You need to be logged in to checkout");
    }
    const line_items = cartItems.map((item) => ({
        price_data: {
            currency: "sek",
            product_data: {
                name: item.name,
                description: item.description,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            customer: user.UserID, // UUID OR customer id?
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${process.env.BUSKER_URL}confirmation`,
            cancel_url: process.env.BUSKER_URL,
        })
        res.status(200).json({ url: session.url, id: session.id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong");
    }
}

export async function getConfirmation(req, res, next) {
    const { id } = req.body;
    let orderInDb; // Declare orderInDb variable here

    try {
        const session = await stripe.checkout.sessions.retrieve(id);
        const lineItems = await stripe.checkout.sessions.listLineItems(id);

        orderInDb = await Order.findOne({ where: { SessionID: session.id } });

        if (!orderInDb) {
            const order = await Order.create({
                TotalPrice: session.amount_total / 100,
                UserID: session.customer,
                SessionID: session.id,
            });

            const orderItemsArray = await Promise.all(lineItems.data.map(async (lineItem) => {
                // Create OrderItem
                const createdOrderItem = await OrderItem.create({
                    Price: lineItem.amount_total / 100,
                    Quantity: lineItem.quantity,
                    ProductID: lineItem.price.product,
                    OrderID: order.dataValues.OrderID
                });
                const updatedOrderItem = {
                    title: lineItem.description,
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity
                }
                return updatedOrderItem; //Updated OrderItem
            }));
            const sendOrder = {
                orderId: order.dataValues.OrderID,
                totalPrice: session.amount_total / 100,
                currency: session.currency,
                orderItemsArray
            }
            res.status(200).json({ session: session, order: sendOrder });
        } else {
            const orderItemsArray = await Promise.all(lineItems.data.map(async (lineItem) => {
                const createdOrderItem = ({
                    Price: lineItem.amount_total / 100,
                    Quantity: lineItem.quantity,
                    ProductID: lineItem.price.product,
                    OrderID: orderInDb.dataValues.OrderID
                });
                const updatedOrderItem = {
                    title: lineItem.description,
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity
                }
                return updatedOrderItem; //Store the updated orderItem in the array
            }));
            const sendOrder = {
                orderId: orderInDb.dataValues.OrderID,
                totalPrice: session.amount_total / 100,
                currency: session.currency,
                orderItemsArray
            }
            res.status(200).json({ session: session, order: sendOrder });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                message: err.message,
                type: err.type,
                path: err.path,
                value: err.value,
            }));

            return res.status(400).json({ errors: validationErrors });
        }
        console.error(error);
        res.status(500).send("Error");
    }
}



export async function getOrder(req, res) {
    const user = req.user;

    try {
        const orders = await Order.findAll({ where: { UserID: user.dataValues.UserID } });

        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const orderItems = await OrderItem.findAll({ where: { OrderID: order.OrderID } });
                return { order, orderItems };
            })
        );

        res.status(200).json({ ordersWithItems });
    } catch (error) {
        console.error('Error retrieving orders and order items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}