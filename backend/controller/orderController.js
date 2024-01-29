import dotenv from 'dotenv';
dotenv.config();
import initStripe from '../stripe.js';
const stripe = initStripe();
import Order from '../entities/order.js';
import OrderItem from '../entities/orderItem.js';
export async function stripeCheckout(req, res, next) {
    // get the cart from the client and get the authenticated user
    const cartItems = req.body;
    const user = req.user;

    // return back if there is no authenticated user
    if (!user) {
        return res.status(403).send("You need to be logged in to checkout");
    }
    // map through the cart items and add it to the line_items array so we can send it to the stripe session
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
        // create a session
        const session = await stripe.checkout.sessions.create({
            line_items,
            customer: user.stripeId,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${process.env.BUSKER_FRONTEND_URL}/confirmation`,
            cancel_url: process.env.BUSKER_FRONTEND_URL,
        })
        // send back the session.url so we can redirect from the client after getting the response, also the sessionId so we can then track what happend to the sessionId (if it was succesful or not)
        res.status(200).json({ url: session.url, id: session.id });
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Something went wrong");
    }
}

export async function getConfirmation(req, res, next) {
    // get the sessionId from the req.body when we ended up in the /confirmation 
    const { id } = req.body;
    let orderInDb;

    try {
        // retrieve session and lineItems
        const session = await stripe.checkout.sessions.retrieve(id);
        const lineItems = await stripe.checkout.sessions.listLineItems(id);
        // look if there is already a order with that sessionId in the database
        orderInDb = await Order.findOne({ where: { sessionId: session.id } });


        //if there is no order in the database > create one
        if (!orderInDb) {
            const order = await Order.create({
                userId: req.user.userId,
                totalPrice: session.amount_total / 100,
                sessionId: session.id,
            });
            // map through all the lineItems and create OrderItems of them.
            const orderItemsArray = await Promise.all(lineItems.data.map(async (lineItem) => {
                // Create OrderItem
                const createdOrderItem = await OrderItem.create({
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity,
                    productId: lineItem.price.product,
                    orderId: order.dataValues.orderId
                });
                const updatedOrderItem = {
                    title: lineItem.description,
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity
                }
                return updatedOrderItem; //Updated OrderItem
            }));
            // create a object where we can hold the orderItems & order and then send it.
            const sendOrder = {
                orderId: order.dataValues.orderId,
                totalPrice: session.amount_total / 100,
                currency: session.currency,
                orderItemsArray
            }
            res.status(200).json({ session: session, order: sendOrder });
        } else {
            // if the order was already created in the db, we just want to print it out for the client the exact same data so if the user 
            //refresh the website he still got his information about the order that has been made.
            const orderItemsArray = await Promise.all(lineItems.data.map(async (lineItem) => {
                const createdOrderItem = ({
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity,
                    productId: lineItem.price.product,
                    orderId: orderInDb.dataValues.orderId
                });
                const updatedOrderItem = {
                    title: lineItem.description,
                    price: lineItem.amount_total / 100,
                    quantity: lineItem.quantity
                }
                return updatedOrderItem; //Store the updated orderItem in the array
            }));
            const sendOrder = {
                orderId: orderInDb.dataValues.orderId,
                totalPrice: session.amount_total / 100,
                currency: session.currency,
                orderItemsArray
            }
            res.status(200).json({ session: session, order: sendOrder });
        }
    } catch (error) {
        // sequelize error made by me (validation.js)
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                message: err.message,
                type: err.type,
                path: err.path,
                value: err.value,
            }));

            return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).send("Error");
    }
}



export async function getOrder(req, res) {
    // get the authorized user
    const user = req.user;

    try {
        // search for all orders made by the user
        const orders = await Order.findAll({ where: { userId: user.dataValues.userId } });
        // find all orderItems and map them so it's associated with the right Order.
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const orderItems = await OrderItem.findAll({
                    attributes: [
                        'orderItemId',
                        'productId',
                        'price',
                        'quantity',
                        'orderId',
                    ],
                    where: { orderId: order.orderId },
                    raw: true, // Ensure raw data values
                });
                return {
                    order: order.get({ plain: true }),
                    orderItems,
                };
            })
        );
        // return it back to the client
        res.status(200).json(ordersWithItems);
    } catch (error) {
        console.error('Error retrieving orders and order items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}