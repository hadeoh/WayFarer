/* eslint-disable camelcase */
import db from './db';

class Trip {
  static async createTrip(newTrip) {
    const {
      bus_id, origin, destination, trip_date, fare,
    } = newTrip;
    const busQuery = `INSERT INTO trips(bus_id,origin,destination,trip_date,fare,status) 
        VALUES ($1,$2,$3,$4,$5,$6) returning *`;
    const result = await db.query(busQuery, [bus_id, origin, destination, trip_date, fare, 'active']);
    return result.rows[0];
  }

  static async getAllTrips() {
    const query = 'SELECT * FROM trips';
    const { rows, rowCount } = await db.query(query);
    if (rowCount > 0) return rows;
    return false;
  }

  static async getATrip(trip_id) {
    const query = 'SELECT * FROM trips WHERE trip_id = $1';
    const result = await db.query(query, [trip_id]);
    return result.rows[0];
  }

  static async update(status, tripId) {
    const query = 'UPDATE trips SET status = $1 where trip_id = $2';
    const result = await db.query(query, [status, tripId]);
    return result.rows;
  }
}

export default Trip;
