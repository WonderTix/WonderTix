// api/accounts/accounts.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

/* NOTE -- currently uses old database, so accounts are users */

export const findAll = (params?: QueryAttr) => {
  const myQuery = buildQuery('users', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM users WHERE id = ${id}`;
  return pool.query(myQuery);
};
