import Delta from '../../interfaces/Delta';
import Showing from '../../interfaces/Showing';
import {pool} from '../db';

const insertAllShowings = async (showings: Showing[]): Promise<Showing[]> => {
  const query = `
                  INSERT INTO event_instances 
                  (
                    eventid, 
                    eventdate, 
                    starttime, 
                    totalseats, 
                    availableseats, 
                    salestatus
                  )
                  VALUES ($1, $2, $3, $4, $5, true) RETURNING *;
                `;

  const res = [];
  for (const showing of showings) {
    const tickettype = showing.tickettype;
    if (tickettype === undefined) {
      throw new Error('No ticket type provided');
    }
    const {rows} = await pool.query(query, [
      showing.eventid,
      showing.eventdate,
      showing.starttime,
      showing.totalseats,
      showing.availableseats,
    ]);
    res.push({...rows[0], tickettype});
  }
  return res;
};

// takes in an array of Showings to be updated in DB
const updateShowings = async (showings: Showing[]): Promise<number> => {
  const updateQuery = `
                        UPDATE event_instances
                        SET
                        eventdate = $2,
                        starttime = $3,
                        salestatus = $4,
                        totalseats = $5,
                        availableseats = $6,
                        purchaseuri = $7
                        WHERE id = $1
                        `;
  let rowsUpdated = 0;
  for (const showing of showings) {
    const queryResult = await pool.query(
        updateQuery,
        [
          showing.id,
          showing.eventdate,
          showing.starttime,
          showing.salestatus,
          showing.totalseats,
          showing.availableseats,
          showing.purchaseuri,
        ]);
    rowsUpdated += queryResult.rowCount;
  }
  return rowsUpdated;
};

// takes in array of ids and deletes showings with those ids and linkedtickets
const deleteShowings = async (ids: number[]): Promise<number> => {
  const deleteQuery = `
                        DELETE FROM event_instances
                        WHERE id = $1;
                        `;
  let rowsDeleted = 0;
  for (const id of ids) {
    pool.query(
        `DELETE FROM linkedtickets WHERE event_instance_id = $1;`,
        [id],
    );
    const queryResult = await pool.query(deleteQuery, [id]);
    rowsDeleted += queryResult.rowCount;
  }
  return rowsDeleted;
};

const isShowingChange = (d: Delta) => d.path.includes('showings');
const isEventChange = (d: Delta) => !isShowingChange(d) && d.kind === 'E';
const eventFields = ['eventname', 'eventdescription', 'image_url'];

const updateEvent = async (id: string, changes: Delta[]) => {
  const edits = changes.map((d) => [d.path[0], d.rhs]);
  const queryResults = [];
  for (const edit of edits) {
    if (!eventFields.includes(edit[0])) {
      throw new Error('Invalid field provided');
    }
    const query = `UPDATE events SET ${edit[0]} = $1 WHERE id = $2;`;
    const values = [edit[1], id];
    const res = await pool.query(query, values);
    queryResults.push(res.rows);
  }
  return queryResults;
};

const getShowingsById = async (id: string): Promise<Showing[]> => {
  const query = `SELECT * FROM event_instances WHERE eventid = $1;`;
  const queryResult = await pool.query(query, [id]);
  return queryResult.rows;
};

export default {
  insertAllShowings,
  isShowingChange,
  isEventChange,
  eventFields,
  updateEvent,
  updateShowings,
  deleteShowings,
  getShowingsById,
};
