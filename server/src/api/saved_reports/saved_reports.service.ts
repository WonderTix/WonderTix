// api/saved_reports/saved_reports.service.ts

import {pool} from '../db';
import {Report} from './report';

export const findAll = () => {
  const myQuery = {
    text: `SELECT * FROM saved_reports;`,
  };
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = {
    text: 'SELECT * FROM saved_reports WHERE $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const create = (newReport: Report) => {
  const myQuery = {
    text: `
      INSERT INTO saved_reports
      VALUES (DEFAULT, $1, $2)
      RETURNING *
    `,
    values: [newReport.table_name, newReport.query_attr],
  };
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM saved_reports WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};
