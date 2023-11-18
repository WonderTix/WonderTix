import Ticket from '../../interfaces/Ticket';
import {buildResponse, response, parseIntToDate} from '../db';
import TicketsState from '../../interfaces/TicketsState';
import {pool} from '../db';

// remove $ and parse to float
// this should be done better
// check if $ in string, or maybe consider other forms of currency?
export const parseMoneyString = (s: string) => Number.parseFloat(s.replace('$', ''));


//
export const getAvailableTickets = async (): Promise<response> => {
  let resp: response = {
    data: <any[]>([]),
    status: {
      success: false,
      message: '',
    },
  };

  try {
    const myQuery = `
        SELECT
          ei.eventinstanceid event_instance_id,
          ei.eventid_fk,
          ei.eventdate,
          ei.eventtime,
          ei.totalseats,
          ei.availableseats,
          tt.description AS admission_type,
          tt.price AS ticket_price,
          tt.concessions AS concession_price
        FROM
          eventtickets et
          JOIN eventinstances ei 
            ON et.eventinstanceid_fk = ei.eventinstanceid
          JOIN tickettype tt 
            ON et.tickettypeid_fk = tt.tickettypeid
        WHERE 
          ei.availableseats > 0
        AND 
          ei.salestatus = true
        AND
         ei.deletedat is null;`;
    const queryRes = await pool.query(myQuery);

    resp = {
      data: queryRes.rows
          .map(toTicket)
          .reduce(reduceToTicketState, {
            byId: {},
            allIds: [],
          } as TicketsState),
      status: {
        success: true,
        message: `${queryRes.rowCount} ${queryRes.rowCount === 1 ?
          'row' :
          'rows'
        } ${'returned'}.`,
      },
    };
  } catch (error: any) {
    resp.status.message = error.message;
  }
  return await resp;
};


const toTicket = (row:any): Ticket => {
  const {eventdate, eventtime, ...rest} = row;
  const [hour, min] = eventtime.split(':');
  const date = parseIntToDate(eventdate);
  date.setHours(hour, min);
  return {
    ...rest,
    date: date.toJSON(),
    eventid: row.eventid_fk.toString(),
    ticket_price: parseMoneyString(row.ticket_price),
    concession_price: parseMoneyString(row.concession_price),
  };
};

const reduceToTicketState = (res: any, t: Ticket) => {
  const id = t.event_instance_id;
  const {byId, allIds} = res;
  return allIds.includes(id) ?
    res :
    {byId: {...byId, [id]: t}, allIds: [...allIds, id]};
};


//
export const getValidTicketTypes = async (): Promise<response> => {
  // The tickettype indexed by a tickettypeid value of 0 is reserved for
  // the Pay What You Can tickettype and should not be modified
  const myQuery = {
    text: `
      SELECT 
        tickettypeid id,
        description,
        price,
        concessions
      FROM 
        tickettype 
      WHERE 
        deprecated = false AND tickettypeid != 0
      ORDER BY
        tickettypeid ASC;`,
  };
  return await buildResponse(myQuery, 'GET');
};


//
export const getAllTicketTypes = async (): Promise<response> => {
  const myQuery = {
    text: `
    SELECT 
      tickettypeid id,
      description,
      price,
      concessions
    FROM 
      tickettype 
    WHERE 
      deprecated = false
    ORDER BY
      tickettypeid ASC;`,
  };
  return await buildResponse(myQuery, 'GET');
};

//
export const getDepracatedTicketTypes = async (): Promise<response> => {
  const myQuery = {
    text: `
          SELECT * 
          FROM 
            tickettype
          ORDER BY
            tickettypeid ASC;`,
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
            id = $2;`,
    values: [
      params.id,
      params.tickettypeid,
    ],
  };
  return buildResponse(myQuery, 'POST');
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


// Function for updating a ticket type
export const updateTicketType = async (params: any): Promise<response> => {
  const myQuery = {
    text: `
          UPDATE 
            tickettype 
          SET
            description = $2,
            price = $3,
            concessions = $4
          WHERE 
            tickettypeid = $1;`,
    values: [
      params.id,
      params.description,
      params.price,
      params.concessions],
  };
  return await buildResponse(myQuery, 'UPDATE');
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

