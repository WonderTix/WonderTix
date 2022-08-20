// api/donations/donations.service.ts

import {response, buildResponse} from '../db';

export const findAll = async (): Promise<response> => {
  // const myQuery = 'SELECT * FROM donations';
  const myQuery = {
    text: `SELECT * FROM donations;`,
  };
  return buildResponse(myQuery, 'GET');
};

export const findByName = async (name: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM donations WHERE dononame = $1`,
    values: [name],
  };
  return buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM donations WHERE id = $1',
    values: [id],
  };
  return buildResponse(myQuery, 'GET');
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO donations
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
    values: [r.donorid, r.isanonymous, r.amount, r.dononame,
      r.frequency, r.comments, r.donodate],
  };
  return buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM donations WHERE id = $1',
    values: [id],
  };
  return buildResponse(myQuery, 'DELETE');
};

export const update = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE donations
      SET (
        donorid,
        isanonymous,
        amount,
        dononame,
        frequency,
        comments,
        donodate) = 
          ($1, $2, $3, $4, $5, $6, $7)
      WHERE id = $8
      RETURNING *
      `,
    values: [r.body.donorid, r.body.isanonymous, r.body.amount, r.body.dononame,
      r.body.frequency, r.body.comments, r.body.donodate, r.params.id],
  };
  return buildResponse(myQuery, 'UPDATE');
};
