// api/contacts/contacts.service.ts

import {pool} from '../db';

/* NOTE -- Currently uses old database, so contacts are customers */

export const findAll = () => {
  const myQuery = {
    text: `SELECT * FROM customers;`,
  };
  return pool.query(myQuery);
};

export const findByName = (name: string) => {
  const myQuery = {
    text: `SELECT * FROM customers WHERE custname = $1`,
    values: [name],
  };
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = {
    text: 'SELECT * FROM customers WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const create = (r: any) => {
  const myQuery = {
    text: `
      INSERT INTO customers
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
    values: [r.custname, r.email, r.phone, r.custaddress, r.newsletter,
      r.donorbadge, r.seatingaccom, r.vip, r.volunteer_list],
  };
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM customers WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

// This function takes the input provided by the user to update the Database
export const update = (r: any) => {
  const myQuery = {
    text: `
      UPDATE customers
      SET (custname,
           email,
           phone,
           custaddress,
           newsletter,
           donorbadge,
           seatingaccom,
           vip,
           "volunteer list") = ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      WHERE id = $10
      RETURNING *
      `,
    values: [r.body.custname, r.body.email, r.body.phone,
      r.body.custaddress, r.body.newsletter, r.body.donorbadge,
      r.body.seatingaccom, r.body.vip, r.body.volunteer_list, r.params.id],
  };
  return pool.query(myQuery);
};
