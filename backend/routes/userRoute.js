import express from 'express';
import sayHello from '../controller/userController.js';
import useGoogleCloudStorage from '../utils/useGoogleCloudStorage.js';
const { uploadImage, retrieveImage } = useGoogleCloudStorage();
import auth from '../middleware.js'
import { getUserQRCode, updateUserDetails, getAllUsers, getSpecificUser, unregisterUser, uploadSingleFile, uploadProfileImage, getSpecificUserProfileImg } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get('/hello', sayHello);


userRouter.get('/qrcode/:userId', getUserQRCode)

userRouter.put('/update/:userId', updateUserDetails);


userRouter.get('/all', getAllUsers);

userRouter.delete('/unregister', unregisterUser);

//userRouter.post('/uploadImg', auth, uploadSingleFile);

userRouter.post('/uploadProfileImg', auth, uploadProfileImage);

userRouter.get('/:userId/profileImg', getSpecificUserProfileImg)

userRouter.get('/:userId', getSpecificUser);

export default userRouter;

