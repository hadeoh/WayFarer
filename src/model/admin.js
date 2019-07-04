import db from './db';
import Helper from '../middleware/helper';

const adminValue = [
  'usman',
  'adio',
  'usthmandanfodio@gmail.com',
  Helper.hashPassword('modupeola'),
  true,
];

const busValue1 = [
  '1234a',
  'honda',
  'civic',
  '2017',
  100,
  'available',
];

const busValue2 = [
  '1234b',
  'honda',
  'civic',
  '2017',
  100,
  'available',
];

const busValue3 = [
  '1234c',
  'honda',
  'civic',
  '2017',
  100,
  'unavailable',
];


const insertAdmins = async () => {
  const insertAdmin = `INSERT INTO
        users(first_name, last_name, email, password, is_admin)
        VALUES($1, $2, $3, $4, $5) RETURNING *`;

  await db.query(insertAdmin, adminValue);

  const insertBuses = `INSERT INTO buses(number_plate,manufacturer,model,year,capacity,status) 
  VALUES ($1,$2,$3,$4,$5,$6) returning *`;

  await db.query(insertBuses, busValue1);
  await db.query(insertBuses, busValue2);
  await db.query(insertBuses, busValue3);
};

console.log('admin added');

insertAdmins();
