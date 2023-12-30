import express from 'express';
import { createLink, getAllLinks, deleteLink } from '../controller/linkController.js';
const linkRouter = express.Router();



linkRouter.get('/', getAllLinks)

linkRouter.post('/create', createLink);

linkRouter.delete('/delete', deleteLink);

export default linkRouter;
