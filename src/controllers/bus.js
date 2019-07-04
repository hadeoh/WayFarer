import BusService from '../services/bus';

class BusController {
  static async createBus(req, res, next) {
    try {
      const response = await BusService.createBus(req.body);
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default BusController;
