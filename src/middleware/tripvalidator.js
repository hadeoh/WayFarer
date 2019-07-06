import Bus from '../model/bus';
import Trip from '../model/trip';
import helper from './helper';

class TripValidation {
  static async tripCheck(req, res, next) {
    let {
      busId, origin, destination, tripDate, fare,
    } = req.body;

    if (origin) origin = origin.trim();
    if (destination) destination = destination.trim();
    if (tripDate) tripDate = tripDate.trim();
    if (fare) fare = fare.trim();

    const errors = TripValidation.inputCheck(busId, origin, destination, tripDate, fare);
    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    const result = await Bus.findBus(busId);

    if (result < 0) {
      return res.status(404).json({
        status: 'error',
        statuscode: 404,
        error: 'Bus with such a busId does not exist',
        message: 'Please provide a bus with another busId',
      });
    }

    const availableBus = await Bus.findAvailableBus(busId);


    if (availableBus < 1) {
      return res.status(422).json({
        status: 'error',
        statuscode: 422,
        error: 'The bus picked is not available',
        message: 'Please pick another bus that is available',
      });
    }

    req.body.busId = busId;
    req.body.origin = origin;
    req.body.destination = destination;
    req.body.tripDate = tripDate;
    req.body.fare = fare;

    return next();
  }

  static inputCheck(busId, origin, destination, tripDate, fare) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    let isInteger;
    isEmpty = helper.checkFieldEmpty(busId, 'busId');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(busId, 'busId');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isInteger = helper.checkFieldNumber(busId, 'busId');
    if (isInteger) errors.push(isInteger);

    isEmpty = helper.checkFieldEmpty(origin, 'origin');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(origin, 'origin');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(destination, 'destination');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(destination, 'destination');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(tripDate, 'tripDate');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(tripDate, 'tripDate');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(fare, 'fare');
    if (isEmpty) errors.push(isEmpty);

    isInteger = helper.checkFieldNumber(fare, 'fare');
    if (isInteger) errors.push(isInteger);


    return errors;
  }
}

export default TripValidation;
