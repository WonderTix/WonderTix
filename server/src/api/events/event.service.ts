import Delta from '../../interfaces/Delta';
import Showing from '../../interfaces/Showing';
import {pool} from '../db';

const insertAllShowings = async (showings: Showing[]) => {
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
                  VALUES ($1, $2, $3, $4, $4, true) RETURNING *;
                `;

  const res = [];
  for (const showing of showings) {
    const {eventid, eventdate, starttime, totalseats, tickettype} = showing;
    console.log("Showing:", showing);
    if (tickettype === undefined) {
      throw new Error('No ticket type provided');
    }
    const {rows} = await pool.query(query, [
      eventid,
      eventdate,
      starttime,
      totalseats,
    ]);
    res.push({...rows[0], tickettype});
  }
  return res;
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

const propToString = (prop: any) => (obj: any) => ({
  ...obj,
  [prop]: obj[prop].toString(),
});

export default {
  insertAllShowings,
  isShowingChange,
  isEventChange,
  eventFields,
  updateEvent,
  propToString,
};
