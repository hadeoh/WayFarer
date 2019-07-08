/* eslint-disable camelcase */
import User from '../model/usermodel';
import helper from './helper';

/**
 *
 * @exports UserValidation
 * @class UserValidation
 */
class UserValidation {
  /**
   * Handles User input validation on sign up
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof UserValidation
   */
  static async signUpCheck(req, res, next) {
    let {
      email, first_name, last_name, password, confirm_password,
    } = req.body;

    if (first_name) first_name = first_name.trim();
    if (last_name) last_name = last_name.trim();
    if (email) email = email.trim();
    if (password) password = password.trim();
    if (confirm_password) confirm_password = confirm_password.trim();

    const errors = UserValidation.inputCheck(email, first_name, last_name, password, confirm_password);
    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    const isInvalid = helper.validateEmail(email);
    if (isInvalid) return res.status(isInvalid.statuscode).json(isInvalid);

    const result = await User.findEmail(email);

    if (result > 0) {
      return res.status(409).json({
        status: 'error',
        statuscode: 409,
        error: 'Email already in use',
        message: 'Please provide another email address',
      });
    }

    const passwordPattern = /\w{6,}/g;

    if (!passwordPattern.test(password)) {
      return res.status(406).json({
        status: 'error',
        statuscode: 406,
        error: 'Invalid password provided',
        message: 'Password must not be less than six(6) characters',
      });
    }

    if (password !== confirm_password) {
      return res.status(422).json({
        status: 'error',
        statuscode: 422,
        error: 'Invalid password provided',
        message: 'Passwords do not match',
      });
    }

    req.body.first_name = first_name;
    req.body.last_name = last_name;
    req.body.password = password;
    req.body.email = email;

    return next();
  }

  /**
   * Handles user input validation on log in
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof UserValidation
   */
  static loginCheck(req, res, next) {
    let { email, password } = req.body;

    if (email) email = email.trim();
    if (password) password = password.trim();

    const errors = [];

    let isEmpty;
    isEmpty = helper.checkFieldEmpty(email, 'email');
    if (isEmpty) errors.push(isEmpty);

    isEmpty = helper.checkFieldEmpty(password, 'password');
    if (isEmpty) errors.push(isEmpty);

    if (errors.length > 0) return res.status(errors[0].statuscode).json(errors[0]);

    req.body.email = email;
    req.body.password = password;
    return next();
  }

  /**
   *
   * Runs a check on the fields provided and returns appropriate errors if any
   * @static
   * @param {string} email
   * @param {string} first_name
   * @param {string} last_name
   * @param {string} password
   * @param {string} type
   * @returns {Array} an array of error(s)
   * @memberof UserValidation
   */
  static inputCheck(email, first_name, last_name, password, confirm_password) {
    const errors = [];
    let isEmpty;
    let hasWhiteSpace;
    isEmpty = helper.checkFieldEmpty(first_name, 'first_name');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(first_name, 'first_name');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    let isNotAlpha;
    isNotAlpha = helper.checkFieldAlpha(first_name, 'first_name');
    if (isNotAlpha) errors.push(isNotAlpha);

    isEmpty = helper.checkFieldEmpty(last_name, 'last_name');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(last_name, 'last_name');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isNotAlpha = helper.checkFieldAlpha(last_name, 'last_name');
    if (isNotAlpha) errors.push(isNotAlpha);

    isEmpty = helper.checkFieldEmpty(email, 'email');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(email, 'email');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(password, 'password');
    if (isEmpty) errors.push(isEmpty);

    hasWhiteSpace = helper.checkFieldWhiteSpace(password, 'password');
    if (hasWhiteSpace) errors.push(hasWhiteSpace);

    isEmpty = helper.checkFieldEmpty(confirm_password, 'confirm_password');
    if (isEmpty) errors.push(isEmpty);

    return errors;
  }
}

export default UserValidation;
