import React, {useEffect, useRef, useState} from 'react';
import {FormikProps, FormikValues} from 'formik';
import {Switch, Tooltip} from '@mui/material';
import {SubscriptionTicketItemUpdateTable} from './SubscriptionTicketItemUpdateTable';
import {
  Subscription,
  useIsMounted,
  useTimeout,
} from './SubscriptionRedemptionUtils';
import {FormButton} from '../Event/components/FormButton';
import {createSubmitFunction} from '../Event/components/ShowingUtils';
import {HelpIcon, LoadingIcon, SaveIcon, TicketIcon, XIcon} from '../../Icons';
import Label from '../../Label';

interface SubscriptionContainerProps {
  setSubscriptions: (value) => void;
  setReload: (value) => void;
  subscription: Subscription;
  token: string;
  setDisabled: (value) => void;
  disabled: boolean;
  showPopUp: boolean;
  setPopUpProps: any;
}

export const SubscriptionRedemptionContainer = (
  props: SubscriptionContainerProps,
) => {
  const {
    subscription,
    setSubscriptions,
    setDisabled,
    disabled,
    token,
    setReload,
    showPopUp,
    setPopUpProps,
  } = props;
  const [formStatus, setFormStatus] = useState<
    'loading' | 'redeeming' | 'nothing'
  >('nothing');
  const [submittingStatus, setSubmittingStatus] = useState<
    'invalid' | 'submitting' | 'nothing'
  >('nothing');
  const [eventRestriction, setEventRestriction] = useState(true);
  const [eventRestrictionIsViolated, setEventRestrictionIsViolated] =
    useState(false);
  const [delay, setDelay] = useState(null);
  const formRef = useRef<FormikProps<FormikValues>>(null);
  const stateRef = useRef(formStatus);
  const isMounted = useIsMounted();
  stateRef.current = formStatus;

  useTimeout(() => {
    setDelay(null);
    if (stateRef.current !== 'loading') return;
    setFormStatus('nothing');
    setDisabled(false);
    setPopUpProps(
      'Failed to Load Subscription',
      'Error loading subscription please try again',
      false,
      'subscription-loading-error-pop-up',
    );
  }, delay);

  const onSubmitSuccess = async (event) => {
    try {
      const data = await event.json();
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === data.id ? data : sub)),
      );
    } catch (error) {
      setReload((prev) => !prev);
    } finally {
      if (isMounted()) setFormStatus('nothing');
      setDisabled(false);
      setPopUpProps(
        'Save Success',
        'Successfully updated subscription redemption',
        true,
        `subscription-redemption-${subscription.id}-success`,
      );
    }
  };

  const onSubmitError = async (event) => {
    setPopUpProps(
      'Save Failure',
      event.json
        ? (await event.json()).error
        : 'Error updating subscription redemption',
      false,
      `subscription-redemption-${subscription.id}-failure`,
    );
    setFormStatus('nothing');
    setDisabled(false);
  };

  return (
    <article className='bg-white rounded-xl p-4 shadow-xl w-[100%] min-[1440px]:w-[80%]'>
      <header className='text-zinc-800 text-center flex flex-col min-[768px]:flex-row min-[768px]:justify-between'>
        <h2 className='flex flex-col mb-2 min-[768px]:mb-0'>
          <span className='flex flex-col min-[375px]:flex-row max-[767px]:justify-center'>
            <span>
              {subscription.firstname} {subscription.lastname}
            </span>
            <span className='max-[374px]:hidden px-1'>-</span>
            <span className='italic'>{subscription.email}</span>
          </span>
          <span className='flex flex-col min-[375px]:flex-row max-[767px]:justify-center'>
            <span>{subscription.name} Subscription</span>
            <span className='max-[374px]:hidden px-1'>-</span>
            <span className='italic'>{subscription.seasonName}</span>
          </span>
          <Label
            color={
              subscription.ticketsredeemed >= subscription.ticketlimit
                ? 'green'
                : 'slate'
            }
            className='flex justify-center mt-1 max-[767px]:mx-auto'
          >
            {subscription.ticketsredeemed >= subscription.ticketlimit
              ? 'FULLY REDEEMED'
              : `${subscription.ticketsredeemed} of ${
                  subscription.ticketlimit
                } Ticket${subscription.ticketlimit > 1 ? 's' : ''} Redeemed`}
          </Label>
        </h2>
        <div className='flex flex-row justify-center items-center min-[768px]:justify-end gap-2'>
          {formStatus === 'redeeming'
            ? [
                <div
                  key={0}
                  className='flex flex-col items-center min-[1300px]:flex-row pr-1'
                >
                  <Tooltip
                    title='Turn off to allow for redemption of multiple tickets to the same event'
                    placement='top'
                    arrow
                  >
                    <label
                      htmlFor='event-restriction-switch'
                      className='text-zinc-800 flex flex-row items-center justify-center gap-1'
                    >
                      Event Restriction
                      <HelpIcon className='h-4 w-4' strokeWidth={2} />
                    </label>
                  </Tooltip>
                  <Switch
                    id='event-restriction-switch'
                    color='primary'
                    size='medium'
                    checked={eventRestriction && !eventRestrictionIsViolated}
                    onClick={() => setEventRestriction(!eventRestriction)}
                    disabled={eventRestrictionIsViolated}
                  />
                </div>,
                <FormButton
                  key={1}
                  disabled={submittingStatus === 'submitting'}
                  testID='cancel-subscription-redemption-button'
                  title='cancel'
                  className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
                  onClick={() => {
                    setDisabled(false);
                    setFormStatus('nothing');
                  }}
                >
                  <XIcon className='h-7 w-7' />
                </FormButton>,
                <FormButton
                  key={2}
                  disabled={submittingStatus !== 'nothing'}
                  testID='save-subscription-redemption-button'
                  title='save'
                  className='bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
                  onClick={() => {
                    if (formRef.current) formRef.current.handleSubmit();
                  }}
                >
                  <SaveIcon className='w-7 h-7' />
                </FormButton>,
              ]
            : [
                <FormButton
                  key={3}
                  disabled={disabled}
                  testID='redeem-subscription-button'
                  title='redeem'
                  className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
                  onClick={() => {
                    setDisabled(true);
                    setFormStatus('loading');
                    setDelay(5000);
                  }}
                >
                  {formStatus !== 'loading' ? (
                    <TicketIcon className='w-7 h-7' />
                  ) : (
                    <LoadingIcon className='animate-spin h-7 w-7' />
                  )}
                </FormButton>,
              ]}
        </div>
      </header>
      <div
        className={`${
          formStatus === 'redeeming'
            ? 'max-h-[400px] overflow-scroll'
            : 'max-h-0 overflow-hidden'
        } transition-all ease-in-out duration-1000`}
      >
        {formStatus !== 'nothing' && (
          <SubscriptionTicketItemUpdateTable
            subscriptionId={subscription.id}
            token={token}
            eventRestriction={eventRestriction && !eventRestrictionIsViolated}
            setViolatesRestriction={setEventRestrictionIsViolated}
            setSubmitting={(isSubmitting, isValid, isValidating) => {
              if (isSubmitting) {
                setSubmittingStatus('submitting');
              } else if (!isValid || isValidating) {
                setSubmittingStatus('invalid');
              } else {
                setSubmittingStatus('nothing');
              }
            }}
            setStatus={() => setFormStatus('redeeming')}
            onSubmit={createSubmitFunction(
              'PUT',
              `${process.env.REACT_APP_API_2_URL}/subscription-types/subscriptions/redemption/${subscription.id}`,
              token,
              onSubmitSuccess,
              onSubmitError,
            )}
            formRef={formRef}
            showPopUp={showPopUp}
          />
        )}
      </div>
    </article>
  );
};
