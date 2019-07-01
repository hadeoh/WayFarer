import UserService from '../services/user';
// import Helper from '../middleware/helper';
/**
 *@exports
 *
 * @class UserController
 */
class UserController {
  /**
   *
   *Handles the logic for creating a new user account
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} JSON API Response
   * @memberof UserController
   */
  static async createUser(req, res, next) {
    try {
      const response = await UserService.createUser(req.body, 'user');
      return res.status(response.statuscode).json(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;
