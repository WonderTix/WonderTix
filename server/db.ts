import dotenv from 'dotenv';
import {Pool} from 'pg';

// .env file should be in root dir (capstone-mockup)
dotenv.config({path: './../.env'});

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE,
});
