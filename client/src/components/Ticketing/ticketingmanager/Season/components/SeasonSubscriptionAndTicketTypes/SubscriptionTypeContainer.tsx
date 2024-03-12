import React from 'react';
import {createSubmitFunction} from '../../../Event/components/ShowingUtils';
import {useFetchSeasonSubscriptionTypes} from '../utils/apiRequest';
import {useState} from 'react';
import {SubscriptionTypeUpdateTable} from './SubscriptionTypeUpdateTable';
import {SeasonSubscriptionTypeView} from './SubscriptonTypeView';
import {useFetchSubscriptionTypes} from '../../../TicketTypes/SubscriptionTypeUtils';

export interface SubscriptionTypeContainerProps {
  token: string;
  id: number;
  disabled: boolean;
  setDisabled: (value) => void;
  setPopUpProps: (value) => void;
  showPopUp: boolean;
}

export const SubscriptionTypeContainer = (
  props: SubscriptionTypeContainerProps,
) => {
  const {token, id, showPopUp, setPopUpProps, disabled, setDisabled} = props;
  const {subscriptionTypes} = useFetchSubscriptionTypes();
  const {seasonSubscriptionTypes, setSeasonSubscriptionTypes, setReload} =
    useFetchSeasonSubscriptionTypes(id);
  const [edit, setEdit] = useState(false);

  const onSubmitSuccess = async (event) => {
    try {
      const data = await event.json();
      setSeasonSubscriptionTypes(data);
    } catch (error) {
      setReload((prev) => !prev);
    } finally {
      setDisabled(false);
      setEdit(false);
      setPopUpProps((prev) => ({
        ...prev,
        title: 'Save Success',
        message: 'Subscription type updates successfully saved',
        dataTestId: 'subscription-type-save-success',
        success: true,
        showSecondary: false,
        showClose: false,
      }));
    }
  };

  const onSubmitError = async (event) => {
    const message = event.json
      ? (await event.json).error
      : 'Error saving updates';
    setPopUpProps((prev) => ({
      ...prev,
      title: 'Save Failed',
      message,
      dataTestId: 'subscription-type-save-failure',
      success: false,
      showSecondary: false,
      showClose: false,
    }));
  };

  if (!subscriptionTypes || !seasonSubscriptionTypes) return null;

  return (
    <section className='rounded-xl p-7 bg-white text-lg mt-5 shadow-xl'>
      {edit ? (
        <SubscriptionTypeUpdateTable
          options={subscriptionTypes.map(({id, previewonly, ...rest}) => ({
            ...rest,
            subscriptiontypeid_fk: id,
          }))}
          seasonSubscriptionTypes={seasonSubscriptionTypes.map(
            ({subscriptionssold, deletedat, ...rest}) => ({...rest}),
          )}
          showPopUp={showPopUp}
          onSubmit={createSubmitFunction(
            'PUT',
            `${process.env.REACT_APP_API_2_URL}/subscription-types/season/${id}`,
            token,
            onSubmitSuccess,
            onSubmitError,
          )}
          setEdit={() => {
            setEdit(false);
            setDisabled(false);
          }}
        />
      ) : (
        <SeasonSubscriptionTypeView
          seasonSubscriptionTypes={seasonSubscriptionTypes}
          sticky={showPopUp}
          subscriptionTypes={subscriptionTypes.map(
            ({id, previewonly, ...rest}) => ({
              ...rest,
              subscriptiontypeid_fk: id,
            }),
          )}
          setEdit={() => {
            setEdit(true);
            setDisabled(true);
          }}
          disabled={disabled}
        />
      )}
    </section>
  );
};
