// api/donations/donations.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

export const findAll = (params?: QueryAttr) => {
  //const myQuery = 'SELECT * FROM donations';
  const myQuery = buildQuery('donations', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = { 
    text: 'SELECT * FROM donations WHERE donationid = $1', 
    values: [id] 
  }
  return pool.query(myQuery);
};

export const create = (r: any) => {
  const myQuery = {
    text: `
      INSERT INTO donations
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
      `,
    values: [r.donorid, r.isanonymous, r.amount, r.dononame, 
             r.frequency, r.comments, r.donodate]
  }
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM donations WHERE id = $1',
    values: [id]
  }
  return pool.query(myQuery);
};

export const update = (r: any) => {
  const myQuery = {
    text: `
      UPDATE donations
      SET (donorid, isanonymous, amount, dononame, frequency, comments, donodate) = 
          ($1, $2, $3, $4, $5, $6, $7)
      WHERE id = $8
      RETURNING *
      `,
    values: [r.body.donorid, r.body.isanonymous, r.body.amount, r.body.dononame, 
             r.body.frequency, r.body.comments, r.body.donodate, r.params.id]
  }
  return pool.query(myQuery);
};