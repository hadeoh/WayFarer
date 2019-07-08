import { Router } from 'express';
import BookingController from '../controllers/booking';
import BookingValidation from '../middleware/bookingvalidator';
import Auth from '../middleware/auth';

const { createBooking } = BookingController;
const { getUser, notAdminCheck } = Auth;
const { bookingCheck } = BookingValidation;

const bookingRouter = Router();

bookingRouter.post('/', getUser, notAdminCheck, bookingCheck, createBooking);

export default bookingRouter;
