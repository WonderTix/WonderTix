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
            e.imageurl,
            count(ei.eventinstanceid) as numShows
          FROM
            events e
            JOIN eventinstances ei
              ON e.eventid = ei.eventid_fk 
          WHERE 
              ei.salestatus = true
          AND
              ei.deletedat is null
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
          AND
            deletedat is null
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
            eventid = $1
          AND
            deletedat is null;`,
    values: [params.id],
  };
  return await buildResponse(query, 'GET');
};

export const updateInstances = async (
    body: any,
    params: any,
): Promise<response> => {
  const instances: Showing[] = body;

  if (params.id === undefined) {
    console.log('param id undefined in updateInstances');
  }

  // get existing showings for this event
  const currentShowings = await getShowingsById(params.id);
  console.log(currentShowings);

  console.log('retrieved ' + currentShowings.length + ' showings');
  // see which showings are not present in the updated showings
  console.log('-------------------------------------------------=============================');
  console.log(instances);
  console.log('-------------------------------------------------=============================');
  const instancesSet = new Set(instances.map((show) => show.eventinstanceid));
  const rowsToDelete = currentShowings
      .filter((show: Showing) => !instancesSet.has(show.id))
      .map((show) => show.id);

  // delete them
  const rowsDeleted = await deleteShowings(rowsToDelete);
  // console.log("to delete: " + rowsToDelete);

  // update existing showings
  const rowsToUpdate = instances.filter(
      (show: Showing) => show.eventinstanceid && show.eventinstanceid !== 0,
  );
  console.log(rowsToUpdate);
  const rowsUpdated = await updateShowings(rowsToUpdate);
  console.log('updated ' + rowsToUpdate.length + ' showings');
  // insert new showings
  // showings with id = 0 have not yet been added to the table
  const rowsToInsert = instances.filter((show: Showing) => show.eventinstanceid === 0);
  // rowsToInsert.forEach((show: Showing) => show.tickettype = 0);
  rowsToInsert.forEach((show: Showing) => {
    if (typeof show.ticketTypeId[0] !== 'undefined') {
      show.ticketTypeId[0] = 0;
    }
  });
  // @TODO set default ticket type

  console.log('Rows to insert', rowsToInsert);
  const rowsInserted = await insertAllShowings(rowsToInsert);

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
      message:
        `${rowsUpdated} rows updated, +
        ${rowsDeleted} rows deleted, ${rowsInserted.length} rows inserted`,
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
            eventname = $1
          AND
            deletedat is null;`,
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
      7,
      params.eventname,
      params.eventdescription,
      params.active,
      params.seasonticketeligible,
      params.imageurl,
      params.eventid,
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
  console.log(newInstances);
  // Link showtime to ticket type
  const linkingdata = newInstances.map((s) => ({
    eventinstanceid: s.eventinstanceid,
    ticketTypeId: s.ticketTypeId,
    seatsfortype: s.seatsForType,
  }));
  const myQuery = {
    text: `INSERT INTO ticketrestrictions (eventinstanceid_fk, tickettypeid_fk,
      ticketlimit) VALUES ($1, $2, $3) `,
    values: <number[]>[],
  };
  let res: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: '',
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (const show of linkingdata) {
    const len = show.ticketTypeId.length;
    for (let i = 0; i < len; i++) {
      let queryResults;
      console.log(show);
      try {
        queryResults = await pool.query(myQuery, [
          show.eventinstanceid,
          show.ticketTypeId[i],
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
      message: `${rowCount} ${rowCount === 1 ? 'row' : 'rows'} inserted.`,
    },
  };
  await createTickets(linkingdata);
  return res;
};

export const createTickets = async (params: any): Promise<response> => {
  const data = params;
  const numberOfShowings = data.length;
  const myQuery = {
    text: `INSERT INTO
            eventtickets
            (eventinstanceid_fk, tickettypeid_fk)
          VALUES ($1, $2)
          RETURNING *;`,
    values: <number[]>[],
  };
  let res: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: '',
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (let k = 0; k < numberOfShowings; k += 1) {
    const numOfTypes = data[k].ticketTypeId.length;
    for (let i = 0; i < numOfTypes; i += 1) {
      const numOfSeats = data[k].seatsfortype[i];
      for (let j = 0; j < numOfSeats; j += 1) {
        let queryResults;
        try {
          queryResults = await pool.query(myQuery, [
            data[k].eventinstanceid,
            data[k].ticketTypeId[i],
          ]);
          toReturn.push(queryResults);
          rowCount += queryResults.rowCount;
        } catch (error: any) {
          res.status.message = error.message;
        }
      }
    }
  }
  res = {
    data: toReturn,
    status: {
      success: true,
      message: `${rowCount} ${rowCount === 1 ? 'row' : 'rows'} inserted.`,
    },
  };
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
      params.seasonid_fk,
      params.eventname,
      params.eventdescription,
      params.ticketElligible,
      params.imageurl,
    ],
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
            e.deletedat is null
          AND
            ei.deletedat is null
          AND
            ei.salestatus = true
          ORDER BY
            ei.eventinstanceid;`,
  };
  return buildResponse(myQuery, 'GET');
};

export const getEventsAndInstances = async (): Promise<response> => {
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
              ei.availableseats,
              e.active
          FROM
              eventinstances ei
          JOIN
              events e ON ei.eventid_fk = e.eventid
          WHERE
              ei.deletedat is null
          AND
              e.deletedat is null
          ORDER BY
              ei.eventinstanceid;`,
  };
  return buildResponse(myQuery, 'GET');
};

export const insertAllShowings = async (
    showings: Showing[],
): Promise<Showing[]> => {
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
  // this is temp fix 1 should be set to defaulttickettype, and updateShowings needs to have a way to remove tickets
  const ticketQuery = `
                    INSERT INTO eventtickets (
                      eventinstanceid_fk,
                      tickettypeid_fk,
                      redeemed,
                      donated
                    ) VALUES ($1, 1, false, false);
  `;
  const res = [];
  let results: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: '',
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (const showing of showings) {
    const date = showing.eventdate.split('-');
    const dateAct = date.join('');
    const {rows} = await pool.query(query, [
      showing.eventid_fk,
      dateAct,
      showing.eventtime,
      showing.totalseats,
      showing.totalseats,
      showing.ispreview,
    ]);
    // for each seat create the entry in the eventtickets table
    for (const seat of [...Array(showing.totalseats).keys()]) {
      await pool.query(ticketQuery, [rows[0].eventinstanceid]);
    }
    toReturn.push(showing);
    rowCount += 1;
    res.push({
      ...rows[0],
      ticketTypeId: showing.ticketTypeId,
      seatsForType: showing.seatsForType,
    });
  }
  results = {
    data: toReturn,
    status: {
      success: true,
      message: `${rowCount} ${rowCount === 1 ? 'row' : 'rows'} inserted.`,
    },
  };
  // console.log(results)
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
                        purchaseuri = $7,
                        ispreview = $8,
                        eventid_fk = $9

                      WHERE
                        eventinstanceid = $1;`;
  let rowsUpdated = 0;
  for (const showing of showings) {
    let eventDate: String|Number = showing.eventdate;
    if (typeof showing.eventdate === 'string') {
      eventDate = parseInt(showing.eventdate.split('-').join(''));
    }
    // console.log("Update Current: ", showings);
    const queryResult = await pool.query(updateQuery, [
      showing.eventinstanceid,
      eventDate,
      showing.eventtime,
      showing.salestatus,
      showing.totalseats,
      showing.availableseats,
      showing.purchaseuri,
      showing.ispreview,
      showing.eventid_fk,
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
    console.log('Deleted');
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
                SELECT eventinstanceid AS id,
                    eventid_fk,
                    eventdate,
                    eventtime,
                    salestatus,
                    totalseats,
                    availableseats,
                    defaulttickettype AS ticketTypeId,
                    purchaseuri,
                    ispreview
                FROM
                  eventinstances
                WHERE
                  eventid_fk = $1
                AND 
                    salestatus = true
                AND
                    deletedat is null
                ORDER BY
                  eventinstanceid;`;
  const queryResult = await pool.query(query, [id]);
  return queryResult.rows;
};
