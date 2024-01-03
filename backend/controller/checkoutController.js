import dotenv from 'dotenv';
dotenv.config();
import initStripe from '../stripe.js';
const stripe = initStripe();

export async function stripeCheckout(req, res, next) {
    const cartItems = req.body;
    const user = req.user;
    if (!user) {
        return res.status(403).send("You need to be logged in to checkout");
    }
    const line_items = cartItems.map((item) => ({
        price_data: {
            currency: "sek",
            product_data: {
                name: `New ${item.name}`,
                description: item.description,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            customer: user.id, // UUID OR customer id?
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