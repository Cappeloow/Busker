import express from 'express';
import sayHello from '../controller/userController.js';
import { getUserQRCode } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/hello', sayHello);


userRouter.get('/qrcode/:userId', getUserQRCode)

export default userRouter;