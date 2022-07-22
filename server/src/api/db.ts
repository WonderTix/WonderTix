// api/db.ts

import dotenv from 'dotenv';
import path from 'path';
import {Pool} from 'pg';

dotenv.config({path: path.join(__dirname, '../../../.env')});
// console.log(path.join(__dirname, '../../.env'));

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ?
      +process.env.DB_PORT : 5432,
  host: process.env.DB_HOST,
};

console.log('DB_HOST: ' + process.env.DB_HOST);

export const pool = new Pool(config);

pool.on('connect', () => {
  console.log(
      `
      [database]: Connected to ${config.database}/${config.user}@${config.host}
      `,
  );
});
