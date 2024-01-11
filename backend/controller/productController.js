import initStripe from '../stripe.js';
const stripe = initStripe();
export async function getTest(req, res) {

    res.status(200).send("This works");
}

export async function getAllProducts(req, res) {
    try {
        const products = await stripe.products.list();
        const updatedProducts = [];

        for (const product of products.data) {
            const price = product.default_price;
            const priceDetails = await stripe.prices.retrieve(price);
            product.price = priceDetails.unit_amount / 100;

            updatedProducts.push(product);
        }
        res.status(200).json(updatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


export async function getProductById(req, res) {
    const productId = req.params.id;

    const product = await stripe.products.retrieve(productId);

    const price = product.default_price;
    const priceDetails = await stripe.prices.retrieve(price);
    product.price = priceDetails.unit_amount / 100;

    res.status(200).json(product);
}