// api/contacts/contacts.service.ts

import { pool } from '../db';
import { QueryBuilder } from '../util/query-builder';

/* Currently uses old database, so contacts are customers */

export const findAll = (params?: Object) => {
  if (params === undefined) {
    params = {};
  }

  console.log(params);

  let myQuery = new QueryBuilder('customers', params).build();
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = `SELECT * FROM customers WHERE id = ${id}`;
  return pool.query(myQuery);
};
