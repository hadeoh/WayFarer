import Trip from '../model/trip';
import Bus from '../model/bus';

class TripService {
  static async createTrip(newTrip) {
    const trip = await Trip.createTrip(newTrip);

    if (trip) {
      Bus.updateBusStatus('unavailable', trip.bus_id);
    }
    trip.trip_id = trip.id;
    delete trip.id;
    delete trip.status;
    return {
      status: 'success',
      statuscode: 201,
      data: {
        ...trip,
      },
      message: 'New trip created successfully',
    };
  }
}

export default TripService;
