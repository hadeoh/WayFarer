import db from './db';
import Helper from '../middleware/helper';

const adminValue = [
  'usman',
  'adio',
  'usthmandanfodio@gmail.com',
  Helper.hashPassword('modupeola'),
  true,
];

const insertAdmins = async () => {
  const insertAdmin = `INSERT INTO
        users(first_name, last_name, email, password, is_admin)
        VALUES($1, $2, $3, $4, $5) RETURNING *`;

  await db.query(insertAdmin, adminValue);
};

console.log('admin added');

insertAdmins();
