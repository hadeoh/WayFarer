import TripService from '../services/trip';

class TripController {
  static async createTrip(req, res, next) {
    try {
      const response = await TripService.createTrip(req.body);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getAllTrips(req, res, next) {
    try {
      const response = await TripService.getAllTrips(req.body);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default TripController;
