import db from './db';

class Trip {
  static async createTrip(newTrip) {
    const { busId, origin, destination, tripDate, fare } = newTrip;
    const busQuery = `INSERT INTO trips(bus_id,origin,destination,trip_date,fare,status) 
        VALUES ($1,$2,$3,$4,$5,$6) returning *`;
    const result = await db.query(busQuery, [busId, origin, destination, tripDate, fare, 'active']);
    return result.rows[0];
  }
}

export default Trip;