import express from "express";
import auth from "../middleware.js";
import { stripeCheckout, getConfirmation, getOrder } from '../controller/orderController.js'
const orderRouter = express.Router();


orderRouter.post('/create-checkout-session', auth, stripeCheckout);

orderRouter.post('/confirmation', getConfirmation);

orderRouter.get('/', auth, getOrder)
export default orderRouter;