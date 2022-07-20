// api/tasks/tasks.service.ts

import {pool} from '../db';

export const findAll = () => {
  const myQuery = {
    text: `SELECT * FROM task;`,
  };
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = {
    text: 'SELECT * FROM task WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const create = (r: any) => {
  const myQuery = {
    text: `
      INSERT INTO task
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
      `,
    values: [r.parent_id, r.subject, r.description, r.status,
      r.assign_to, r.report_to, r.date_created,
      r.date_assigned, r.due_date, r.rel_contact,
      r.rel_donation, r.rel_ticket_order, r.rel_account],
  };
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM task WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const update = (r: any) => {
  const myQuery = {
    text: `
      UPDATE task
      SET (parent_id,
           subject,
           description,
           status,
           assign_to,
           report_to,
           date_created,
           date_assigned,
           due_date,
           rel_contact,
           rel_donation,
           rel_ticket_order,
           rel_account) = 
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      WHERE id = $14
      RETURNING *
      `,
    values: [r.body.parent_id, r.body.subject, r.body.description,
      r.body.status, r.body.assign_to, r.body.report_to,
      r.body.date_created, r.body.date_assigned, r.body.due_date,
      r.body.rel_contact, r.body.rel_donation, r.body.rel_ticket_order,
      r.body.rel_account, r.params.id],
  };
  return pool.query(myQuery);
};
