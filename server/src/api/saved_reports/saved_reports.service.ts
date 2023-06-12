// api/saved_reports/saved_reports.service.ts

import {pool} from '../db';
import {Report} from './report';

export const findAll = () => {
  const myQuery = {
    text: `SELECT * FROM savedreports;`,
  };
  return pool.query(myQuery);
};

export const find = (id: string) => {
  const myQuery = {
    text: 'SELECT * FROM savedreports WHERE $1',
    values: [id],
  };
  return pool.query(myQuery);
};

export const create = (newReport: Report) => {
  const myQuery = {
    text: `
      INSERT INTO savedreports
      VALUES (DEFAULT, $1, $2)
      RETURNING *
    `,
    values: [newReport.table_name, newReport.query_attr],
  };
  return pool.query(myQuery);
};

export const remove = (id: string) => {
  const myQuery = {
    text: 'DELETE FROM savedreports WHERE id = $1',
    values: [id],
  };
  return pool.query(myQuery);
};
