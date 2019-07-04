import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/usermodel';

dotenv.config();

/**
 *
 * @exports
 * @class Helper
 */
class Helper {
  /**
   *
   * Generates token string
   * @static
   * @param {Object} userPayload Incoming payload required to generate token
   * @returns {String} A token string
   * @memberof Helper
   */
  static getToken(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET, { expiresIn: '365d' });
  }

  /**
   *
   * Hashes a provided password
   * @static
   * @param {String} password password required to be encrypted
   * @returns {String} A hash string
   * @memberof Helper
   */
  static hashPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  /**
   *
   * Compares a password against a hash
   * @static
   * @param {String} password password required to be encrypted
   * @param {String} hash data to be compared against
   * @returns {Boolean}
   * @memberof Helper
   */
  static comparePassword(password, hash) {
    const result = bcrypt.compareSync(password, hash);
    return result;
  }

  /**
   * Checks if input provided is empty
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */
  static checkFieldEmpty(value, field) {
    if (!value) {
      return {
        status: 'error',
        statuscode: 422,
        error: `Invalid ${field} provided`,
        message: `${field} cannot be empty`,
      };
    }
    return false;
  }

  /**
   * Checks for whitespace on input provided
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */
  static checkFieldWhiteSpace(value, field) {
    if (/\s/.test(value)) {
      return {
        status: 'error',
        statuscode: 422,
        error: `Invalid ${field} provided`,
        message: `No whitespaces allowed in ${field}`,
      };
    }
    return false;
  }

  /**
   * Checks if input provided is alphabetical
   *
   * @param {string} value value to be validated
   * @param {string} field field name of the value to be validated
   * @returns {object|boolean} error object or boolean
   */
  static checkFieldAlpha(value, field) {
    const pattern = /^[a-zA-Z]+$/;
    if (!pattern.test(value)) {
      return {
        status: 'error',
        statuscode: 422,
        error: `Invalid ${field} provided`,
        message: `${field} must contain only alphabets`,
      };
    }
    return false;
  }

  static checkFieldNumber(value, field) {
    if (!Number(value)) {
      return {
        status: 'error',
        statuscode: 403,
        error: `Invalid ${field} provided`,
        message: `${field} must contain only numbers`,
      };
    }
    return false;
  }

  static validateEmail(email) {
    // cited from stackoverflow
    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(email)) {
      return {
        status: 'error',
        statuscode: 422,
        error: 'Invalid email address',
        message: 'Please provide a valid email address',
      };
    }
    return false;
  }
}

export default Helper;
