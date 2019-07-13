import { Router } from 'express';
import TripController from '../controllers/trip';
import TripValidation from '../middleware/tripvalidator';
import Auth from '../middleware/auth';

const { createTrip, getAllTrips, updateTripStatus, getTripsDestination } = TripController;
const { getUser, adminCheck, notAdminCheck } = Auth;
const { tripCheck } = TripValidation;

const tripRouter = Router();

tripRouter.post('/', getUser, adminCheck, tripCheck, createTrip);
tripRouter.get('/', getUser, getAllTrips);
tripRouter.get('/:destination', getUser, notAdminCheck, getTripsDestination);
tripRouter.patch('/:tripId', getUser, adminCheck, updateTripStatus);

export default tripRouter;
