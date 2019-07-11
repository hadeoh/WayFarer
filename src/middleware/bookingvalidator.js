/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import helper from './helper';

class BookingValidation {
  static async bookingCheck(req, res, next) {
    let {
      trip_id, seat_number,
    } = req.body;

    const errors = BookingValidation.inputCheck(trip_id, seat_number);
    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    req.body.trip_id = trip_id;
    req.body.seat_number = seat_number;

    return next();
  }

  static inputCheck(trip_id, seat_number) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    let isInteger;
    isEmpty = helper.checkFieldEmpty(trip_id, 'trip_id');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(trip_id, 'trip_id');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isInteger = helper.checkFieldNumber(trip_id, 'trip_id');
    if (isInteger) errors.push(isInteger);

    isEmpty = helper.checkFieldEmpty(seat_number, 'seat_number');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(seat_number, 'seat_number');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isInteger = helper.checkFieldNumber(seat_number, 'seat_number');
    if (isInteger) errors.push(isInteger);

    return errors;
  }
}

export default BookingValidation;
