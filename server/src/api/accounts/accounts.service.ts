// api/accounts/accounts.service.ts

import {pool} from '../db';

/* NOTE -- currently uses old database, so accounts are users */

export const findAll = () => {
  const myQuery = {
    text: `SELECT * FROM users;`,
  };
  return pool.query(myQuery);
};

export const findByUsername = (username: string) => {
  const myQuery = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username],
  };
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const create = (r: any) => {
  const myQuery = {
    text: `
      INSERT INTO users
      VALUES (DEFAULT, $1, $2, $3)
      RETURNING *
      `,
    values: [r.username, r.pass_hash, r.is_superadmin],
  };
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM users WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const update = (r: any) => {
  const myQuery = {
    text: `
      UPDATE users
      SET (username, pass_hash, is_superadmin) = ($1, $2, $3)
      WHERE id = $4
      RETURNING *
      `,
    values: [
      r.body.username,
      r.body.pass_hash,
      r.body.is_superadmin,
      r.params.id,
    ],
  };
  return pool.query(myQuery);
};
