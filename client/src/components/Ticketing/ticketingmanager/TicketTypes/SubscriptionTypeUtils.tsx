import {useEffect, useState} from 'react';
import {getData} from '../Event/components/ShowingUtils';

export const validateSubscriptionType = (subscriptionType: any) => {
  if (+subscriptionType.price <= 0) {
    throw new Error('Invalid price');
  }
  if (subscriptionType.description.length === '') {
    throw new Error('Invalid Description');
  }
  if (subscriptionType.name.length === '') {
    throw new Error('Invalid Name');
  }
  return {
    description: subscriptionType.description,
    price: +subscriptionType.price,
    previewonly: Boolean(subscriptionType.previewonly),
    name: subscriptionType.name,
  };
};

export const getDefaultSubscriptionType = () => ({
  id: -1,
  description: '',
  name: '',
  price: 0,
  previewonly: false,
});

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
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const setPopUpProps = (
    title,
    message,
    success,
    dataTestId,
    handleProceed?,
  ) => {
    setPopUp({title, message, success, dataTestId, handleProceed});
    setShowPopUp(true);
  };
  return {showPopUp, setShowPopUp, popUpProps, setPopUpProps};
};
