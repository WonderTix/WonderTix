// api/contacts/contacts.service.ts

import {response, buildResponse} from '../db';

/* NOTE -- Currently uses old database, so contacts are customers */

export const findAll = async (params: any): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM customers`,
    values: Array<string>(),
  };

  if (Object.keys(params).length > 0) {
    let count = 0;
    myQuery.text += ' WHERE';
    const textFields = ['custname', 'email', 'phone', 'address'];
    const checkBoxes = ['vip', 'volunteer list'];
    for (const val of Object.keys(params)) {
      count += 1;
      if (count > 1) {
        myQuery.text += ' AND';
      }
      if (textFields.includes(val)) {
        myQuery.text += ` LOWER(${val}) LIKE $${count}`;
        myQuery.values.push('%' + params[val].toLowerCase() + '%');
      } else if (checkBoxes.includes(val)) {
        myQuery.text += ` $${count} = $${count+1}`;
        myQuery.values.push(val);
        myQuery.values.push(params[val]);
      }
    }
  }
  console.log(myQuery);
  return await buildResponse(myQuery);
};

export const findByName = async (name: string): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM customers WHERE custname = $1`,
    values: [name],
  };
  return await buildResponse(myQuery);
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM customers WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery);
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO customers
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
    values: [r.custname, r.email, r.phone, r.custaddress, r.newsletter,
      r.donorbadge, r.seatingaccom, r.vip, r.volunteer_list],
  };
  return await buildResponse(myQuery);
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM customers WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery);
};

// This function takes the input provided by the user to update the Database
export const update = async (r: any): Promise<response> => {
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
  return await buildResponse(myQuery);
};
