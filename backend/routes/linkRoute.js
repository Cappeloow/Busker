import express from 'express';
import { createLink, getAllLinks, deleteLink, clickedOnLink, getTotalClicks } from '../controller/linkController.js';
import auth from '../middleware.js';
const linkRouter = express.Router();



linkRouter.get('/:userId', getAllLinks)

linkRouter.post('/create', auth, createLink);

linkRouter.delete('/delete', auth, deleteLink);

linkRouter.post('/clicked', clickedOnLink);

linkRouter.get('/:userId/totalClicks', getTotalClicks)

export default linkRouter;
