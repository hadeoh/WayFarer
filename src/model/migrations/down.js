import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
const BusType = 'DROP TYPE public.bus_status';
dropTable(BusType);
const QueryType = 'DROP TYPE public.trip_status';
dropTable(QueryType);
