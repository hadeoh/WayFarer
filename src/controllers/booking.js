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
}

export default BookingController;
