import React, {useCallback, useMemo, useState} from 'react';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {
  isSubscriptionCartItem,
  SubscriptionCartItem,
  TicketCartItem,
} from '../ticketingSlice';
import {
  updateCartItems,
  updateEventInstances,
  updateSubscriptionTypes,
  updateTicketRestrictions,
  useFetchData,
  useFetchExchangeEvents,
  useFetchExchangeSubscriptions,
} from './TicketExchangeUtils';
import {
  ProviderOrder, RefundCartItem,
  TicketExchangeContextValues,
} from './ticketExchangeInterfaces';
import {contact} from '../prismaTypes';

const TicketExchangeContext = React.createContext<TicketExchangeContextValues>({
  token: undefined,
  cartItems: undefined,
  refundItems: undefined,
  setRefundItems: undefined,
  customer: undefined,
  setCustomer: undefined,
  events: undefined,
  eventInstances: undefined,
  ticketRestrictions: undefined,
  subscriptionTypes: undefined,
  seasons: undefined,
  orders: undefined,
  updateCart: undefined,
  stage: undefined,
  setStage: undefined,
  setAppliedDiscount: undefined,
  appliedDiscount: undefined,
});

export const useTicketExchangeContext = () =>
  React.useContext(TicketExchangeContext);

export const TicketExchangeProvider: React.FC = (props) => {
  const {token} = useFetchToken();

  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [cartItems, setCartItems] = useState(
    new Map<string, TicketCartItem | SubscriptionCartItem>(),
  );
  const [customer, setCustomer] = useState<contact>();
  const [stage, setStage] = useState<
    'select_items' | 'customer_info' | 'checkout' | 'processing'
  >('select_items');
  const [refundItems, setRefundItems] = useState(
    new Map<number, RefundCartItem>(),
  );

  const [orders] = useFetchData<ProviderOrder[]>(
    `${process.env.REACT_APP_API_2_URL}/order/customer/refund/items/${customer?.contactid}`,
    {token: !customer ? undefined : token},
  );
  const {
    events,
    eventInstances,
    ticketRestrictions,
    setTicketRestrictions,
    setEventInstances,
  } = useFetchExchangeEvents(token);
  const {seasons, subscriptionTypes, setSubscriptionTypes} =
    useFetchExchangeSubscriptions(token);

  const updateCart = useCallback(
    (item: SubscriptionCartItem | TicketCartItem) => {
      setCartItems((prev) => updateCartItems(prev, item));
      if (isSubscriptionCartItem(item)) {
        setSubscriptionTypes((prev) => updateSubscriptionTypes(prev, item));
      } else {
        setEventInstances((prev) => updateEventInstances(prev, item));
        setTicketRestrictions((prev) => updateTicketRestrictions(prev, item));
      }
    },
    [
      setTicketRestrictions,
      setEventInstances,
      setSubscriptionTypes,
      setCartItems,
    ],
  );

  const contextValue = useMemo(
    () => ({
      token,
      cartItems,
      refundItems,
      setCustomer,
      customer,
      events,
      eventInstances,
      ticketRestrictions,
      subscriptionTypes,
      orders,
      updateCart,
      stage,
      setStage,
      seasons,
      setAppliedDiscount,
      appliedDiscount,
      setRefundItems,
    }),
    [
      appliedDiscount,
      cartItems,
      refundItems,
      token,
      customer,
      events,
      eventInstances,
      ticketRestrictions,
      orders,
      stage,
      seasons,
    ],
  );

  return (
    <TicketExchangeContext.Provider value={contextValue}>
      {props.children}
    </TicketExchangeContext.Provider>
  );
};
