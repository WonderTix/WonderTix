/* eslint-disable require-jsdoc */
import {eventInstanceRequest, instanceTicketType} from '../interfaces/Event';
import {
  eventinstances,
  events,
  // eslint-disable-next-line camelcase
  order_ticketitems,
  seasons,
  seasontickettypepricedefault,
  ticketitems,
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
    ticketitems: LoadedTicketItem[];
    availabletickets: number,
}

export interface LoadedTicketItem extends ticketitems {
    // eslint-disable-next-line camelcase
    order_ticketitem: order_ticketitems;
}
export interface LoadedEventInstance extends eventinstances {
  ticketrestrictions: LoadedTicketRestriction[],
  event: LoadedEvent,
}

export interface LoadedEvent extends events {
  seasons: LoadedSeason | null,
}
export interface LoadedSeason extends seasons {
  seasontickettypepricedefaults: seasontickettypepricedefault[],
}

export const validateTicketRestrictionsOnUpdate = (
    eventInstance: LoadedEventInstance,
    newRestrictions: Map<number, instanceTicketType>,
) : {create: any[], update:any[], delete: any[]} => {
  const updates=
      eventInstance
          .ticketrestrictions
          .reduce<{update: any[], remove:any[]}>(({update, remove}, oldRestriction: LoadedTicketRestriction) => {
            const newRestriction = newRestrictions.get(oldRestriction.tickettypeid_fk);
            newRestrictions.delete(oldRestriction.tickettypeid_fk);
            const updatedRestriction = getTicketRestrictionUpdate(
                newRestriction,
                oldRestriction,
                eventInstance.totalseats,
            );
    updatedRestriction.update? update.push(updatedRestriction.update): remove.push(updatedRestriction.remove);
    return {update, remove};
          }, {update: [], remove: []});
  const seasonTicketTypePriceDefaults = new Map(eventInstance.event.seasons?.seasontickettypepricedefaults.map((def) => [def.tickettypeid_fk, def.id]));
  const create = [...newRestrictions.values()].map(({description, ...newRestriction}) => {
    const tickets: number = Math.min(eventInstance.totalseats, newRestriction.ticketlimit);
    return {
      ...newRestriction,
      price: newRestriction.tickettypeid_fk === 0? 0: +newRestriction.price,
      concessionprice: +newRestriction.concessionprice,
      ticketlimit: tickets,
      seasontickettypepricedefaultid_fk: seasonTicketTypePriceDefaults.get(+newRestriction.tickettypeid_fk),
    };
  });

  return {update: updates.update, delete: updates.remove, create};
};

const getTicketRestrictionUpdate = (
    newRestriction: instanceTicketType | undefined,
    oldRestriction: LoadedTicketRestriction,
    totalseats: number,
): {remove?: {}, update?: {}} => {
  const soldTickets = oldRestriction.ticketlimit - oldRestriction.availabletickets;
  if ((!newRestriction || !newRestriction.ticketlimit) && !oldRestriction.ticketitems.length) {
    return {
      remove: {
        ticketrestrictionsid: oldRestriction.ticketrestrictionsid,
      },
    };
  } else if ((!newRestriction || !newRestriction.ticketlimit) && !soldTickets) {
    return {
      update: {
        where: {
          ticketrestrictionsid: oldRestriction.ticketrestrictionsid,
        },
        data: {
          deletedat: new Date(),
        },
      },
    };
  } else if (!newRestriction || !newRestriction.ticketlimit) {
    throw new InvalidInputError(
        422,
        `Can not remove restriction for which tickets have been sold`,
    );
  } else if (newRestriction.ticketlimit > totalseats) {
    throw new InvalidInputError(
        422,
        `Restriction ticket limit can not exceed total seats for showing`,
    );
  } else if (soldTickets > newRestriction.ticketlimit) {
    throw new InvalidInputError(
        422,
        `Can not reduce individual ticket type quantity below quantity sold to date`,
    );
  }

  return {
    update: {
      where: {
        ticketrestrictionsid: oldRestriction.ticketrestrictionsid,
      },
      data: {
        ticketlimit: newRestriction.ticketlimit,
        price: oldRestriction.tickettypeid_fk === 0? 0: +newRestriction.price,
        concessionprice: +newRestriction.concessionprice,
      },
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

export const updateShowing = async (
    prisma: ExtendedPrismaClient,
    oldEvent: LoadedEventInstance,
    newEvent: eventInstanceRequest,
) => {
  const soldTickets = oldEvent.totalseats - oldEvent.availableseats;
  const newTotalSeats = Math.max(soldTickets, +newEvent.totalseats);
  await prisma.eventinstances.update({
    where: {
      eventinstanceid: oldEvent.eventinstanceid,
    },
    data: {
      ispreview: newEvent.ispreview,
      purchaseuri: newEvent.purchaseuri,
      salestatus: newEvent.salestatus,
      totalseats: newTotalSeats,
      availableseats: newTotalSeats - soldTickets,
      detail: newEvent.detail,
      ...validateDateAndTime(newEvent.eventdate, newEvent.eventtime),
      ticketrestrictions: {
        ...validateTicketRestrictionsOnUpdate(
            {...oldEvent, totalseats: newTotalSeats},
            new Map(newEvent.instanceTicketTypes.map((type) => [type.tickettypeid_fk, type])),
        ),
      },
    },
  });
};
