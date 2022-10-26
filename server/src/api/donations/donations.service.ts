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
    text: `SELECT * FROM donations WHERE lower(donorname) = lower($1)`,
    values: [name],
  };
  return buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM donations WHERE donationid = $1',
    values: [id],
  };
  return buildResponse(myQuery, 'GET');
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO donations
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
    values: [r.customerid, r.isanonymous, r.amount, r.donorname,
      r.frequency, r.comments, r.payment_intent, r.donationdate],
  };
  return buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM donations WHERE donationid = $1',
    values: [id],
  };
  return buildResponse(myQuery, 'DELETE');
};

export const update = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE donations
      SET (
        customerid_fk,
        isanonymous,
        amount,
        donorname,
        frequency,
        comments,
        payment_intent,
        donationdate) =
          ($1, $2, $3, $4, $5, $6, $7, $8)
      WHERE donationid = $9
      RETURNING *
      `,
    values: [r.body.customerid_fk, r.body.isanonymous, r.body.amount, r.body.donorname,
      r.body.frequency, r.body.comments, r.body.payment_intent, r.body.donationdate, r.params.id],
  };
  return buildResponse(myQuery, 'UPDATE');
};
