import express from 'express';
import { createLink, getAllLinks } from '../controller/linkController.js';
const linkRouter = express.Router();



linkRouter.get('/:userId', getAllLinks)

linkRouter.post('/:userId/create', createLink);

export default linkRouter;
