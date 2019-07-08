/* eslint-disable camelcase */
import db from './db';

class Booking {
  static async createBooking(req) {
    const {
      trip_id, seat_number,
    } = req.body;
    const busQuery = `INSERT INTO bookings(trip_id,user_id,seat_number) 
        VALUES ($1,$2,$3) returning *`;
    const result = await db.query(busQuery, [trip_id, req.userId, seat_number]);

    return result.rows[0];
  }

  static async findBooking(id) {
    const query = 'SELECT * FROM bookings WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

export default Booking;
