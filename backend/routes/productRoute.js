import express from 'express';
import { getTest, getAllProducts } from '../controller/productController.js'
const productRoute = express.Router();


productRoute.get('/test', getTest);

productRoute.get('/all', getAllProducts);

export default productRoute;