import {
  eventinstances,
  seasonsubscriptiontypes,
  subscriptions,
  subscriptionticketitems,
  subscriptiontypes,
  ticketitems,
  ticketrestrictions,
} from '@prisma/client';
import {InvalidInputError} from './eventInstanceController.service';
import {validateWithRegex} from './eventController.service';

interface LoadedSubscription extends subscriptions {
  seasonsubscriptiontype: LoadedSeasonSubscriptionType
  subscriptionticketitems: LoadedSubscriptionTicketItem[]
}

interface LoadedSeasonSubscriptionType extends seasonsubscriptiontypes {
  subscriptiontype: subscriptiontypes
}

interface LoadedSubscriptionTicketItem extends subscriptionticketitems {
  ticketitem: LoadedTicketItem | null
}
interface LoadedTicketItem extends ticketitems {
  ticketrestriction: ticketrestrictions
}

export interface LoadedTicketRestriction extends ticketrestrictions {
  ticketitems: ticketitems[];
  availabletickets: number;
}
export const getUpdatedSubscription = (
    subscription: LoadedSubscription,
    ticketRestrictionMap: Map<number, LoadedTicketRestriction>,
    eventInstanceMap: Map<number, eventinstances | undefined>,
    subscriptionTicketItemMap: Map<number, number>,
) => {
  const subscriptionTicketItemsToDelete =
    subscription.subscriptionticketitems.reduce<{id: number}[]>((acc, {id, ticketitem}) => {
      if (!ticketitem) return acc;
      const count = subscriptionTicketItemMap.get(ticketitem.ticketrestrictionid_fk);

      if (count) {
        subscriptionTicketItemMap.set(ticketitem.ticketrestrictionid_fk, count - 1);
        return acc;
      }

      subscriptionTicketItemMap.delete(ticketitem.ticketrestrictionid_fk);
      acc.push({id});

      const eventInstance = eventInstanceMap.get(ticketitem.ticketrestriction.eventinstanceid_fk);
      if (!eventInstance) eventInstanceMap.set(ticketitem.ticketrestriction.eventinstanceid_fk, undefined);
      else ++eventInstance.availableseats;

      return acc;
    }, []);

  const subscriptionTicketItemsToCreate = [...subscriptionTicketItemMap.entries()]
      .flatMap(([ticketRestrictionId, ticketQuantity]) => {
        const ticketRestriction = ticketRestrictionMap.get(ticketRestrictionId);
        if (!ticketRestriction) {
          throw new InvalidInputError(
              422,
              `Requested tickets no longer available`,
          );
        }

        const eventInstance = eventInstanceMap.get(ticketRestriction?.eventinstanceid_fk);

        if (!eventInstance) {
          throw new InvalidInputError(
              422,
              'Requested tickets no longer available',
          );
        } else if ((ticketRestriction.availabletickets -= ticketQuantity) < 0 ||
        (eventInstance.availableseats -= ticketQuantity) < 0) {
          throw new InvalidInputError(
              422,
              'Requested tickets no longer available',
          );
        } else if (
          subscription.seasonsubscriptiontype.subscriptiontype.previewonly &&
        !eventInstance.ispreview
        ) {
          throw new InvalidInputError(
              422,
              'Can not redeem preview only subscription ticket for non preview showing',
          );
        }

        return Array(ticketQuantity).fill({
          ticketitem: {
            create: {
              ticketrestrictionid_fk: ticketRestrictionId,
            },
          },
        });
      });

  return {
    subscriptionTicketItemsToDelete,
    subscriptionTicketItemsToCreate,
    eventInstanceIds: [...eventInstanceMap.keys()],
  };
};

export interface SeasonSubscriptionType {
  price: number;
  ticketlimit: number;
  subscriptionlimit: number;
  subscriptiontypeid_fk: number;
}

export const validateSeasonSubscriptionType = ({
  price,
  ticketlimit,
  subscriptionlimit,
}: SeasonSubscriptionType, subscriptionsSold = 0, currentTicketLimit = 0) => {
  if (isNaN(price) || price < 0) {
    throw new InvalidInputError(422, `Invalid Price (${price})`);
  } else if (isNaN(ticketlimit) || ticketlimit < 0) {
    throw new InvalidInputError(422, `Invalid Ticket Limit (${ticketlimit})`);
  } else if (subscriptionsSold && ticketlimit < currentTicketLimit) {
    throw new InvalidInputError(422, `Can not reduce ticket limit if any outstanding subscriptions exist`);
  } else if (isNaN(subscriptionlimit) || subscriptionlimit < subscriptionsSold) {
    throw new InvalidInputError(422, `Invalid Subscription Limit (${+subscriptionlimit})`);
  }

  return {price, ticketlimit, subscriptionlimit};
};

export const validateSubscriptionType = (subscriptionType: any) => {
  if (isNaN(+subscriptionType.price) || +subscriptionType.price < 0) {
    throw new InvalidInputError(422, `Invalid Price (${subscriptionType.price})`);
  }
  return {
    name: validateWithRegex(subscriptionType.name, 'Invalid Name', new RegExp('^.{1,255}$')),
    description: validateWithRegex(subscriptionType.description, `Invalid Description`, new RegExp('^.{1,255}$')),
    price: +subscriptionType.price,
    previewonly: Boolean(subscriptionType.previewonly),
  };
};
