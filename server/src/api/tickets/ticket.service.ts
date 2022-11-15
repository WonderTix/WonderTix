import Ticket from '../../interfaces/Ticket';
import {buildResponse, response} from '../db';

// remove $ and parse to float
// this should be done better
// check if $ in string, or maybe consider other forms of currency?
const parseMoneyString = (s: string) => Number.parseFloat(s.replace('$', ''));

// converts an integer representation of a date to a JS date object
// 20220512 -> 2022-05-12 == May 12 2022
const parseIntToDate = (d : number) => {
  const year = d / 10000 | 0;
  d -= year *10000;
  const month = d / 100 | 0;
  const day = d - month*100;
  // month-1 because the month field is 0-indexed in JS
  return new Date(year, month-1, day);
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
    text:`
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