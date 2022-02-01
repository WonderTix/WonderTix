// api/db.ts

import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
console.log(path.join(__dirname, '../../.env'));

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
  host: process.env.DB_HOST
};

export const pool = new Pool(config);

pool.on('connect', () => {
  console.log(
    `[database]: Connected to ${config.database}/${config.user}@${config.host}`
  );
});
