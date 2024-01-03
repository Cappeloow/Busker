import express from "express";
import auth from "../middleware.js";
import { stripeCheckout, getConfirmation } from '../controller/checkoutController.js'
const checkoutRouter = express.Router();


checkoutRouter.post('/create-checkout-session', auth, stripeCheckout);

checkoutRouter.post('/confirmation', getConfirmation);
export default checkoutRouter;