import {useCallback, useEffect, useMemo, useState} from 'react';
import {getData} from '../Event/components/ShowingUtils';
import {toDateStringFormat} from '../Event/components/util/EventsUtil';
import {
  isTicketCartItem,
  SubscriptionCartItem,
  TicketCartItem,
} from '../ticketingSlice';
import format from 'date-fns/format';
import {getDiscountCode} from '../AdminPurchase/utils/adminApiRequests';
import * as yup from 'yup';
import {emptyDiscountCode} from '../AdminPurchase/utils/adminCommon';
import {CheckoutContact} from '../../checkout/CheckoutUtils';
import {loadStripe} from '@stripe/stripe-js';
import {
  ProviderEvent,
  ProviderEventInstance,
  ProviderSeason,
  ProviderSeasonSubscriptionType,
  ProviderTicketRestriction,
  RefundCartItem,
} from './ticketExchangeInterfaces';
import {orderitem} from '../prismaTypes';

const pk = `${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`;
const stripePromise = loadStripe(pk);

/**
 *
 * @param url
 * @param options
 * @param options.token
 * @param options.dataFormatCallback
 * @param options.defaultState
 * @param options.dependencies
 */
export function useFetchData<T>(
  url: string,
  options: {
    token?: string;
    dataFormatCallback?: (data: any) => T;
    defaultState?: T;
    dependencies?: any[];
  } = {
    token: 'none',
  },
): [
  T | undefined,
  boolean,
  () => void,
  string,
  () => void,
  (value: any) => void,
] {
  const {token, dataFormatCallback, dependencies = [], defaultState} = options;
  const [data, setData] = useState<T>(defaultState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!token) return;
    getData(
      url,
      (data) => {
        setData(dataFormatCallback?.(data) ?? data);
        setLoading(false);
        setError('');
      },
      controller.signal,
      options.token !== 'none' ? options.token : undefined,
    ).catch((error) => {
      console.error(error);
      setError(`${url} failed to fetch`);
    });
    return () => controller.abort();
  }, [...dependencies, token, url, reload]);

  return [
    data,
    loading,
    () => setLoading(true),
    error,
    () => setReload(!reload),
    setData,
  ];
}

export const useQueries = () => {
  const [queries, setQueries] = useState<{parameter: string; value: string}[]>([
    {
      parameter: 'firstname',
      value: '',
    },
  ]);
  const updateParameters = useCallback((index: number, newValue: string) => {
    setQueries((prev) => {
      if (newValue) {
        return prev.map((value, cur) =>
          index === cur ? {...value, parameter: newValue} : value,
        );
      }
      prev.splice(index, 1);
      return Array.from(prev);
    });
  }, []);

  const updateQueryValues = useCallback(
    (index: number, value: string) =>
      setQueries((prev) =>
        prev.map((query, cur) => (index === cur ? {...query, value} : query)),
      ),
    [],
  );

  const updateQueries = useCallback(
    (indexToRemove: number, type: 'parameter' | 'query', value: string) =>
      type === 'parameter'
        ? updateParameters(indexToRemove, value)
        : updateQueryValues(indexToRemove, value),
    [],
  );

  const addQuery = useCallback((parameter: string) => {
    setQueries((prev) => [...prev, {parameter, value: ''}]);
  }, []);

  const queryString = useMemo(
    () =>
      queries
        .filter((item) => item.value.trim())
        .map(({parameter, value}) => `${parameter}=${value.trim()}`)
        .join('&'),
    [queries],
  );

  return {queries, updateQueries, queryString, addQuery};
};

export const getDateTime = (date: number, time: string) =>
  new Date(`${toDateStringFormat(date)} ${time.split('T')[1].slice(0, 8)}`);

export const getNameAndDescription = (item: orderitem) => {
  if (item.subscription) {
    const {
      seasonsubscriptiontype: {ticketlimit, subscriptiontype, season},
    } = item.subscription;
    return {
      name: `${subscriptiontype.name} Subscription`,
      desc: `${ticketlimit} shows for ${season.name}`,
    };
  } else if (item.ticketitem) {
    const {
      ticketrestriction: {
        tickettype,
        eventinstance: {eventdate, eventtime, event},
      },
    } = item.ticketitem;
    return {
      name: `${event.eventname} ticket`,
      desc: `${tickettype.description} - ${format(
        getDateTime(eventdate, eventtime),
        'M/dd/yyyy, h:mm a',
      )}`,
    };
  } else {
    return {
      name: 'Donation',
      desc: 'generous donation',
    };
  }
};

export const useDiscount = (setCheckoutDiscount: (value: any) => void) => {
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountText, setDiscountText] = useState('');
  const [discountClicked, setDiscountClicked] = useState(false);

  const getDiscountTotal = useCallback(
    (subtotal: number) => {
      if (appliedDiscount?.amount && appliedDiscount?.percent) {
        return Math.min(
          (+appliedDiscount.percent / 100) * subtotal,
          appliedDiscount.amount,
        );
      } else if (appliedDiscount?.amount) {
        return Math.min(subtotal, appliedDiscount.amount);
      } else if (appliedDiscount?.percent) {
        return (+appliedDiscount.percent / 100) * subtotal;
      } else {
        return 0;
      }
    },
    [appliedDiscount],
  );

  const handleApplyDiscount = useCallback(
    async (
      discountText: string,
      cartItems: (SubscriptionCartItem | TicketCartItem)[],
    ) => {
      const discount = await getDiscountCode(discountText);
      if (discount && validateDiscountCode(discount, cartItems)) {
        setAppliedDiscount(discount);
        setCheckoutDiscount(discount);
      }
      setDiscountClicked(true);
    },
    [],
  );

  const handleRemoveDiscount = useCallback(() => {
    setAppliedDiscount(null);
    setCheckoutDiscount(null);
    setDiscountText('');
    setDiscountClicked(false);
  }, []);

  const handleDiscountTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDiscountText(event.target.value);
      setDiscountClicked(false);
    },
    [],
  );

  return {
    discountClicked,
    appliedDiscount,
    discountText,
    handleApplyDiscount,
    handleRemoveDiscount,
    handleDiscountTextChange,
    getDiscountTotal,
  };
};

const validateDiscountCode = (
  discount: any,
  cartItems: (TicketCartItem | SubscriptionCartItem)[],
): boolean => {
  const eventIds = cartItems.reduce(
    (acc, item) => (isTicketCartItem(item) ? acc.add(item.eventId) : acc),
    new Set<number>(),
  );
  const numEventsInCart = eventIds.size;
  const totalCartTicketCount = cartItems.reduce(
    (tot, item) => (isTicketCartItem(item) ? tot + item.qty : tot),
    0,
  );
  return (
    numEventsInCart >= discount.min_events ||
    totalCartTicketCount >= discount.min_tickets
  );
};

export const subscriptionExchangeItemSchema = yup.object().shape({
  seasonid_fk: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Must select a subscription')
    .required('Required'),
  subscriptiontypeid_fk: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Must select a subscription')
    .required('Required'),
  price: yup.number().min(0, 'Price can not be negative').required('Required'),
  qty: yup
    .number()
    .integer()
    .min(0, 'Quantity must be positive')
    .required('Required'),
});

export const eventInstanceItemSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Must select a showing')
    .required('Required'),
  typeID: yup
    .number()
    .integer('Must be an integer')
    .min(0, 'Must select a ticket type')
    .required('Required'),
  price: yup.number().min(0, 'Price can not be negative').required('Required'),
  fee: yup.number().min(0, 'Price can not be negative').required('Required'),
  qty: yup
    .number()
    .integer()
    .min(0, 'Quantity must be positive')
    .required('Required'),
});

interface CheckoutDataArguments {
  checkoutFormInfo: CheckoutContact;
  cartItems: Map<string, SubscriptionCartItem | TicketCartItem>;
  ticketRestrictions: Map<number, ProviderTicketRestriction>;
  refundItems: Map<number, RefundCartItem>;
  appliedDiscount?: any;
}

export const getCheckoutData = ({
  checkoutFormInfo,
  appliedDiscount,
  ticketRestrictions,
  cartItems,
  refundItems,
}: CheckoutDataArguments) => {
  const formData = {...checkoutFormInfo};
  if (formData.seatingaccom === 'Other') {
    formData.seatingaccom = formData.otherSeatingAcc;
  }
  const donation = formData.donation ? +formData.donation : 0;
  const discount = appliedDiscount ? appliedDiscount : emptyDiscountCode;
  const {ticketCartItems, subscriptionCartItems} = Array.from(cartItems).reduce(
    (acc, [, item]) => {
      if (isTicketCartItem(item)) {
        acc.ticketCartItems.push({
          ...item,
          typeID: ticketRestrictions.get(item.typeID)?.tickettypeid_fk,
        });
      } else {
        acc.subscriptionCartItems.push(item);
      }
      return acc;
    },
    {
      ticketCartItems: Array<TicketCartItem>(),
      subscriptionCartItems: Array<SubscriptionCartItem>(),
    },
  );

  const refundCartItems = Array.from(refundItems).map(([, item]) => ({
    orderItemId: item.id,
    refundFee: item.fee !== undefined,
  }));

  return {
    refundCartItems,
    subscriptionCartItems,
    ticketCartItems,
    donation,
    discount,
    formData,
  };
};

export const useFetchExchangeEvents = (token: string) => {
  const [events, setEvents] = useState<Map<number, ProviderEvent>>();
  const [eventInstances, setEventInstances] =
    useState<Map<number, ProviderEventInstance>>();
  const [ticketRestrictions, setTicketRestrictions] =
    useState<Map<number, ProviderTicketRestriction>>();
  useEffect(() => {
    const controller = new AbortController();
    if (!token) return;
    getData(
      `${process.env.REACT_APP_API_2_URL}/events/exchange`,
      ({events, eventinstances, ticketrestrictions}) => {
        setEventInstances(
          new Map(
            eventinstances.map((instance) => [
              instance.eventinstanceid,
              instance,
            ]),
          ),
        );
        setTicketRestrictions(
          new Map(
            ticketrestrictions.map((res) => [res.ticketrestrictionsid, res]),
          ),
        );
        setEvents(new Map(events.map((event) => [event.eventid, event])));
      },
      controller.signal,
      token,
    ).catch((error) => console.error(error));
    return () => controller.abort();
  }, [token]);

  return {
    events,
    setEvents,
    eventInstances,
    setEventInstances,
    ticketRestrictions,
    setTicketRestrictions,
  };
};

export const useFetchExchangeSubscriptions = (token: string) => {
  const [seasons, setSeasons] = useState<ProviderSeason[]>();
  const [subscriptionTypes, setSubscriptionTypes] =
    useState<Map<string, ProviderSeasonSubscriptionType>>();
  useEffect(() => {
    const controller = new AbortController();
    if (!token) return;
    getData(
      `${process.env.REACT_APP_API_2_URL}/subscription-types/exchange/available`,
      ({seasons, subscriptions}) => {
        setSubscriptionTypes(
          new Map(
            subscriptions.map((type) => [
              `${type.seasonid_fk}T${type.subscriptiontypeid_fk}`,
              type,
            ]),
          ),
        );
        setSeasons(seasons);
      },
      controller.signal,
      token,
    ).catch((error) => console.error(error));
    return () => controller.abort();
  }, [token]);

  return {
    seasons,
    subscriptionTypes,
    setSubscriptionTypes,
  };
};

export const updateCartItems = (
  cartItems: Map<string, SubscriptionCartItem | TicketCartItem>,
  item: SubscriptionCartItem | TicketCartItem,
) => {
  const key = isTicketCartItem(item)
    ? `${item.product_id}T${item.price}T${item.fee}`
    : `${item.seasonid_fk}T${item.subscriptiontypeid_fk}T${item.price}`;
  const existing = cartItems.get(key);
  const value = existing
    ? {
        ...existing,
        qty: existing.qty + item.qty,
      }
    : item;
  if (value.qty <= 0) {
    cartItems.delete(key);
  } else {
    cartItems.set(key, value);
  }
  return new Map(cartItems);
};

export const updateSubscriptionTypes = (
  subscriptionTypes: Map<string, ProviderSeasonSubscriptionType>,
  item: SubscriptionCartItem,
) => {
  const key = `${item.seasonid_fk}T${item.subscriptiontypeid_fk}`;
  const current = subscriptionTypes.get(key);
  return new Map([
    ...Array.from(subscriptionTypes),
    [
      key,
      {
        ...current,
        subscriptionsavailable: current.subscriptionsavailable - item.qty,
      },
    ],
  ]);
};

export const updateEventInstances = (
  eventInstances: Map<number, ProviderEventInstance>,
  item: TicketCartItem,
) => {
  const current = eventInstances.get(item.product_id);
  return new Map([
    ...Array.from(eventInstances),
    [
      item.product_id,
      {...current, availableseats: current.availableseats - item.qty},
    ],
  ]);
};
export const updateTicketRestrictions = (
  ticketRestrictions: Map<number, ProviderTicketRestriction>,
  item: TicketCartItem,
) => {
  const current = ticketRestrictions.get(item.typeID);
  return new Map([
    ...Array.from(ticketRestrictions),
    [
      item.typeID,
      {
        ...current,
        ticketsavailable: current.ticketsavailable - item.qty,
      },
    ],
  ]);
};

export const onlineCheckout = async (checkoutBody: any, token?: string) => {
  const stripe = await stripePromise;
  if (!stripe) return;

  const response = await fetch(
    `${process.env.REACT_APP_API_2_URL}/events/admin-checkout`,
    {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(checkoutBody),
    },
  );

  if (!response.ok) {
    throw response;
  }

  const {id} = await response.json();

  if (id === 'comp' || id === 'refund') return;

  const result = await stripe.redirectToCheckout({sessionId: id});

  if (result.error) {
    throw result.error;
  }
};
