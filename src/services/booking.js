/* eslint-disable curly */
/* eslint-disable camelcase */
import Booking from '../model/booking';
import User from '../model/usermodel';
import Trip from '../model/trip';

class BookingService {
  static async createBooking(req) {
    const foundUser = await User.findById(req.userId);
    const foundTrip = await Trip.getATrip(req.body.trip_id);

    if (foundTrip.length === 0) return {
      status: 'error',
      statuscode: 401,
      error: 'There is no such trip available',
    };
    const booking = await Booking.createBooking(req);
    booking.booking_id = booking.id;
    delete booking.id;
    foundUser.user_id = foundUser.id;
    delete foundUser.id;
    delete foundUser.password;
    delete foundUser.is_admin;
    delete foundTrip.status;
    delete foundTrip.origin;
    delete foundTrip.destination;
    delete foundTrip.fare;
    return {
      status: 'success',
      statuscode: 201,
      data: {
        ...foundTrip,
        ...foundUser,
        ...booking,
      },
      message: 'New booking created successfully',
    };
  }

  static async getAllBookings(req) {
    if (req.is_admin === true) {
      const bookings = await Booking.getAllBookings(req);
      if (bookings.length < 1) {
        return {
          status: 'error',
          statuscode: 404,
          error: 'Not found',
          message: 'There is no trip available',
        };
      }
      bookings.booking_id = bookings.id;
      delete bookings.id;
      return {
        status: 'success',
        statuscode: 200,
        data: {
          ...bookings,
        },
      };
    }
    if (req.is_admin === false) {
      const booking = await Booking.getAllUserbookings(req.userId);
      if (booking < 1) {
        return {
          status: 'error',
          statuscode: 404,
          error: 'Not found',
          message: 'There is no trip available',
        };
      }
      return {
        status: 'success',
        statuscode: 200,
        data: {
          ...booking,
        },
      };
    }
  }
}

export default BookingService;
