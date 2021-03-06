/* eslint-disable camelcase */
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
  static async create(newUser) {
    const {
      email, first_name, last_name, hashedpassword,
    } = newUser;

    const query = `INSERT INTO users(first_name,last_name,email,password)
        VALUES ($1,$2,$3,$4) returning *`;
    const result = await db.query(query, [first_name, last_name, email, hashedpassword]);
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

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows, rowCount } = await db.query(query, [id]);
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
