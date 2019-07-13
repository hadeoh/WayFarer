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

  static async getTripsDestination(destination) {
    const trip = await Trip.getTripsDestination(destination);
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

  static async updateTripStatus(tripId) {
    const foundTrip = await Trip.getATrip(tripId, 'id');
    if (!foundTrip) {
      return {
        statuscode: 404,
        status: 'error',
        error: 'Not Found',
        message: 'Trip does not exist',
      };
    }
    if (foundTrip.status === 'cancelled') {
      return {
        statuscode: 409,
        status: 'error',
        error: 'Conflict',
        message: 'This trip has been cancelled already',
      };
    }
    if (foundTrip) {
      await Trip.update('cancelled', tripId);
      return {
        statuscode: 202,
        status: 'success',
        data: { message: 'Trip cancelled successfully' },
      };
    }
  }
}

export default TripService;
