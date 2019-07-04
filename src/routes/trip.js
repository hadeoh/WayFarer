import { Router } from 'express';
import TripController from '../controllers/trip';
import TripValidation from '../middleware/tripvalidator';
import Auth from '../middleware/auth';

const { createTrip, getAllTrips } = TripController;
const { getUser, adminCheck } = Auth;
const { tripCheck } = TripValidation;

const tripRouter = Router();

tripRouter.post('/', getUser, adminCheck, tripCheck, createTrip);
tripRouter.get('/', getUser, getAllTrips);

export default tripRouter;
