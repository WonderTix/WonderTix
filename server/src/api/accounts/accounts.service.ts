// api/accounts/accounts.service.ts

import {pool} from '../db';

/* NOTE -- currently uses old database, so accounts are users */
type response = {
  data: object,
  status: {
    success: boolean,
    message: string,
  }
}

const buildResponse = async (query: any): Promise<response> => {
  let resp: response = {
    data: {},
    status: {
      success: false,
      message: "",
    }
  };
  try {
    const res = await pool.query(query)
      resp = {
        data: res.rows,
        status: {
          success: true,
          message: "Ok",
        }
      }
  } catch (error: any) {
    resp.status.message = error.message;
  }
  return resp;
}

export const findAll = async (): Promise<response> => {
  const myQuery = `SELECT * FROM users;`;
  return await buildResponse(myQuery);
};

export const findByUsername = async (username: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username],
  };
  return await buildResponse(myQuery);
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery);
};

export const create = async (r: {username: string, auth0_id: string}): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO users
      VALUES (DEFAULT, $1, DEFAULT, $2)
      RETURNING *
      `,
    values: [r.username, r.auth0_id],
  };
  return await buildResponse(myQuery);
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM users WHERE id = $1',
    values: [id],
  };
  return buildResponse(myQuery);
};

export const update = async (r: any): Promise<response> => {
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
  return buildResponse(myQuery);
};
