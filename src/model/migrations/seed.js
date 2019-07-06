import db from '../db';
import Helper from '../../middleware/helper';

/** Start dummy users */
const user1values = [
  'franchess',
  'sandra',
  'franchesqa@gmail.com',
  Helper.hashPassword('yh89uyightGH'),
  true,
];

const user2values = [
  'ifeoluwa',
  'matthew',
  'ojematthew@gmail.com',
  Helper.hashPassword('yh89uyightGH'),
  false,
];

const user3values = [
  'toluwalope',
  'iyinoluwa',
  'toluniyin@gmail.com',
  Helper.hashPassword('yh89uyightGH'),
  false,
];

const bus1values = [
  1233,
  'Mercedes',
  'E350',
  '2017',
  100,
  'available',
];

const bus2values = [
  'aaaaa',
  'Mercedes',
  'E350',
  '2017',
  100,
  'unavailable',
];

const bus3values = [
  1235,
  'Mercedes',
  'E350',
  '2017',
  100,
  'available',
];

const trip1values = [
  1,
  'Lagos',
  'Ilorin',
  '2009-11-10',
  '2555.6',
  'active',
];

const trip2values = [
  2,
  'Delta',
  'Potiskum',
  '2009-10-10',
  '2555.8',
  'active',
];

const trip3values = [
  3,
  'Kwara',
  'Oyo',
  '2009-12-10',
  '2555.7',
  'cancelled',
];

const createUsers = async () => {
  const query = `INSERT INTO users(first_name,last_name,email,password,is_admin) 
  VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  await db.query(query, user1values);
  await db.query(query, user2values);
  await db.query(query, user3values)
    .then(() => {
      console.log('user created successfully');
    })
    .catch((err) => {
      console.log('users seeding failed.', err);
    });
};

const createBuses = async () => {
  const query = `INSERT INTO buses(number_plate,manufacturer,model,year,capacity,status) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  await db.query(query, bus1values);
  await db.query(query, bus2values);
  await db.query(query, bus3values)
    .then(() => {
      console.log('bus created successfully');
    })
    .catch((err) => {
      console.log('buses seeding failed.', err);
    });
};

const createTrips = async () => {
  const query = `INSERT INTO trips(bus_id,origin,destination,trip_date,fare,status) 
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  await db.query(query, trip1values);
  await db.query(query, trip2values);
  await db.query(query, trip3values)
    .then(() => {
      console.log('trip created successfully');
    })
    .catch((err) => {
      console.log('trip seeding failed.', err);
    });
};

const insertData = async () => {
  await createUsers();
  await createBuses();
  await createTrips();
};

module.exports = {
  insertData,
};

insertData();
