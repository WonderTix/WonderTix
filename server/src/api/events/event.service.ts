import {query} from 'express';
import {link} from 'fs';
import Delta from '../../interfaces/Delta';
import Showing from '../../interfaces/Showing';
import {pool, response, buildResponse} from '../db';

export const getActiveEvents = async (): Promise<response> => {
  const myQuery = {
    // Breaking change: added seasonticketeligible field
    text: `
          SELECT 
            e.eventid id, 
            e.seasonid_fk seasonid, 
            e.eventname title, 
            e.eventdescription description, 
            e.active, 
            e.seasonticketeligible,
            e.imageurl image_url, 
            count(ei.eventinstanceid) as numShows
          FROM 
            events e 
            JOIN eventinstances ei 
              ON e.eventid = ei.eventid_fk
          GROUP BY 
            e.eventid,
            e.seasonid_fk,
            e.eventname,
            e.eventdescription,
            e.active,
            e.seasonticketeligible,
            e.imageurl
          HAVING 
            e.active = true 
          ORDER BY 
            e.eventid;`,
  };

  return buildResponse(myQuery, 'GET');
};

export const getInstanceById = async (params: any): Promise<response> => {
  const query = {
    // Query will break frontend when defaultickttype is added to event instance
    text: `
          SELECT *
          FROM 
            eventinstances
          WHERE 
            eventid_fk = $1 
          AND 
            salestatus = true
          ORDER BY 
            eventinstanceid;`,
    values: [params.id],
  };
  return await buildResponse(query, 'GET');
};

export const getEventById = async (params: any): Promise<response> => {
  const query = {
    // Breaking change: added seasonticketeligible field
    text: `
          SELECT
            eventid,
            seasonid_fk,
            eventname title,
            eventdescription description,
            active,
            seasonticketeligible,
            imageurl
          FROM 
            events
          WHERE 
            eventid = $1;`,
    values: [params.id],
  };
  return await buildResponse(query, 'GET');
};

export const updateInstances = async (
    body: any,
    params: any,
): Promise<response> => {
  const instances: Showing[] = body;
  console.log('Instances', instances);

  // get existing showings for this event
  const currentShowings = await getShowingsById(params.id);

  // see which showings are not present in the updated showings
  const instancesSet = new Set(instances.map((show) => show.id));

  const rowsToDelete = currentShowings.filter(
      (show: Showing) => !instancesSet.has(show.id),
  ).map((show) => show.id);

  // delete them
  const rowsDeleted = await deleteShowings(rowsToDelete);

  // update existing showings
  const rowsToUpdate = instances.filter((show: Showing) => show.id !== 0);

  const rowsUpdated = await updateShowings(rowsToUpdate);

  // insert new showings
  // showings with id = 0 have not yet been added to the table
  const rowsToInsert = instances.filter((show: Showing) => show.id === 0);
  // rowsToInsert.forEach((show: Showing) => show.tickettype = 0);
  rowsToInsert.forEach((show: Showing) => show.ticketTypeId[0] = 0);

  console.log('Rows to insert', rowsToInsert);
  const rowsInserted = (await insertAllShowings(rowsToInsert));

  return {
    data: [
      {
        numRowsUpdated: rowsUpdated,
        numRowsDeleted: rowsDeleted,
        numRowsInserted: rowsInserted.length,
      },
    ],
    status: {
      success: true,
      message: `${rowsUpdated} rows updated, `+
        `${rowsDeleted} rows deleted, ${rowsInserted.length} rows inserted`,
    },
  };
};

export const getEventByName = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          SELECT 
            eventid, 
            eventname 
          FROM 
            events 
          WHERE 
            eventname = $1;`,
    values: [params.eventName],
  };
  return buildResponse(myQuery, 'GET');
};

export const updateEvent = async (params: any): Promise<response> => {
  const myQuery = {
    // Breaking change: added seasonticketeligible field
    text: `
          UPDATE 
            events
          SET (
            seasonid_fk, 
            eventname, 
            eventdescription, 
            active, 
            seasonticketeligible, 
            imageurl)
            = ($1, $2, $3, $4, $5, $6)
          WHERE 
            eventid = $7
          RETURNING *;`,
    values: [
      params.seasonid,
      params.eventname,
      params.eventdescription,
      params.active,
      params.seasonticketeligible,
      params.image_url,
      params.id,
    ],
  };
  return buildResponse(myQuery, 'UPDATE');
};


//
// Breaking/broken
// linkedtickets is depracated, will require refactor
//
export const createShowing = async (params: any): Promise<response> => {
  const newInstances = await insertAllShowings(params.instances);
  // Link showtime to ticket type
  const linkingdata = newInstances.map((s) => ({
    id: <number>Object.values(s)[0],
    tickettypes: <number[]>Object.values(s)[9],
    seatsfortype: <number[]>Object.values(s)[10],
  }));
  const myQuery = {
    text: `INSERT INTO ticketrestrictions (eventinstanceid_fk, tickettypeid_fk,
      ticketlimit) VALUES ($1, $2, $3) `,
    values: <number[]>([]),
  };
  let res: response = {
    data: <any[]>([]),
    status: {
      success: false,
      message: '',
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (const show of linkingdata) {
    const len = show.tickettypes.length;
    for (let i = 0; i < len; i += 1) {
      let queryResults;
      try {
        queryResults = await pool.query(myQuery, [
          show.id,
          show.tickettypes[i],
          show.seatsfortype[i],
        ]);
        toReturn.push(queryResults);
        rowCount += queryResults.rowCount;
      } catch (error: any) {
        res.status.message = error.message;
      }
    }
  }
  res = {
    data: toReturn,
    status: {
      success: true,
      message: `${rowCount} ${rowCount === 1 ?
        'row' :
        'rows'
      } inserted.`,
    },
  };
  console.log(res);
  return res;
};

export const archivePlays = async (params: any): Promise<response> => {
  const id = params.id;
  const myQuery = {
    text: `
          UPDATE 
            events 
          SET 
            active = false 
          WHERE 
            eventid = $1;`,
    values: [id],
  };
  const intermediateResponse = await buildResponse(myQuery, 'UPDATE');

  myQuery.text = `
                  UPDATE 
                    eventinstances 
                  SET 
                    salestatus = false 
                  WHERE 
                    eventinstanceid = $1;`;

  const secondResponse = await buildResponse(myQuery, 'UPDATE');
  secondResponse.data.concat(intermediateResponse.data);

  return secondResponse;
};

export const createEvent = async (params: any): Promise<response> => {
  const myQuery = {
    // Breaking change: added seasonticketeligible field
    text: `
          INSERT INTO 
            events (
                seasonid_fk,  
                eventname, 
                eventdescription, 
                active,
                seasonticketeligible, 
                imageurl)
          VALUES 
            ($1, $2, $3, true, $4, $5)
          RETURNING *;`,
    values: [
      params.seasonId,
      params.eventName,
      params.eventDesc,
      params.seasonticketeligible,
      params.imageUrl],
  };
  return buildResponse(myQuery, 'POST');
};


export const checkIn = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE 
            eventtickets 
          SET 
            redeemed = $1 
          WHERE 
            eventticketid = $2;`,
    values: [params.isCheckedIn, params.ticketID],
  };
  return buildResponse(myQuery, 'UPDATE');
};

export const getActiveEventsAndInstances = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT 
            ei.eventinstanceid,
            e.eventid,
            e.eventname,
            e.eventdescription,
            e.imageurl,
            ei.eventdate, 
            ei.eventtime,
            ei.totalseats,
            ei.availableseats
          FROM 
            eventinstances ei 
            JOIN events e 
              ON e.eventid = ei.eventid_fk
          WHERE 
            e.active = true 
          AND 
            ei.salestatus = true
          ORDER BY 
            ei.eventinstanceid;`,
  };
  return buildResponse(myQuery, 'GET');
};

export const insertAllShowings = async (showings: Showing[]): Promise<Showing[]> => {
  // Breaking change: added ispreview
  // Will need to add defaulttickettype for event instances when field add/db updated
  const query = `
                INSERT INTO 
                  eventinstances (
                      eventid_fk, 
                      eventdate, 
                      eventtime, 
                      totalseats, 
                      availableseats, 
                      salestatus,
                      ispreview)
                VALUES 
                  ($1, $2, $3, $4, $5, true, $6) 
                RETURNING *;`;
  const res = [];
  let results: response = {
    data: <any[]>([]),
    status: {
      success: false,
      message: '',
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (const showing of showings) {
    if (showing.ticketTypeId.length === 0) {
      throw new Error('No ticket type provided');
    }
    const date = showing.eventdate.split('-');
    const dateAct = date.join('');
    console.log(dateAct);
    const {rows} = await pool.query(query, [
      showing.eventid,
      dateAct,
      showing.starttime,
      showing.totalseats,
      showing.availableseats,
      showing.ispreview,
    ]);
    console.log(rows);
    toReturn.push(showing);
    rowCount += 1;
    res.push({...rows[0], ticketTypeId: showing.ticketTypeId,
      seatsForType: showing.seatsForType});
  }
  results = {
    data: toReturn,
    status: {
      success: true,
      message: `${rowCount} ${rowCount === 1 ?
        'row' :
        'rows'
      } inserted.`,
    },
  };
  console.log(results);
  return res;
};

// takes in an array of Showings to be updated in DB
export const updateShowings = async (showings: Showing[]): Promise<number> => {
  // Will break: need to add defaulttickettype for event instances when field add/db updated
  const updateQuery = `
                      UPDATE 
                        eventinstances
                      SET
                        eventdate = $2,
                        eventtime = $3,
                        salestatus = $4,
                        totalseats = $5,
                        availableseats = $6,
                        purchaseuri = $7
                        ispreview = $8
                      WHERE 
                        eventinstanceid = $1;`;
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
          showing.ispreview,
        ]);
    rowsUpdated += queryResult.rowCount;
  }
  return rowsUpdated;
};

// takes in array of ids and deletes showings with those ids and linkedtickets
export const deleteShowings = async (ids: number[]): Promise<number> => {
  const deleteQuery = `
                      UPDATE 
                        eventinstances 
                      SET 
                        salestatus = false 
                      WHERE 
                        eventinstanceid = $1;`;
  let rowsDeleted = 0;
  for (const id of ids) {
    const queryResult = await pool.query(deleteQuery, [id]);
    rowsDeleted += queryResult.rowCount;
  }
  return rowsDeleted;
};

const isShowingChange = (d: Delta) => d.path.includes('showings');
const isEventChange = (d: Delta) => !isShowingChange(d) && d.kind === 'E';
const eventFields = ['eventname', 'eventdescription', 'imageurl'];

export const getShowingsById = async (id: string): Promise<Showing[]> => {
  // Breaking change: ispreview is new field, defaulttickettype will be added soon
  const query = `
                SELECT * 
                FROM 
                  eventinstances 
                WHERE 
                  eventid_fk = $1 AND salestatus = true 
                ORDER BY 
                  eventinstanceid;`;
  const queryResult = await pool.query(query, [id]);
  return queryResult.rows;
};
