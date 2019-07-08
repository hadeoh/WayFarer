/* eslint-disable camelcase */
import db from './db';

class Bus {
  static async createBus(newBus) {
    const {
      number_plate, manufacturer, model, year, capacity,
    } = newBus;
    const busQuery = `INSERT INTO buses(number_plate,manufacturer,model,year,capacity,status) 
        VALUES ($1,$2,$3,$4,$5,$6) returning *`;
    const result = await db.query(busQuery, [number_plate, manufacturer, model, year, capacity, 'available']);
    return result.rows[0];
  }

  static async findBus(id) {
    const query = 'SELECT * FROM buses WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async findAvailableBus(id) {
    const query = 'SELECT * FROM buses WHERE id = $1 AND status = $2';
    const { rowCount } = await db.query(query, [id, 'available']);
    return rowCount;
  }

  static async updateBusStatus(status, id) {
    const query = 'UPDATE buses SET status=$1 WHERE id=$2 RETURNING * ;';
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  }
}

export default Bus;
