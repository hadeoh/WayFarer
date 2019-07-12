import { Router } from 'express';
import BookingController from '../controllers/booking';
import BookingValidation from '../middleware/bookingvalidator';
import Auth from '../middleware/auth';

const { createBooking, getAllBookings, deleteBooking, changeSeat } = BookingController;
const { getUser, notAdminCheck } = Auth;
const { bookingCheck, seatCheck } = BookingValidation;

const bookingRouter = Router();

bookingRouter.post('/', getUser, notAdminCheck, bookingCheck, createBooking);
bookingRouter.get('/', getUser, getAllBookings);
bookingRouter.delete('/:bookingId', getUser, notAdminCheck, deleteBooking);
bookingRouter.patch('/:bookingId', getUser, notAdminCheck, seatCheck, changeSeat);

export default bookingRouter;
