import { Router } from 'express';
import BookingController from '../controllers/booking';
import BookingValidation from '../middleware/bookingvalidator';
import Auth from '../middleware/auth';

const { createBooking, getAllBookings } = BookingController;
const { getUser, notAdminCheck } = Auth;
const { bookingCheck } = BookingValidation;

const bookingRouter = Router();

bookingRouter.post('/', getUser, notAdminCheck, bookingCheck, createBooking);
bookingRouter.get('/', getUser, getAllBookings);

export default bookingRouter;
