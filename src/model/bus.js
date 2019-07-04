import db from './db';

class Bus {
  static async createBus(newBus) {
    const { numberPlate, manufacturer, model, year, capacity } = newBus;
    const busQuery = `INSERT INTO buses(number_plate,manufacturer,model,year,capacity) 
        VALUES ($1,$2,$3,$4,$5) returning *`;
    const result = await db.query(busQuery, [numberPlate, manufacturer, model, year, capacity]);
    return result.rows[0];
  }

  static async findBus(numberPlate) {
    const query = 'SELECT number_plate FROM buses WHERE number_plate = $1';
    const { rowCount } = await db.query(query, [numberPlate]);
    return rowCount;
  }
}

export default Bus;
