import Ticket from '../../interfaces/Ticket';
import {buildResponse, response, parseIntToDate} from '../db';

// remove $ and parse to float
// this should be done better
// check if $ in string, or maybe consider other forms of currency?
const parseMoneyString = (s: string) => Number.parseFloat(s.replace('$', ''));


//
export const getAvailableTickets = async (): Promise<response> => {
  const myQuery = {
    text: `
    SELECT
      ei.eventinstanceid event_instance_id,
      ei.eventid_fk eventid,
      ei.eventdate,
      ei.eventtime starttime,
      ei.totalseats,
      ei.availableseats,
      tt.description AS admission_type,
      tt.price AS ticket_price,
      tt.concessions AS concession_price
    FROM
      eventinstances ei 
      JOIN tickettype tt 
        ON ei.defaulttickettype = tt.tickettypeid
    WHERE 
      ei.availableseats > 0
    AND 
      ei.salestatus = true
    ORDER BY
      ei.eventinstanceid;`,
  };
  return await buildResponse(myQuery, 'GET');
};

//
export const getValidTicketTypes = async (): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM tickettype WHERE deprecated = false;`,
  };
  return await buildResponse(myQuery, 'GET');
};

//
export const getAllTicketTypes = async (): Promise<response> => {
  const myQuery = {
    text: `SELECT * FROM tickettype;`,
  };
  return await buildResponse(myQuery, 'GET');
};

//
export const setDefaultTicketForEvent = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE  
            eventinstances
          SET 
            defaulttickettype = $1
          WHERE
            eventinstanceid = $2;`,
    values: [
      params.eventinstanceid,
      params.tickettypeid
    ],
  };
  return buildResponse(myQuery, 'POST')
};
 


export const toTicket = (row:any): Ticket => {
  const {eventdate, starttime, ...rest} = row;
  const [hour, min] = starttime.split(':');
  const date = parseIntToDate(eventdate);
  date.setHours(hour, min);
  return {
    ...rest,
    date: date.toJSON(),
    eventid: row.eventid.toString(),
    ticket_price: parseMoneyString(row.ticket_price),
    concession_price: parseMoneyString(row.concession_price),
  };
};

export const reduceToTicketState = (res: any, t: Ticket) => {
  const id = t.event_instance_id;
  const {byId, allIds} = res;
  return allIds.includes(id) ?
    res :
    {byId: {...byId, [id]: t}, allIds: [...allIds, id]};
};

// Function to create a new ticket type used by
export const createTicketType = async (params: any): Promise<response> => {
  const myQuery = {
    // Breaking change, fewer values required
    text: `
          INSERT INTO 
            tickettype (
                description,
                price,
                concessions)
          VALUES 
            ($1, $2, $3)
          RETURNING *;`,
    values: [
      params.name,
      params.price,
      params.concessions],
  };
  console.log(params);
  return buildResponse(myQuery, 'POST');
};

// Function for removing a ticket type
export const removeTicketType = async (id: string): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE 
            tickettype 
          SET
            deprecated = true
          WHERE 
            tickettypeid = $1;`,
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};


//
// **BROKEN** Will require refactor and DB update for
//  eventinstance: defaulttickettype
//
export const getTickets = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT 
            ev.id as event_id,
            ei.id as event_instance_id,
            eventname,
            eventdescription,
            eventdate,
            starttime,
            totalseats, 
            availableseats,
            price,
            concessions
          FROM events ev
          LEFT JOIN eventinstances ei 
            ON ev.id=ei.eventid
          JOIN linkedtickets lt 
            ON lt.event_instance_id=ei.id
          JOIN tickettype tt 
            ON lt.ticket_type=tt.id
          WHERE 
            ev.id=$1 AND isseason=false;`,
  };
  return await buildResponse(myQuery, 'GET');
};
