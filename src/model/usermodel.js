/* eslint-disable default-case */
import db from './db';
/**
 *
 *@exports
 * @class User
 */
class User {
  /**
     *
     * Handles the storage of the details of a newly created user in the database
     * @static
     * @param {object} newUser object containing new user details
     * @returns {object} result of stored data in database
     * @memberof User
     */
  static async create(newUser, userType) {
    const { email, firstName, lastName, hashedpassword } = newUser;
    let query;
    let result;
    switch (userType) {
      case 'admin':
        query = `INSERT INTO users(first_name,last_name,email,password,is_admin) 
        VALUES ($1,$2,$3,$4,$5) returning *`;
        result = await db.query(query, [firstName, lastName, email, hashedpassword, true]);
        break;
      case 'user':
        query = `INSERT INTO users(first_name,last_name,email,password)
        VALUES ($1,$2,$3,$4) returning *`;
        result = await db.query(query, [firstName, lastName, email, hashedpassword]);
    }
    return result.rows[0];
  }

  /**
     *
     * Queries the database to find a user, using the provided email address
     * @static
     * @param {string} email
     * @returns {object} details of the found user
     * @memberof User
     */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows, rowCount } = await db.query(query, [email]);
    if (rowCount > 0) return rows[0];
    return false;
  }

  /**
     *
     * Checks if email record exists in database
     * @static
     * @param {sting} email
     * @returns {number} the number of email record(s) found
     * @memberof User
     */
  static async findEmail(email) {
    const query = 'SELECT email FROM users WHERE email = $1';
    const { rowCount } = await db.query(query, [email]);
    return rowCount;
  }
}

export default User;
