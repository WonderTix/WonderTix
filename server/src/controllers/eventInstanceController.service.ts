/* eslint-disable max-len */
import {eventInstanceRequest, instanceTicketType, ticketRestriction} from '../interfaces/Event';

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
        below ${ticketsSold} tickets sold to date`);
  }
  return {
    totalseats,
    availableseats: totalseats - ticketsSold,
  };
};
export const validateDateAndTime = (date: string, time: string) => {
  const dateSplit = date.split('-');
  const timeSplit = time.split(':');
  if (dateSplit.length < 3 || timeSplit.length <2) {
    throw new InvalidInputError(422, `Invalid Event Date and time`);
  }

  const toReturn = new Date(
      `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}T${timeSplit[0]}:${timeSplit[1]}:00.000Z`,
  );

  if (isNaN(toReturn.getTime())) {
    throw new InvalidInputError(422, `Invalid Event Date and time`);
  }
  return {
    eventdate: Number(dateSplit[0])*10000+Number(dateSplit[1])*100+Number(dateSplit[2]),
    eventtime: toReturn.toISOString(),
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
