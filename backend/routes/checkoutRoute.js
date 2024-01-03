import express from "express";
import auth from "../middleware.js";
import { stripeCheckout } from '../controller/checkoutController.js'
const checkoutRouter = express.Router();


checkoutRouter.post('/create-checkout-session', auth, stripeCheckout);

export default checkoutRouter;