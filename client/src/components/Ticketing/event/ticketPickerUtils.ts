import {Ticket} from '../ticketingmanager/ticketingSlice';
import {DateOption} from './ShowingDateSelect';
import format from 'date-fns/format';

export const getUniqueFormattedDateOptions = (
  tickets: Ticket[],
): DateOption[] => {
  const sortedDates = tickets
    .map((ticket) => {
      return {
        date: new Date(ticket.date),
        soldOut: ticket.remainingtickets === 0,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const formattedDates = sortedDates.map((sortedDate) => {
    return {
      date: format(sortedDate.date, 'eee, MMM dd yyyy'),
      soldOut: sortedDate.soldOut,
    };
  });

  // Reduce to unique dates and determine if all event instances are sold out
  return formattedDates.reduce((acc, curr) => {
    const index = acc.findIndex((date) => date.date === curr.date);
    if (index > -1) {
      acc[index].soldOut = acc[index].soldOut && curr.soldOut;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};
