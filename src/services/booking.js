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
    delete foundTrip.id;
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
          message: 'There is no booking available',
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
          message: 'There is no booking available',
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

  static async deleteBooking(req) {
    const foundBooking = await Booking.getUserBookings(req);
    if (foundBooking.length < 1) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'There are no bookings available for you',
      };
    }
    const deleteBooking = await Booking.deleteBooking(req.params.bookingId);
    if (deleteBooking < 1) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'There is no such booking available for you',
      };
    }
    return {
      status: 'success',
      statuscode: 200,
      data: {
        message: 'Booking deleted successfully',
      },
    };
  }

  static async changeSeat(req) {
    const foundBooking = await Booking.getUserBookings(req);
    if (foundBooking.length < 1) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Not found',
        message: 'There are no bookings available for you',
      };
    }
    const result = await Booking.changeSeat(req.body.seat_number, new Date(), req.params.bookingId, req.userId);
    if (result.length < 1) {
      return {
        status: 'error',
        statuscode: 404,
        error: 'Booking not found',
        message: 'Please pick another booking',
      };
    }
    return {
      status: 'success',
      statuscode: 200,
      message: 'Seat number successfully changed',
      data: {
        booking: result[0],
      },
    };
  }
}

export default BookingService;
