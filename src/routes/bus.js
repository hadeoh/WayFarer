import { Router } from 'express';
import BusController from '../controllers/bus';
import BusValidation from '../middleware/busvalidator';
import Auth from '../middleware/auth';

const { createBus } = BusController;
const { getUser, adminCheck } = Auth;
const { busCheck } = BusValidation;

const busRouter = Router();

busRouter.post('/', getUser, adminCheck, busCheck, createBus);

export default busRouter;
