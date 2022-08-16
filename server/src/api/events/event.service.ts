import Delta from '../../interfaces/Delta';
import Showing from '../../interfaces/Showing';
import {pool, response, buildResponse} from '../db';

export const getActiveEvents = async (): Promise<response> => {
    const myQuery = {
    text: `
                        SELECT events.id,
                        seasonid,
                        eventname title,
                        events.eventdescription description,
                        events.active,
                        events.image_url,
                        count(event_instances.id) as numShows
                        FROM events 
                        JOIN event_instances 
                        ON events.id = event_instances.eventid 
                        GROUP BY events.id,
                        events.seasonid,
                        events.eventname,
                        events.eventdescription,
                        events.active,
                        events.image_url
                        HAVING active = true;
                        `,
    };

    return buildResponse(myQuery, 'GET');
}

export const getEventById = async (params: any): Promise<response> => {
  const myQuery = {
    text: 'select id, eventname from events where eventname = $1',
    values: [params.eventName],
  };
  return buildResponse(myQuery, 'GET');
}

export const updateEvent = async (params: any): Promise<response> => {

  const myQuery = {
      text: `UPDATE events
                  SET (seasonid, eventname, eventdescription, active, image_url)
                  = ($1, $2, $3, $4, $5)
                  WHERE id=$6
                  RETURNING *;`,
      values: [
        params.seasonid,
        params.eventname,
        params.eventdescription,
        params.active,
        params.image_url,
        params.id
      ]
    }
    return buildResponse(myQuery, 'UPDATE');
}

export const createShowing = async (params: any): Promise<response> => {
    const newInstances = await insertAllShowings(params.instances);
    // Link showtime to ticket type
    const linkingdata = newInstances.map((s) => ({
      id: s.id,
      tickettype: s.tickettype,
    }));
    let count = 1;
    const myQuery = {
      text: `INSERT INTO linkedtickets (event_instance_id, ticket_type) VALUES `,
      values: Array<any>(),
    }
    for (const sh of linkingdata) {
      if (myQuery.values.length !== 0) {
        myQuery.text += ', '
      }
      myQuery.text += `($${count}, $${count+1})`;
      count += 2;
      const {id, tickettype} = sh;
      myQuery.values = [...myQuery.values, id, tickettype];
      console.log(myQuery.text);
    }
    return buildResponse(myQuery, 'POST');
}

export const archivePlays = async (params: any): Promise<response> => {
    const id = params.id;
    const myQuery = {
      text: 'UPDATE events SET active=false WHERE id=$1;',
      values: [id],
    }
    const intermediate_response = await buildResponse(myQuery, 'UPDATE');

    myQuery.text =
      'UPDATE event_instances SET salestatus=false WHERE eventid=$1;';
    
    const second_response = await buildResponse(myQuery, 'UPDATE');
    second_response.data.concat(intermediate_response.data);

    return second_response;
}

export const createEvent = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
                  INSERT INTO events 
                    (seasonid, eventname, eventdescription, active, image_url)
                  VALUES (0, $1, $2, true, $3)
                  RETURNING *
                `,
    values: [params.eventname, params.eventdescription, params.imageUrl],
  }
  console.log(params);
  return buildResponse(myQuery, 'POST');
}

export const checkIn = async (params: any): Promise<response> => {
    const myQuery = {
      text: `UPDATE tickets SET checkedin=$1 WHERE ticketno=$2`,
      values: [params.isCheckedIn, params.ticketID],
    }
    return buildResponse(myQuery, 'UPDATE');
}

export const getActiveEventsAndInstances = async (): Promise<response> => {
  const myQuery = {
    text: `
                  SELECT 
                    ei.id,
                    ei.eventid,
                    events.eventname,
                    events.eventdescription,
                    events.image_url,
                    ei.eventdate, ei.starttime,
                    ei.totalseats,
                    ei.availableseats
                  FROM event_instances as ei 
                  JOIN events on ei.eventid = events.id 
                  WHERE events.active = true AND ei.salestatus = true
                `,
  }
  return buildResponse(myQuery, 'GET');
}

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
  updateShowings,
  deleteShowings,
  getShowingsById,
};
