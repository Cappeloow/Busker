import express from 'express';
import { createLink, getAllLinks, deleteLink } from '../controller/linkController.js';
import auth from '../middleware.js';
const linkRouter = express.Router();



linkRouter.get('/', getAllLinks)

linkRouter.post('/create', auth, createLink);

linkRouter.delete('/delete', deleteLink);

export default linkRouter;
