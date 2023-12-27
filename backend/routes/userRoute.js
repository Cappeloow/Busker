import express from 'express';
import sayHello from '../controller/userController.js';
import { getUserQRCode, updateUserDetails, getAllUsers, getSpecificUser } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/hello', sayHello);


userRouter.get('/qrcode/:userId', getUserQRCode)

userRouter.put('/update/:userId', updateUserDetails);

userRouter.get('/:userId', getSpecificUser);

userRouter.get('/all', getAllUsers);




export default userRouter;