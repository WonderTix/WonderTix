/* eslint-disable max-len */
import {eventInstanceRequest, instanceTicketType, ticketRestriction} from '../interfaces/Event';
import {parseDateToInt} from '../api/db';

/* eslint-disable require-jsdoc */
export class InvalidInputError extends Error {
  code: number;
  name: string;
  constructor(code:number, message:string) {
    super(message);
    this.code = code;
    this.name = 'InvalidInputError';
  }
}
export const validateTicketRestrictionsOnUpdate = (oldRestrictions: ticketRestriction[], newRestrictions: instanceTicketType[], totalseats: number) => {
  if (newRestrictions.find((type) => type.typeQuantity > totalseats)) {
    throw new InvalidInputError(422, `Individual Ticket Type quantity can not exceed Total Ticket quantity`);
  }
  const restrictionsToUpdate: ticketRestriction[] = [];
  const restrictionsToRemove: ticketRestriction[] = [];

  oldRestrictions.forEach((restriction: any) => {
    const type = newRestrictions
        .find((type) => type.typeID === restriction.tickettypeid_fk);
    if (!type && (!restriction.ticketssold)) {
      restrictionsToRemove.push(restriction);
      return;
    } else if (!type) {
      throw new InvalidInputError(422, `Can not remove ticket type for which tickets have already been sold`);
    } else if (restriction.ticketssold && restriction.ticketssold > type.typeQuantity) {
      throw new InvalidInputError(422, `Can not reduce individual ticket type quantity below quantity sold to date`);
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
  if (!(totalseats >= ticketsSold)) {
    throw new InvalidInputError(422, `Can not reduce total ticket quantity 
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
    throw new InvalidInputError(422, `Invalid Event Date and time`);
  }
  return {
    eventdate: parseDateToInt(toReturn),
    eventtime: toReturn,
  };
};
export const validateShowingOnUpdate = (oldEvent: any, newEvent: eventInstanceRequest) => {
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
