import {useEffect, useState} from 'react';
import {getData} from '../Event/components/ShowingUtils';
import {formatUSD} from '../RefundOrders/RefundOrders';

export const validateSubscriptionType = (subscriptionType: any) => {
  if (+subscriptionType.price < 0) {
    throw new Error(
      `Subscription Price (${formatUSD(
        +subscriptionType.price,
      )}) must be positive`,
    );
  }
  if (!subscriptionType.description.length) {
    throw new Error('Please provide a description');
  }
  if (!subscriptionType.name.length) {
    throw new Error('Please provide a name');
  }
  return {
    description: subscriptionType.description,
    price: +subscriptionType.price,
    previewonly: Boolean(subscriptionType.previewonly),
    name: subscriptionType.name,
  };
};

export const defaultSubscriptionType = {
  id: -1,
  description: '',
  name: '',
  price: 0,
  previewonly: false,
};

export const apiCall = async (
  method: string,
  url: string,
  data?: any,
  token?: string,
) => {
  return fetch(url, {
    method: method,
    ...(token && {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }),
    ...(data && {body: JSON.stringify(data)}),
  });
};

export const useFetchSubscriptionTypes = () => {
  const [subscriptionTypes, setSubscriptionTypes] = useState(undefined);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    getData(
      `${process.env.REACT_APP_API_2_URL}/subscription-types/`,
      setSubscriptionTypes,
      controller.signal,
    ).catch(() => console.error('Error Fetching Subscription Types'));
    return () => controller.abort();
  }, [reload]);
  return {subscriptionTypes, setSubscriptionTypes, setReload};
};

export const usePopUp = () => {
  const [popUpProps, setPopUp] = useState({
    message: '',
    title: '',
    success: false,
    dataTestId: undefined,
    handleProceed: undefined,
    primaryLabel: undefined,
    secondaryLabel: undefined,
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const setPopUpProps = (
    title,
    message,
    success,
    dataTestId,
    handleProceed?,
    primaryLabel?,
    secondaryLabel?,
  ) => {
    setPopUp({
      title,
      message,
      success,
      dataTestId,
      handleProceed,
      secondaryLabel,
      primaryLabel,
    });
    setShowPopUp(true);
  };
  return {showPopUp, setShowPopUp, popUpProps, setPopUpProps};
};
