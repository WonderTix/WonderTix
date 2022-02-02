// api/donations/donations.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

export const findAll = (params?: QueryAttr) => {
  //const myQuery = 'SELECT * FROM donations';
  const myQuery = buildQuery('donations', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM donations WHERE donationid = ${id}`;
  return pool.query(myQuery);
};
