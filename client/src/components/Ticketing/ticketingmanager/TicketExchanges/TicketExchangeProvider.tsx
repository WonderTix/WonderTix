import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFetchToken} from '../Event/components/ShowingUtils';
import {isSubscriptionCartItem} from '../ticketingSlice';
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
  contact,
  ProviderCartItem,
  ProviderOrder,
  RefundCartItem,
  TicketExchangeContextValues,
} from './ticketExchangeTypes';

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
  const [customer, setCustomer] = useState<contact>();
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [cartItems, setCartItems] = useState(new Map<string, ProviderCartItem>());
  const [refundItems, setRefundItems] = useState(new Map<number, RefundCartItem>());
  const [stage, setStage] = useState<'select_items' | 'customer_info' | 'checkout'>('select_items');
  const [orders,,,,, setOrders] = useFetchData<ProviderOrder[]>(
    `${process.env.REACT_APP_API_2_URL}/order/refundable-orders/${customer?.contactid}`,
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
    (item: ProviderCartItem) => {
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

  useEffect(() => {
    if (!customer) {
      setOrders([]);
      setRefundItems(new Map());
    }
  }, [customer]);

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
