/* eslint-disable require-jsdoc */
import {
  eventInstanceRequest,
  instanceTicketType,
  ticketRestriction,
} from '../interfaces/Event';
import {eventtickets} from '@prisma/client';
export class InvalidInputError extends Error {
  code: number;
  name: string;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = 'InvalidInputError';
  }
}

export const validateTicketRestrictionsOnUpdate = (
    oldRestrictions: ticketRestriction[],
    newRestrictions: instanceTicketType[],
    availableseats: number,
    availableTickets: eventtickets[],
) => {
  const restrictionsToUpdate: [
    ticketRestriction,
    { difference: number; ticketsToRemove?: number[] },
  ][] = [];
  const restrictionsToRemove: ticketRestriction[] = [];

  oldRestrictions.forEach((restriction: any) => {
    const type = newRestrictions.find(
        (type) => type.typeID === restriction.tickettypeid_fk,
    );
    const tickets = availableTickets.filter(
        (ticket) => ticket.tickettypeid_fk == restriction.tickettypeid_fk,
    );

    if ((!type || !type.typeQuantity) && !restriction.ticketssold) {
      restrictionsToRemove.push(restriction);
      return;
    } else if (!type || !type.typeQuantity) {
      throw new InvalidInputError(
          422,
          `Can not remove ticket type for which tickets have already been sold`,
      );
    }

    if ((restriction.ticketssold ?? 0) > type.typeQuantity) {
      throw new InvalidInputError(
          422,
          `Can not reduce individual ticket type quantity below quantity sold to date`,
      );
    }

    const difference = Math.min(
        availableseats - tickets.length,
        type.typeQuantity - restriction.ticketlimit,
    );
    if (restriction.ticketlimit !== type.typeQuantity) {
      restrictionsToUpdate.push([
        {
          ...restriction,
          ticketlimit: restriction.ticketlimit + difference,
        },
        {
          difference,
          ...(difference < 0 && {
            ticketsToRemove: tickets
                .splice(0, Math.abs(difference))
                .map((ticket) => ticket.eventticketid),
          }),
        },
      ]);
    }
    newRestrictions.splice(newRestrictions.indexOf(type), 1);
  });
  if (newRestrictions.find((type) => type.typeQuantity > availableseats)) {
    throw new InvalidInputError(
        422,
        `New ticket type quantity can not exceed available seat quantity`,
    );
  }
  return {
    restrictionsToUpdate,
    restrictionsToRemove,
    restrictionsToAdd: newRestrictions,
  };
};

const validateTicketQuantity = (
    totalseats: number,
    tickets: eventtickets[],
) => {
  const unsoldTickets = tickets.filter((ticket) => !ticket.singleticket_fk);
  const soldTicketCount = tickets.length - unsoldTickets.length;
  if (totalseats < soldTicketCount) {
    throw new InvalidInputError(
        422,
        `Can not reduce total ticket quantity 
        below ${soldTicketCount} tickets sold to date`,
    );
  }
  const difference = totalseats - tickets.length;
  return {
    totalseats,
    availableseats: totalseats - soldTicketCount,
    update: {
      difference,
      ...(difference < 0 && {
        ticketsToRemove: unsoldTickets
            .slice(0, Math.abs(difference))
            .map((ticket) => ticket.eventticketid),
      }),
    },
  };
};

export const validateDateAndTime = (date: string, time: string) => {
  const dateSplit = date.split('-');
  const timeSplit = time.split(':');
  if (dateSplit.length < 3 || timeSplit.length < 2) {
    throw new InvalidInputError(422, `Invalid Event Date and time`);
  }

  const toReturn = new Date(
      `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}T${timeSplit[0]}:${timeSplit[1]}:00.000Z`,
  );

  if (isNaN(toReturn.getTime())) {
    throw new InvalidInputError(422, `Invalid Event Date and time`);
  }
  return {
    eventdate:
      Number(dateSplit[0]) * 10000 +
      Number(dateSplit[1]) * 100 +
      Number(dateSplit[2]),
    eventtime: toReturn.toISOString(),
  };
};

export const validateShowingOnUpdate = (
    oldEvent: any,
    newEvent: eventInstanceRequest,
) => {
  const {availableseats, totalseats, update} = validateTicketQuantity(
      newEvent.totalseats,
      oldEvent.eventtickets.filter((ticket: any) => ticket.tickettypeid_fk === 1),
  );
  return {
    updatedEventInstance: {
      ispreview: newEvent.ispreview,
      purchaseuri: newEvent.purchaseuri,
      salestatus: newEvent.salestatus,
      availableseats,
      totalseats,
      ...validateDateAndTime(newEvent.eventdate, newEvent.eventtime),
    },
    GAEventTicketsUpdate: update,
  };
};
