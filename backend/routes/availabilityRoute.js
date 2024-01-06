import express from 'express';
import auth from "../middleware.js";
const availabilityRouter = express.Router();

import { createAvailability, getAllAvailabilities, updateAvailability } from '../controller/availabilityController.js';

availabilityRouter.post('/create', auth, createAvailability);

availabilityRouter.get('/:id', getAllAvailabilities);

availabilityRouter.put('/update', auth, updateAvailability);



export default availabilityRouter;