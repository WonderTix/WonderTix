// api/contacts/contacts.service.ts

import {response, buildResponse} from '../db';

/* NOTE -- Currently uses old database, so contacts are contacts */

export const findAll = async (params: any): Promise<response> => {
  const myQuery = {
    text: `SELECT * 
            FROM contacts 
            WHERE ($1::text IS NULL OR LOWER(custname) LIKE $1)
            AND ($2::text IS NULL OR LOWER(email) LIKE $2)
            AND ($3::text IS NULL OR LOWER(phone) LIKE $3)
            AND ($4::text IS NULL OR LOWER(custaddress) LIKE $4)
            AND ($5::boolean IS NULL OR vip = $5)
            AND ($6::boolean IS NULL OR "volunteer list" = $6)`,
    values: [
      params.custname !== undefined ?
        '%' + params.custname + '%' : params.custname,
      params.email !== undefined ?
        '%' + params.email + '%' : params.email,
      params.phone !== undefined ? '%' + params.phone + '%' : params.phone,
      params.address !== undefined ?
        '%' + params.address + '%' : params.address,
      params.vip,
      params.volunteer_list,
    ],
  };

  console.log(myQuery);
  return await buildResponse(myQuery, 'GET');
};

export const findByName = async (name: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM contacts WHERE custname = $1`,
    values: [name],
  };
  return await buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM contacts WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'GET');
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO contacts
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
    values: [r.custname, r.email, r.phone, r.custaddress, r.newsletter,
      r.donorbadge, r.seatingaccom, r.vip, r.volunteer_list],
  };
  return await buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM contacts WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};

// This function takes the input provided by the user to update the Database
export const update = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE contacts
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
  return await buildResponse(myQuery, 'UPDATE');
};
