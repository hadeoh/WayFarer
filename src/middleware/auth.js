import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 *
 *@exports
 * @class Auth
 */
class Auth {
  /**
   *
   * Handles Authorization and determines who is currently logged in if authorization is successful
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} Function next() or an error Object
   * @memberof Auth
   */
  static getUser(req, res, next) {
    try {
      if (!req.headers.authorization) throw new Error('No token provided, You do not have access to this page');
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      req.userId = decoded.id;
      req.userEmail = decoded.email;
      req.is_admin = decoded.is_admin;

      return next();
    } catch (e) {
      return res.status(401).send({
        status: 'error',
        statuscode: 401,
        error: `${e.name}. ${e.message}`,
      });
    }
  }

  /**
   *
   * Checks if the current user is an admin or not and applies appropriate access control
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|Object)} Function next() or an error Object
   * @memberof Auth
   */
  static adminCheck(req, res, next) {
    if (req.is_admin !== true) {
      return res.status(401).json({
        status: 'error',
        statuscode: 401,
        error: 'Unauthorized action!',
        message: 'Only admins can perform this action',
      });
    }
    return next();
  }

  static notAdminCheck(req, res, next) {
    if (req.is_admin !== false) {
      return res.status(401).json({
        status: 'error',
        statuscode: 401,
        error: 'Unauthorized action!',
        message: 'Only users can perform this action',
      });
    }
    return next();
  }
}

export default Auth;
