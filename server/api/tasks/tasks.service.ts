// api/tasks/tasks.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

export const findAll = (params?: QueryAttr) => {
  const myQuery = buildQuery('task', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM task WHERE id = ${id}`;
  return pool.query(myQuery);
};
