/* eslint-disable camelcase */
import Bus from '../model/bus';
import helper from './helper';

class BusValidation {
  static async busCheck(req, res, next) {
    let { number_plate, manufacturer, model, year, capacity } = req.body;

    if (number_plate) number_plate = number_plate.trim();
    if (manufacturer) manufacturer = manufacturer.trim();
    if (model) model = model.trim();
    if (year) year = year.trim();

    const errors = BusValidation.inputCheck(number_plate, manufacturer, model, year, capacity);
    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    const result = await Bus.findBus(number_plate);

    if (result > 0) {
      return res.status(409).json({
        status: 'error',
        statuscode: 409,
        error: 'Bus with such a numberPlate already exists',
        message: 'Please provide a bus with another numberPlate',
      });
    }

    req.body.number_plate = number_plate;
    req.body.manufacturer = manufacturer;
    req.body.model = model;
    req.body.year = year;
    req.body.capacity = capacity;

    return next();
  }

  static inputCheck(number_plate, manufacturer, model, year, capacity) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    let isInteger;
    isEmpty = helper.checkFieldEmpty(number_plate, 'number_plate');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(number_plate, 'number_plate');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(manufacturer, 'manufacturer');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(manufacturer, 'manufacturer');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(model, 'model');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(model, 'model');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(year, 'year');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(year, 'year');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(capacity, 'capacity');
    if (isEmpty) errors.push(isEmpty);

    isInteger = helper.checkFieldNumber(capacity, 'capacity');
    if (isInteger) errors.push(isInteger);


    return errors;
  }
}

export default BusValidation;
