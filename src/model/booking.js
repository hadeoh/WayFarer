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

  static async findBooking(bookingId) {
    const query = 'SELECT * FROM bookings WHERE id = $1';
    const { rows } = await db.query(query, [bookingId]);
    return rows[0];
  }

  static async findBookingSeat(seat_number) {
    const query = 'SELECT * FROM bookings WHERE seat_number = $1';
    const { rows } = await db.query(query, [seat_number]);
    return rows[0];
  }

  static async getAllBookings() {
    const query = 'SELECT bookings.id AS booking_id,bookings.user_id,bookings.trip_id, trips.bus_id, trips.trip_date,bookings.seat_number,users.first_name,users.last_name,users.email FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.trip_id';
    const result = await db.query(query);
    return result.rows;
  }

  static async getAllUserbookings(user_id) {
    const query = 'SELECT bookings.id AS booking_id,bookings.user_id,bookings.trip_id, trips.bus_id, trips.trip_date,bookings.seat_number,users.first_name,users.last_name,users.email FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.trip_id WHERE user_id = $1';
    const result = await db.query(query, [user_id]);
    return result.rows;
  }

  static async getUserBookings(req) {
    const query = 'SELECT * FROM bookings WHERE user_id = $1';
    const result = await db.query(query, [req.userId]);
    return result.rows;
  }

  static async deleteBooking(bookingId) {
    const query = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
    const result = await db.query(query, [bookingId]);
    return result.rows;
  }

  static async changeSeat(seat_number, modified_on, bookingId, user_id) {
    const query = 'UPDATE bookings SET seat_number = $1, modified_on = $2 WHERE id = $3 AND user_id = $4 RETURNING *';
    const result = await db.query(query, [seat_number, modified_on, bookingId, user_id]);
    return result.rows;
  }
}

export default Booking;
