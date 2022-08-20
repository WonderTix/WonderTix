// api/task_notes/task_notes.service.ts

import {buildResponse, response} from '../db';

export const findAll = async (): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM task_notes;`,
  };
  return await buildResponse(myQuery, 'GET');
};

export const find = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM task_notes WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'GET');
};

export const create = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      INSERT INTO task_notes
      VALUES (DEFAULT, $1, $2, $3)
      RETURNING *
      `,
    values: [r.task_id, r.notes, r.date_created],
  };
  return await buildResponse(myQuery, 'POST');
};

export const remove = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM task_notes WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};

export const update = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
      UPDATE task_notes
      SET (task_id, notes, date_created) = ($1, $2, $3)
      WHERE id = $4
      RETURNING *
      `,
    values: [r.body.task_id, r.body.notes, r.body.date_created, r.params.id],
  };
  return await buildResponse(myQuery, 'UPDATE');
};
