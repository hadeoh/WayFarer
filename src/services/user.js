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
}

export default UserService;
