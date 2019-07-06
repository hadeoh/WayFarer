import Trip from '../model/trip';
import Bus from '../model/bus';

class TripService {
  static async createTrip(newTrip) {
    const trip = await Trip.createTrip(newTrip);

    if (trip) {
      Bus.updateBusStatus('unavailable', trip.bus_id);
    }
    return {
      status: 'success',
      statuscode: 201,
      data: {
        ...trip,
      },
      message: 'New trip created successfully',
    };
  }

  static async getAllTrips() {
    const trip = await Trip.getAllTrips();
    if (trip < 1) {
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
        ...trip,
      },
    };
  }
}

export default TripService;
