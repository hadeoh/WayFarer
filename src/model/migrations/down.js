import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

let dbURI;

if (process.env.NODE_ENV.trim() === 'TEST') {
  dbURI = process.env.TEST_DATABASE_URL;
} else {
  dbURI = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString: dbURI,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

/**
 * Drop Tables
 */
const dropTable = async (queryText) => {
  await pool.query(queryText);
  pool.end();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const QueryText = 'DROP TABLE IF EXISTS users, buses, trips, bookings';
dropTable(QueryText);
