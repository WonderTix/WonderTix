// api/contacts/contacts.service.ts

import { pool } from '../db';

/* Currently uses old database, so contacts are customers */

export const findAll = () => {
  const myQuery = 'SELECT * FROM customers';
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM customers WHERE id = ${id}`;
  return pool.query(myQuery);
};
