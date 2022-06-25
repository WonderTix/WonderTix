import Ticket from '../../interfaces/Ticket';

// remove $ and parse to float
// this should be done better
// check if $ in string, or maybe consider other forms of currency?
const parseMoneyString = (s: string) => Number.parseFloat(s.replace('$', ''));

const toTicket = (row:any): Ticket => {
  const {eventdate, starttime, ...rest} = row;
  const [hour, min] = starttime.split(':');
  const date = new Date(eventdate);
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

export {toTicket, reduceToTicketState};

