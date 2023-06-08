/* eslint-disable max-len */
import { query } from "express";
import { link } from "fs";
import Delta from "../../interfaces/Delta";
import Showing from "../../interfaces/Showing";
import { pool, response, buildResponse } from "../db";

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
            e.image_url,
            count(ei.id) as numShows
          FROM
            events e
            JOIN eventinstances ei
              ON e.eventid = ei.eventid WHERE ei.salestatus = true
          GROUP BY
            e.eventid,
            e.seasonid_fk,
            e.eventname,
            e.eventdescription,
            e.active,
            e.seasonticketeligible,
            e.image_url
          HAVING
            e.active = true 
          ORDER BY
            e.eventid;`,
  };

  return buildResponse(myQuery, "GET");
};

export const getInstanceById = async (params: any): Promise<response> => {
  const query = {
    // Query will break frontend when defaultickttype is added to event instance
    text: `
          SELECT *
          FROM
            eventinstances
          WHERE
            eventid = $1
          AND
            salestatus = true
          ORDER BY
            id;`,
    values: [params.id],
  };
  return await buildResponse(query, "GET");
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
            image_url
          FROM
            events
          WHERE
            eventid = $1;`,
    values: [params.id],
  };
  return await buildResponse(query, "GET");
};

export const updateInstances = async (
  body: any,
  params: any
): Promise<response> => {
  const instances: Showing[] = body;
  
  if(params.id === undefined) {
    console.log("param id undefined in updateInstances");
  }

  // get existing showings for this event
  const currentShowings = await getShowingsById(params.id);

  console.log("retrieved " + currentShowings.length + " showings");
  // see which showings are not present in the updated showings
  const instancesSet = new Set(instances.map((show) => show.id));
  const rowsToDelete = currentShowings
    .filter((show: Showing) => !instancesSet.has(show.id))
    .map((show) => show.id);
  
  // delete them
  const rowsDeleted = await deleteShowings(rowsToDelete);
  console.log("to delete: " + rowsToDelete);

  // update existing showings
  const rowsToUpdate = instances.filter(
    (show: Showing) => show.id && show.id !== 0
  );
  
  const rowsUpdated = await updateShowings(rowsToUpdate);
  console.log("updated " + rowsToUpdate.length + " showings");
  // insert new showings
  // showings with id = 0 have not yet been added to the table
  const rowsToInsert = instances.filter((show: Showing) => show.id === 0);
  // rowsToInsert.forEach((show: Showing) => show.tickettype = 0);
  rowsToInsert.forEach((show: Showing) => {
    if (typeof show.tickettypes[0] !== "undefined") {
      show.tickettypes[0] = 0;
    }
  });
  // @TODO set default ticket type

  console.log("Rows to insert", rowsToInsert);
  const rowsInsertedResult = await insertAllShowings(rowsToInsert);
  const rowsInserted = rowsInsertedResult.data;
  if(rowsInsertedResult.status.success == false) {
    return rowsInsertedResult;
  }

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
        `${rowsUpdated} rows updated, ` +
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
    values: [params.eventname],
  };
  return buildResponse(myQuery, "GET");
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
            image_url)
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
      params.image_url,
      params.eventid,
    ],
  };
  return buildResponse(myQuery, "UPDATE");
};

//
// Breaking/broken
// linkedtickets is depracated, will require refactor
//
export const createShowing = async (params: any): Promise<response> => {
  const result: response = await insertAllShowings(params.instances);
  if(result.status.success == false) {
    return result;
  }
  const newInstances = result.data;
  // Link showtime to ticket type
  const linkingdata = newInstances.map((s) => ({
    id: <number>Object.values(s)[0],
    tickettypes: <number[]>Object.values(s)[10], // Keeps changing?
    seatsfortype: <number[]>Object.values(s)[11], // Keeps changing?
  }));
  const myQuery = {
    text: `INSERT INTO ticketrestrictions (eventinstanceid_fk, tickettypeid_fk,
      ticketlimit) VALUES ($1, $2, $3) `,
    values: <number[]>[],
  };
  // no longer needed because of createEmptyTickets call in insertAllShowing
  //await createTickets(linkingdata);
  return result;
};
/**
 * @Param {count} the number of tickets to create
 * @Param {id} the eventid foreign key to be used
 * @Returns a response with message, success or failure, and the id inserted
 */
const createEmptyTickets = async (count: number, id: number): Promise<response> => {
  let res: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: ""
    },
  };
  let toReturn = [];
  let query = `
    INSERT INTO eventtickets (id) values ($1) RETURNING *;
  `;
  for(let i = 0; i < count; i++) {
    try {
      let queryResults = await pool.query(query, [id]);
      toReturn.push(queryResults);
    }catch(error: any) {
      res.status.message = error.message;
      res.status.success = false;
      return res;
    }
  }
  res.status.success = true;
  res.data = toReturn;
  return res;
}

export const createTickets = async (params: {id: number, tickettypes: number[], seatsfortype: number[]}[]): Promise<response> => {
  const data = params;
  const numberOfShowings = data.length;
  const myQuery = {
    text: `INSERT INTO
            eventtickets
            (eventinstanceid_fk)
          VALUES ($1)
          RETURNING *;`,
    values: <number[]>[],
  };
  let res: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: "",
    },
  };
  const toReturn = [];
  let rowCount = 0;
  for (let k = 0; k < numberOfShowings; k += 1) {
    if (data[k].tickettypes != undefined) {
      const numOfTypes = data[k].tickettypes.length;
      for (let i = 0; i < numOfTypes; i += 1) {
        const numOfSeats = data[k].seatsfortype[i];
        for (let j = 0; j < numOfSeats; j += 1) {
          let queryResults;
          try {
            queryResults = await pool.query(myQuery, [
              data[k].id,
              data[k].tickettypes[i],
            ]);
            toReturn.push(queryResults);
            rowCount += queryResults.rowCount;
          } catch (error: any) {
            res.status.message = error.message;
          }
        }
      }
    }
  }
  res = {
    data: toReturn,
    status: {
      success: true,
      message: `${rowCount} ${rowCount === 1 ? "row" : "rows"} inserted.`,
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
  const intermediateResponse = await buildResponse(myQuery, "UPDATE");

  myQuery.text = `
                  UPDATE
                    eventinstances
                  SET
                    salestatus = false
                  WHERE
                    id = $1;`;

  const secondResponse = await buildResponse(myQuery, "UPDATE");
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
                imageurl
                )
          VALUES
            ($1, $2, $3, true, $4, $5)
          RETURNING *;`,
    values: [
      params.seasonid_fk,
      params.eventname,
      params.eventdescription,
      params.seasonticketeligible,
      params.image_url
    ],
  };
  return buildResponse(myQuery, "POST");
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
  return buildResponse(myQuery, "UPDATE");
};

export const getActiveEventsAndInstances = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT
            ei.id,
            e.eventid,
            e.eventname,
            e.eventdescription,
            e.image_url,
            ei.eventdate,
            ei.starttime,
            ei.totalseats,
            ei.availableseats
          FROM
            eventinstances ei
            JOIN events e
              ON e.eventid = ei.eventid
          WHERE
            e.active = true
          AND
            ei.salestatus = true
          ORDER BY
            ei.id;`,
  };
  return buildResponse(myQuery, "GET");
};

export const insertAllShowings = async (
  showings: Showing[]
): Promise<response> => {
  // Breaking change: added ispreview
  // Will need to add defaulttickettype for event instances when field add/db updated
  const query = `
                INSERT INTO
                  eventinstances (
                      eventid,
                      eventdate,
                      starttime,
                      totalseats,
                      availableseats,
                      salestatus,
                      ispreview)
                VALUES
                  ($1, $2, $3, $4, $5, true, $6)
                RETURNING *;`;

      const restrictions_query = `
          INSERT INTO ticketrestrictions (
            eventinstanceid_fk,
            tickettypeid_fk,
            ticketlimit,
            ticketssold
          ) VALUES ($1, $2, $3, 0);
      `;

  let res: response = {
    data: [],
    status: {
      success: false,
      message: "",
    },
  };
  const toReturn = [];
  let rowCount = 0;
  // Using 2020-01-01 as a default value or it will not save
  let dateAct = '20200101'
  let startTime = '00:00'
  for (const showing of showings) {

    if (showing.eventdate !== '') {
      const date = showing.eventdate.split('-');
      dateAct = date.join('');
    }
    else {
      dateAct = '20200101'
    }
    if (showing.starttime !== '') {
      startTime = showing.starttime
    }
    else {
      startTime = '00:00'
    }
    const {rows} = await pool.query(query, [
      showing.eventid,
      dateAct,
      startTime,
      showing.totalseats,
      showing.totalseats,
      showing.ispreview,
    ]);
    
    // the only new data is the id generated by auto increment
    showing.id = rows[0].id;

    res = await createRestrictions(restrictions_query, showing);
    if(res.status.success != true) {
      return res;
    }

    res = await createEmptyTickets(showing.totalseats, rows[0].id);
    if(res.status.success != true) {
      return res;
    }

    rowCount += 1; 
    res.data.push(showing);
  }
  return res;
};

export const createRestrictions = async (restriction_query: string, showing: Showing): Promise<response> => {
  
  let res: response = {
    data: <any[]>[],
    status: {
      success: false,
      message: "",
    },
  };
  
  let toReturn = [];
  let rowCount: number = 0;

  let seat_count = showing.totalseats;
  let typed_count = 0;
    
    if (showing.tickettypes != undefined && showing.seatsfortype != undefined) {
      const len = showing.tickettypes.length;
      for (let i = 0; i < len; i += 1) {
        let queryResults;
        try {
          queryResults = await pool.query(restriction_query, [
            showing.id,
            showing.tickettypes[i],
            showing.seatsfortype[i],
          ]);
          toReturn.push(queryResults);
          rowCount += queryResults.rowCount;
        } catch (error: any) {
          res.status.message = error.message;
          res.status.success = false;
          return res;
        }
      }
    }
    if(typed_count > seat_count) {
      res.status.message = "total restriction limit is greater than available seats";
      res.status.success = false;
      return res;
    }
    
    res.status.success = true;
    res.data = toReturn;
    return res;
}

// takes in an array of Showings to be updated in DB
export const updateShowings = async (showings: Showing[]): Promise<number> => {
  // Will break: need to add defaulttickettype for event instances when field add/db updated
  const updateQuery = `
                      UPDATE
                        eventinstances
                      SET
                        eventdate = $2,
                        starttime = $3,
                        salestatus = $4,
                        totalseats = $5,
                        availableseats = $6,
                        purchaseuri = $7,
                        ispreview = $8,
                        eventid = $9

                      WHERE
                        id = $1;`;
  const update_restrictions = `
    UPDATE
      ticketrestrictions
    SET
      tickettypeid_fk = $2,
      ticketlimit = $3
    where
      eventinstanceid_fk = $1
  `;
  let rowsUpdated = 0;
  for (const showing of showings) {
    //console.log("Update Current: ", showings);
    const queryResult = await pool.query(updateQuery, [
      showing.id,
      showing.eventdate,
      showing.starttime,
      showing.salestatus,
      showing.totalseats,
      showing.availableseats,
      showing.purchaseuri,
      showing.ispreview,
      showing.eventid,
    ]);
    let res = await createRestrictions(update_restrictions, showing);
    if(res.status.success == false){
      return 0;
    }
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
                        id = $1;`;
  let rowsDeleted = 0;
  for (const id of ids) {
    const queryResult = await pool.query(deleteQuery, [id]);
    console.log("Deleted");
    rowsDeleted += queryResult.rowCount;
  }
  return rowsDeleted;
};

const isShowingChange = (d: Delta) => d.path.includes("showings");
const isEventChange = (d: Delta) => !isShowingChange(d) && d.kind === "E";
const eventFields = ["eventname", "eventdescription", "image_url"];

export const getShowingsById = async (id: string): Promise<Showing[]> => {
  // Breaking change: ispreview is new field, defaulttickettype will be added soon
  const query = `
                SELECT id AS id,
                    eventid,
                    eventdate,
                    starttime,
                    salestatus,
                    totalseats,
                    availableseats,
                    defaulttickettype AS tickettypes,
                    purchaseuri,
                    ispreview
                FROM
                  eventinstances
                WHERE
                  eventid = $1 AND salestatus = true
                ORDER BY
                  id;`;
  const queryResult = await pool.query(query, [id]);
  return queryResult.rows;
};
