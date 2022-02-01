// api/contacts/contacts.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

/* NOTE -- Currently uses old database, so contacts are customers */

export const findAll = (params?: QueryAttr) => {
  const myQuery = buildQuery('customers', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM customers WHERE id = ${id}`;
  return pool.query(myQuery);
};
