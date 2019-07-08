/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import Bus from '../model/bus';
import Trip from '../model/trip';
import helper from './helper';

class TripValidation {
  static async tripCheck(req, res, next) {
    let {
      bus_id, origin, destination, trip_date, fare,
    } = req.body;

    if (origin) origin = origin.trim();
    if (destination) destination = destination.trim();
    if (trip_date) trip_date = trip_date.trim();
    if (fare) fare = fare.trim();

    const errors = TripValidation.inputCheck(bus_id, origin, destination, trip_date, fare);
    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    const result = await Bus.findBus(bus_id);

    if (result < 0) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        error: 'Bus with such a busId does not exist',
        message: 'Please provide a bus with another busId',
      });
    }

    const availableBus = await Bus.findAvailableBus(bus_id);


    if (availableBus < 1) {
      return res.status(422).json({
        status: 'error',
        statuscode: 422,
        error: 'The bus picked is not available',
        message: 'Please pick another bus that is available',
      });
    }

    req.body.bus_id = bus_id;
    req.body.origin = origin;
    req.body.destination = destination;
    req.body.trip_date = trip_date;
    req.body.fare = fare;

    return next();
  }

  static inputCheck(bus_id, origin, destination, trip_date, fare) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    let isInteger;
    isEmpty = helper.checkFieldEmpty(bus_id, 'bus_id');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(bus_id, 'bus_id');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isInteger = helper.checkFieldNumber(bus_id, 'bus_id');
    if (isInteger) errors.push(isInteger);

    isEmpty = helper.checkFieldEmpty(origin, 'origin');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(origin, 'origin');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(destination, 'destination');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(destination, 'destination');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(trip_date, 'trip_date');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(trip_date, 'trip_date');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(fare, 'fare');
    if (isEmpty) errors.push(isEmpty);

    isInteger = helper.checkFieldNumber(fare, 'fare');
    if (isInteger) errors.push(isInteger);


    return errors;
  }
}

export default TripValidation;
