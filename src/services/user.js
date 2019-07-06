import Helper from '../middleware/helper';
import User from '../model/usermodel';
/**
 *
 * @exports
 * @class UserService
 */
class UserService {
  /**
   *
   * Handles the logic for creating a new user account
   * @static
   * @param {Object} newUser user details present in the incoming request body
   * @returns {Object} API Response Object
   * @memberof UserService
   */
  static async createUser(newUser, userType) {
    const { password } = newUser;
    const hashedpassword = Helper.hashPassword(password);
    const userObj = {
      ...newUser,
      hashedpassword,
    };

    const user = await User.create(userObj, userType);

    const {
      id, firstName, lastName, email, isAdmin,
    } = user;
    const payLoad = { id, email, isAdmin }; // when loggin in a user
    const token = Helper.getToken(payLoad);
    delete user.password;
    user.user_id = user.id;
    delete user.id;
    return {
      status: 'success',
      statuscode: 201,
      data: {
        ...user,
        token,
      },
      message: 'New user created successfully',
    };
  }

  /**
   *
   * Handles the logic for logging a user into the system
   * @static
   * @param {Object} userCredentials present in th incoming request body
   * @returns {Object} API Response Object
   * @memberof UserService
   */
  static async logUserIn(userCredentials) {
    const { email, password } = userCredentials;
    const foundUser = await User.findByEmail(email);
    // eslint-disable-next-line curly
    if (!foundUser) return {
      status: 'error',
      statuscode: 401,
      error: 'This email is not registered here',
    };

    const hash = foundUser.password;
    if (Helper.comparePassword(password, hash) === true) {
      const { id, first_name, last_name, is_admin } = foundUser;
      const payLoad = {
        id,
        firstName: first_name,
        lastName: last_name,
        email,
        isAdmin: is_admin,
      };
      const token = Helper.getToken(payLoad);
      return {
        status: 'success',
        statuscode: 200,
        data: {
          user_id: id,
          firstName: first_name,
          lastName: last_name,
          email,
          token,
          isAdmin: is_admin,
        },
        message: 'User Log In Successful',
      };
    }
    return {
      status: 'error',
      statuscode: 401,
      error: 'Authentication Failed. Invalid Login credentials provided',
    };
  }
}

export default UserService;
