// api/tasks/tasks.service.ts

import {response, buildResponse} from '../db';

export const getAllTasks = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT * 
          FROM task
          ORDER BY taskid;`,
  };
  return await buildResponse(myQuery, 'GET');
};

export const findTask = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'SELECT * FROM task WHERE taskid = $1;',
    values: [id],
  };
  return await buildResponse(myQuery, 'GET');
};

export const createTask = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
          INSERT INTO 
            task(
                parentid_fk,
                subject,
                description,
                status,
                assignto_fk,
                reportto_fk,
                datecreated,
                dateassigned,
                datedue,
                rel_contact,
                rel_donation,
                rel_order,
                rel_account)
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING *;`,
    values: [
      r.parentid,
      r.subject,
      r.description,
      r.status,
      r.assignto,
      r.reportto,
      r.datecreated,
      r.dateassigned,
      r.duedate,
      r.rel_contact,
      r.rel_donation,
      r.rel_order,
      r.rel_account],
  };
  return await buildResponse(myQuery, 'POST');
};

export const removeTask = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE FROM task WHERE taskid = $1;',
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};

export const updateTask = async (r: any): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE 
            task
          SET (
            parentid_fk,
            subject,
            description,
            status,
            assignto_fk,
            reportto_fk,
            datecreated,
            dateassigned,
            datedue,
            rel_contact,
            rel_donation,
            rel_order,
            rel_account) = 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          WHERE 
            taskid = $14
          RETURNING *;`,
    values: [
      r.body.parentid,
      r.body.subject,
      r.body.description,
      r.body.status,
      r.body.assignto,
      r.body.reportto,
      r.body.datecreated,
      r.body.dateassigned,
      r.body.duedate,
      r.body.rel_contact,
      r.body.rel_donation,
      r.body.rel_ticket_order,
      r.body.rel_account,
      r.params.id],
  };
  return await buildResponse(myQuery, 'UPDATE');
};
