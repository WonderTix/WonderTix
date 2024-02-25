// api/contacts/contacts.service.ts

import {response, buildResponse} from '../db';

/* NOTE -- Currently uses old database, so contacts are contacts */

export const findAll = async (params: any): Promise<response> => {
  const myQuery = {
    text: `SELECT *
            FROM contacts
            WHERE ($1::text IS NULL OR LOWER(firstname) LIKE $1)
            AND ($2::text IS NULL OR LOWER(lastname) LIKE $2)
            AND ($3::text IS NULL OR LOWER(email) LIKE $3)
            AND ($4::text IS NULL OR LOWER(address) LIKE $4)
            AND ($5::text IS NULL OR LOWER(phone) LIKE $5)
            AND ($6::boolean IS NULL OR donorbadge = $6)
            AND ($7::boolean IS NULL OR seatingaccom = $7)
            AND ($8::boolean IS NULL OR vip = $8)
            AND ($9::boolean IS NULL OR volunteerlist = $9)
            AND ($10::boolean IS NULL OR newsletter = $10)`,
    values: [
      params.firstname !== undefined ?
        '%' + params.firstname + '%' : params.firstname,
      params.lastname !== undefined ?
        '%' + params.lastname + '%' : params.lastname,
      params.email !== undefined ?
        '%' + params.email + '%' : params.email,
      params.address !== undefined ?
        '%' + params.address + '%' : params.address,
      params.phone !== undefined ?
        '%' + params.phone + '%' : params.phone,
      params.donorbadge,
      params.seatingaccom,
      params.vip,
      params.volunteerlist,
      params.newsletter,
    ],
  };

  console.log(myQuery);
  return await buildResponse(myQuery, 'GET');
};

export const findByName = async (firstname: string, lastname: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * 
          FROM contacts 
          WHERE lower(firstname) = lower($1) 
            OR lower(lastname) = lower($2) 
            OR lower(lastname) = lower($1);`,
    values: [firstname, lastname],
  };
  return await buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM contacts WHERE contactid = $1;',
    values: [id],
  };
  return await buildResponse(myQuery, 'GET');
};

export const findContactTicket = async (id: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM contacts 
           LEFT JOIN orders ON
           orders.contactid_fk = contacts.contactid
           WHERE contacts.contactid = $1;`,
    values: [id],
  };
  const resp = await buildResponse(myQuery, 'GET');

  for (let i=0; i<resp.data.length; i++) {
    if (resp.data[i].refund_intent) {
      resp.data[i].refunded = 'true';
    } else {
      resp.data[i].refunded = 'false';
    }
  }

  return resp;
};


export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO 
        contacts (firstname,
          lastname, 
          email, 
          address, 
          phone, 
          donorbadge, 
          seatingaccom, 
          newsletter, 
          vip, 
          volunteerlist)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;`,
    values: [
      r.firstname,
      r.lastname,
      r.email,
      r.address,
      r.phone,
      r.donorbadge,
      r.seatingaccom,
      r.newsletter,
      r.vip,
      r.volunteerlist],
  };
  return await buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE contacts 
          SET 
            firstname = null,
            lastname = null,
            email = null,
            address = null,
            phone = null,
            donorbadge = null,
            seatingaccom = null,
            vip = null,
            volunteerlist = null,
            newsletter = null
          WHERE 
            contactid = $1;`,
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};

// This function takes the input provided by the user to update the Database
export const update = async (r:any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE contacts
      SET (firstname,
           lastname,
           email,
           address,
           phone,
           donorbadge,
           seatingaccom,
           vip,
           volunteerlist,
           newsletter) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      WHERE contactid = $11
      RETURNING *;
      `,
    values: [
      r.body.firstname,
      r.body.lastname,
      r.body.email,
      r.body.address,
      r.body.phone,
      r.body.donorbadge,
      r.body.seatingaccom,
      r.body.vip,
      r.body.volunteerlist,
      r.body.newsletter,
      r.params.id],
  };
  return await buildResponse(myQuery, 'UPDATE');
};
