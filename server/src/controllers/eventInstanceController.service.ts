import {eventInstanceRequest, instanceTicketType, ticketRestriction} from '../interfaces/Event';
import {parseDateToInt} from '../api/db';

export const validateTicketRestrictionsOnUpdate =
  (oldRestrictions: ticketRestriction[],
      newRestrictions: instanceTicketType[],
      totalseats: number) => {
    if (newRestrictions.filter((type) => type.typeQuantity > totalseats).length) {
      throw new Error(`Individual Ticket Type quantity can not exceed Total Ticket quantity`);
    }
    const restrictionsToUpdate: ticketRestriction[] = [];
    const restrictionsToRemove: ticketRestriction[] = [];

    oldRestrictions.forEach((restriction: any) => {
      const type = newRestrictions
          .find((type) => type.typeID === restriction.tickettypeid_fk);
      if (!type && (!restriction.ticketssold || restriction.ticketssold == 0)) {
        restrictionsToRemove.push(restriction);
        return;
      } else if (!type) {
        throw new Error(`Can not remove ticket type for which tickets have already been sold`);
      } else if (restriction.ticketssold && restriction.ticketssold > type.typeQuantity) {
        throw new Error(`Can not reduce individual ticket type quantity below quantity sold to date`);
      } else if (restriction.ticketlimit !== type.typeQuantity) {
        restrictionsToUpdate.push({
          ...restriction,
          ticketlimit: Number(type.typeQuantity),
        });
      }
      newRestrictions.splice(newRestrictions.indexOf(type), 1);
    });
    return {
      restrictionsToUpdate,
      restrictionsToRemove,
      restrictionsToAdd: newRestrictions,
    };
  };
const validateTicketQuantity = (totalseats: number, ticketsSold: number) => {
  if (ticketsSold !== 0 && totalseats < ticketsSold) {
    throw new Error(`Can not reduce total ticket quantity 
        below quantity of tickets sold to date 
        ${ticketsSold}`);
  }
  return {
    totalseats,
    availableseats: totalseats - ticketsSold,
  };
};
export const validateDateAndTime = (date: string, time: string) => {
  const toReturn = new Date(`${date} ${time}`);
  console.log('time', `${date} ${time}`);
  console.log(toReturn.toDateString(), toReturn.toLocaleTimeString());
  if (isNaN(toReturn.getTime())) {
    throw new Error(`Invalid Event Date and time`);
  }
  return {
    eventdate: parseDateToInt(toReturn),
    eventtime: toReturn,
  };
};
export const validateShowingUpdate = (oldEvent: any, newEvent: eventInstanceRequest) => {
  return {
    ispreview: newEvent.ispreview,
    purchaseuri: newEvent.purchaseuri,
    salestatus: newEvent.salestatus,
    ...validateTicketQuantity(
        newEvent.totalseats,
        oldEvent.eventtickets.filter((ticket: any) => ticket.purchased).length),
    ...validateDateAndTime(newEvent.eventdate, newEvent.eventtime),
  };
};

// const validateEventTickets =
//   (eventTickets:any, newRestrictions:instanceTicketType[], totalTickets:number) => {
//     const eventTicketsByType= new Map([[1, {sold: 0, unsold: 0, adjustment: 0}]]);
//     eventTickets.forEach((ticket:any) => {
//       const typeID = ticket.tickettypeid_fk??1;
//       const temp = eventTicketsByType.get(typeID);
//       if (!temp) {
//         eventTicketsByType.set(typeID, {
//           unsold: (ticket.purchased?0:1),
//           sold: (ticket.purchased?1:0),
//           adjustment: 0,
//         });
//         return;
//       }
//       if (ticket.purchased) {
//         ++temp.sold;
//       } else {
//         ++temp.unsold;
//       }
//     });
//
//     const defaultTicketType = eventTicketsByType.get(1);
//
//     if(defaultTicketType.sold > totalTickets)
//
//     newRestrictions.forEach((type) => {
//       const temp = eventTicketsByType.get(type.typeID);
//       if (!temp) {
//         eventTicketsByType.set(type.typeID, {
//           sold: 0,
//           unsold: 0,
//           adjustment: type.typeQuantity,
//         });
//         return;
//       }
//       if (type.typeQuantity < temp.sold) {
//         throw new Error(`Can not reduce individual ticket type quantity below quantity sold to date`);
//       }
//       temp.adjustment = type.typeQuantity - (temp.sold+temp.unsold);
//     });
//     return eventTicketsByType;
//   };

