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

pool.on('error', (err) => {
  console.log(err);
});

/**
 * Create Tables
 */
const createTableSchema = async () => {
  const sqlText = `
    CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(128) NOT NULL,
            last_name VARCHAR(128) NOT NULL,
            email VARCHAR(128) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN NOT NULL DEFAULT FALSE
            );
    CREATE TABLE buses (
        id SERIAL PRIMARY KEY NOT NULL,
        number_plate VARCHAR(128) NOT NULL UNIQUE,
        manufacturer TEXT NOT NULL ,
        model VARCHAR(128) NOT NULL,
        year VARCHAR(128) NOT NULL,
        capacity NUMERIC(15,2) NOT NULL,
        status TEXT NOT NULL DEFAULT 'available'
        );
    CREATE TABLE trips (
        id SERIAL PRIMARY KEY NOT NULL,
        bus_id INTEGER NOT NULL REFERENCES buses(id) ON DELETE CASCADE,
        origin TEXT NOT NULL,
        destination VARCHAR(128) NOT NULL,
        trip_date DATE Not NULL,
        fare FLOAT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active'
        );
    CREATE TABLE bookings (
        id SERIAL PRIMARY KEY NOT NULL,
        trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_on DATE DEFAULT now()
    )
        `;
  await pool.query(sqlText);
  pool.end();
};

createTableSchema();
