import stripePackage from 'stripe';
//stripe config
const initStripe = () => {
    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
    return stripe;
};

export default initStripe;