/* eslint-disable require-jsdoc */
import {eventInstanceRequest, instanceTicketType} from '../interfaces/Event';
import {
  eventinstances,
  events,
  eventtickets,
  seasons,
  seasontickettypepricedefault,
  ticketrestrictions,
} from '@prisma/client';
import {ExtendedPrismaClient} from './PrismaClient/GetExtendedPrismaClient';

export class InvalidInputError extends Error {
  code: number;
  name: string;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = 'InvalidInputError';
  }
}

export interface LoadedTicketRestriction extends ticketrestrictions {
  eventtickets: eventtickets[],
}

export interface LoadedEventInstance extends eventinstances {
  ticketrestrictions: LoadedTicketRestriction[],
  events: LoadedEvent,
}

export interface LoadedEvent extends events {
  seasons: LoadedSeason | null,
}
export interface LoadedSeason extends seasons {
  seasontickettypepricedefaults: seasontickettypepricedefault[],
}

export const validateTicketRestrictionsOnUpdate = (
    prisma: ExtendedPrismaClient,
    eventInstance: LoadedEventInstance,
    newRestrictions: Map<number, instanceTicketType>,
) : any[] => {
  const queryBatch = eventInstance.ticketrestrictions.map((oldRestriction: LoadedTicketRestriction) => {
    const newRestriction = newRestrictions.get(oldRestriction.tickettypeid_fk);
    newRestrictions.delete(oldRestriction.tickettypeid_fk);
    return getTicketRestrictionUpdate(
        prisma,
        newRestriction,
        oldRestriction,
        eventInstance.totalseats,
    );
  }).flat(Infinity);
  const seasonTicketTypePriceDefaults = new Map(eventInstance.events.seasons?.seasontickettypepricedefaults.map((def) => [def.tickettypeid_fk, def.id]));
  return queryBatch.concat([...newRestrictions.values()].map(({description, ...newRestriction}) => {
    const tickets: number = Math.min(eventInstance.totalseats, newRestriction.ticketlimit);
    return prisma.ticketrestrictions.create({
      data: {
        ...newRestriction,
        price: newRestriction.tickettypeid_fk === 0? 0: +newRestriction.price,
        concessionprice: +newRestriction.concessionprice,
        ticketlimit: tickets,
        eventinstanceid_fk: +eventInstance.eventinstanceid,
        seasontickettypepricedefaultid_fk: seasonTicketTypePriceDefaults.get(+newRestriction.tickettypeid_fk),
        eventtickets: {
          create: Array(tickets).fill({
            eventinstanceid_fk: +eventInstance.eventinstanceid,
          }),
        },
      },
    });
  }));
};

const getTicketRestrictionUpdate = (
    prisma: ExtendedPrismaClient,
    newRestriction: instanceTicketType | undefined,
    oldRestriction: LoadedTicketRestriction,
    totalseats: number,
) => {
  const availableTickets:eventtickets[] = [];
  const soldTickets: eventtickets[] = [];
  oldRestriction.eventtickets.forEach((ticket) =>
      ticket.singleticketid_fk? soldTickets.push(ticket): availableTickets.push(ticket),
  );
  if ((!newRestriction || !newRestriction.ticketlimit) && !soldTickets.length) {
    return [prisma.ticketrestrictions.delete({
      where: {
        ticketrestrictionsid: oldRestriction.ticketrestrictionsid,
      },
    })];
  } else if (!newRestriction || !newRestriction.ticketlimit) {
    throw new InvalidInputError(
        422,
        `Can not remove ticket type for which tickets have already been sold`,
    );
  } else if (newRestriction.ticketlimit > totalseats) {
    throw new InvalidInputError(
        422,
        `Restriction ticket limit can not exceed total seats for showing`,
    );
  } else if (soldTickets.length > newRestriction.ticketlimit) {
    throw new InvalidInputError(
        422,
        `Can not reduce individual ticket type quantity below quantity sold to date`,
    );
  }

  const newQuantity= Math.min(totalseats, newRestriction.ticketlimit);
  const difference = newQuantity-oldRestriction.eventtickets.length;

  return [prisma.ticketrestrictions.update({
    where: {
      ticketrestrictionsid: oldRestriction.ticketrestrictionsid,
    },
    data: {
      ticketlimit: +newRestriction.ticketlimit,
      price: oldRestriction.tickettypeid_fk === 0? 0: +newRestriction.price,
      concessionprice: +newRestriction.concessionprice,
      ...(difference > 0 && {
        eventtickets: {
          create: Array(difference).fill({
            eventinstanceid_fk: oldRestriction.eventinstanceid_fk,
          }),
        },
      }),
    }}),
  ...(difference < 0?
        [prisma.eventtickets.deleteMany({
          where: {
            eventticketid: {in: availableTickets
                .slice(0, Math.abs(difference))
                .map((ticket) => ticket.eventticketid),
            }}})]: []
  )];
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
    oldEvent: LoadedEventInstance,
    newEvent: eventInstanceRequest,
) => {
  const soldTickets = oldEvent.totalseats - oldEvent.availableseats;
  const newTotalSeats = Math.max(soldTickets, +newEvent.totalseats);
  return {
    ispreview: newEvent.ispreview,
    purchaseuri: newEvent.purchaseuri,
    salestatus: newEvent.salestatus,
    totalseats: newTotalSeats,
    availableseats: newTotalSeats - soldTickets,
    detail: newEvent.detail,
    ...validateDateAndTime(newEvent.eventdate, newEvent.eventtime),
  };
};
