import express from 'express';
import { createLink, getAllLinks } from '../controller/linkController.js';
const linkRouter = express.Router();



linkRouter.get('/', getAllLinks)

linkRouter.post('/create', createLink);

export default linkRouter;
