import initStripe from '../stripe.js';
const stripe = initStripe();
export async function getTest(req, res) {

    res.status(200).send("This works");
}

export async function getAllProducts(req, res) {
    // get all available products from stripe
    try {
        const products = await stripe.products.list();
        const updatedProducts = [];

        // add a product.price so the client can see what the price is for certain products.
        for (const product of products.data) {
            const price = product.default_price;
            const priceDetails = await stripe.prices.retrieve(price);
            product.price = priceDetails.unit_amount / 100;

            updatedProducts.push(product);
        }
        // return back
        res.status(200).json(updatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


export async function getProductById(req, res) {
    // get the id of the product
    const productId = req.params.id;
    // retrieve the id
    const product = await stripe.products.retrieve(productId);
    // get the price of the product
    const price = product.default_price;
    const priceDetails = await stripe.prices.retrieve(price);
    product.price = priceDetails.unit_amount / 100;
    // send it back
    res.status(200).json(product);
}