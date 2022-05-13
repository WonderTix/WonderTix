// api/task_notes/task_notes.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';

export const findAll = (params?: QueryAttr) => {
  const myQuery = buildQuery('task_notes', params);
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = { 
    text: 'SELECT * FROM task_notes WHERE id = $1', 
    values: [id] 
  }
  return pool.query(myQuery);
};

export const create = (r: any) => {
  const myQuery = {
    text: `
      INSERT INTO task_notes
      VALUES (DEFAULT, $1, $2, $3)
      RETURNING *
      `,
    values: [r.task_id, r.notes, r.date_created]
  }
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM task_notes WHERE id = $1',
    values: [id]
  }
  return pool.query(myQuery);
};

export const update = (r: any) => {
  const myQuery = {
    text: `
      UPDATE task_notes
      SET (task_id, notes, date_created) = ($1, $2, $3)
      WHERE id = $4
      RETURNING *
      `,
    values: [r.body.task_id, r.body.notes, r.body.date_created, r.params.id]
  }
  return pool.query(myQuery);
};
