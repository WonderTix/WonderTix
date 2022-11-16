// api/task_notes/task_notes.service.ts

import {buildResponse, response} from '../db';

export const findAll = async (): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM tasknotes;`,
  };
  return await buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM tasknotes WHERE tasknoteid = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'GET');
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO tasknotes (taskid_fk, date, notes)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
    values: [r.task_id, r.date_created, r.notes],
  };
  return await buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM tasknotes WHERE tasknoteid = $1;',
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};

export const update = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE task_notes
      SET (tasknoteid, taskid_fk, date_created, notes) = ($1, $2, $3, $4)
      WHERE id = $5
      RETURNING *;
      `,
    values: [r.body.tasknoteid, r.body.taskid_fk, r.body.date_created, r.body.notes, r.params.id]};
  return await buildResponse(myQuery, 'UPDATE');
};
