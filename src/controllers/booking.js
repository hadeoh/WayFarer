import BookingService from '../services/booking';

class BookingController {
  static async createBooking(req, res, next) {
    try {
      const response = await BookingService.createBooking(req);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getAllBookings(req, res, next) {
    try {
      const response = await BookingService.getAllBookings(req);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteBooking(req, res, next) {
    try {
      const response = await BookingService.deleteBooking(req);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default BookingController;
