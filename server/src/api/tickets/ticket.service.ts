import Ticket from '../../interfaces/Ticket';
import {buildResponse, response} from '../db';

// remove $ and parse to float
// this should be done better
// check if $ in string, or maybe consider other forms of currency?
const parseMoneyString = (s: string) => Number.parseFloat(s.replace('$', ''));

const parseDate = (d : number) => {
  const year = d / 10000 | 0;
  d -= year *10000;
  const month = d / 100 | 0;
  const day = d - month*100;
  return new Date(year, month-1, day);
};

 

const toTicket = (row:any): Ticket => {
  const {eventdate, starttime, ...rest} = row;
  const [hour, min] = starttime.split(':');
  const date = parseDate(eventdate);
  date.setHours(hour, min);
  return {
    ...rest,
    date: date.toJSON(),
    eventid: row.eventid.toString(),
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

// Function to create a new ticket type used by
const createTicketType = async (params: any): Promise<response> => {
  const myQuery = {
    text:
    `
      INSERT INTO tickettype
        VALUES (DEFAULT, $1, $2, $3, $4, $5)
        RETURNING *
    `,
    values: [params.name, params.isseason, params.seasonid,
      params.price, params.concessions],
  };
  console.log(params);
  return buildResponse(myQuery, 'POST');
};

// Function for removing a ticket type
const removeTicketType = async (id: string): Promise<response> => {
  const myQuery = {
    text: 'DELETE From tickettype WHERE id = $1',
    values: [id],
  };
  return await buildResponse(myQuery, 'DELETE');
};


export {toTicket, reduceToTicketState, createTicketType, removeTicketType};

