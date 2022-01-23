import { pool } from '../db';

export const findAll = async () => {
  const myQuery = 'SELECT * FROM donations';
  return pool.query(myQuery);
};

export const find = async (id: string) => {
  const myQuery = `SELECT * FROM donations WHERE donationid = ${id}`;
  return pool.query(myQuery);
};

export const findByDonorId = async (donorId: string) => {
  const myQuery = `SELECT * FROM donations WHERE donorid = ${donorId}`;
  return pool.query(myQuery);
};
