import express from 'express';
import { getTest, getAllProducts, getProductById } from '../controller/productController.js'
const productRoute = express.Router();


productRoute.get('/test', getTest);

productRoute.get('/all', getAllProducts);

productRoute.get('/:id', getProductById);
export default productRoute;