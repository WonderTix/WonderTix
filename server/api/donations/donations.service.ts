// api/donations/donations.service.ts

import { pool } from '../db';

export const findAll = async () => {
  const myQuery = 'SELECT * FROM donations';
  return pool.query(myQuery);
};

export const find = async (id: string) => {
  const myQuery = `SELECT * FROM donations WHERE donationid = ${id}`;
  return pool.query(myQuery);
};
