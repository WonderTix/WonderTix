// api/saved_reports/saved_reports.service.ts

import { pool } from '../db';
import { buildQuery, QueryAttr } from '../util/query-builder';
import { Report } from './report';

export const findAll = (params?: QueryAttr) => {
  return pool.query(buildQuery('saved_reports', params));
};

export const find = (id: string) => {
  return pool.query(`SELECT * FROM saved_reports WHERE id = ${id}`);
};

export const create = (newReport: Report) => {
  const myQuery = `
    INSERT INTO saved_reports
    VALUES (DEFAULT, \'${newReport.table_name}\', \'${newReport.query}\')
    RETURNING *;
  `;
  return pool.query(myQuery);
};
