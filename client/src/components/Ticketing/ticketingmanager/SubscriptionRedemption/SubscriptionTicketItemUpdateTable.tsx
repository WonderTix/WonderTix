import React, {MutableRefObject, useEffect} from 'react';
import {FieldArray, Formik, FormikProps, FormikValues} from 'formik';
import {getSubscriptionTicketItemRow} from './SubscriptionTicketItemRow';
import {useFetchSubscription} from './SubscriptionRedemptionUtils';
import {subscriptionTicketItemSchema} from './subscription.schemas';
import {OptionUpdateTable} from '../Event/components/OptionUpdateTable';

export interface SubscriptionRedemptionFormRow {
  eventid: number;
  eventinstanceid: number;
  ticketrestrictionid: number;
}

const removeRow = (
  row: SubscriptionRedemptionFormRow,
  setOptions: (value) => void,
) => {
  const {eventid, ticketrestrictionid, eventinstanceid} = row;

  if (eventid === -1) return;

  setOptions((options) =>
    options.map((option) =>
      option.eventid !== eventid
        ? option
        : {
            ...option,
            eventinstances:
              eventinstanceid === -1
                ? option.eventinstances
                : option.eventinstances.map((instance) =>
                    instance.eventinstanceid !== eventinstanceid
                      ? instance
                      : {
                          ...instance,
                          availableseats: instance.availableseats + 1,
                          ticketrestrictions:
                            ticketrestrictionid === -1
                              ? instance.ticketrestrictions
                              : instance.ticketrestrictions.map((res) =>
                                  res.ticketrestrictionsid !==
                                  ticketrestrictionid
                                    ? res
                                    : {
                                        ...res,
                                        availabletickets:
                                          res.availabletickets + 1,
                                      },
                                ),
                        },
                  ),
          },
    ),
  );
};

interface SubscriptionTicketItemUpdateTableProps {
  subscriptionId: number;
  token: string;
  eventRestriction: boolean;
  setViolatesRestriction: (status: boolean) => void;
  onSubmit: (event, actions?) => Promise<void>;
  formRef: MutableRefObject<FormikProps<FormikValues>>;
  showPopUp: boolean;
  setSubmitting: (
    isSubmitting: boolean,
    isValid: boolean,
    isValidating: boolean,
  ) => void;
  setStatus: () => void;
}

export const SubscriptionTicketItemUpdateTable = (
  props: SubscriptionTicketItemUpdateTableProps,
) => {
  const {
    token,
    subscriptionId,
    eventRestriction,
    formRef,
    showPopUp,
    onSubmit,
    setSubmitting,
    setViolatesRestriction,
    setStatus,
  } = props;
  const {events, subscription} = useFetchSubscription(subscriptionId, token);

  useEffect(() => {
    setStatus();
  }, [subscription]);

  if (!events.length || !subscription) return null;

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        subscriptionticketitems: subscription.subscriptionticketitems ?? [],
      }}
      validationSchema={subscriptionTicketItemSchema}
      innerRef={formRef}
    >
      {({values, handleSubmit, isSubmitting, isValid, isValidating}) => {
        const currentEvents = new Set<number>(
          values.subscriptionticketitems.map((item) => item.eventid),
        );

        useEffect(() => {
          setSubmitting(isSubmitting, isValid, isValidating);
          setViolatesRestriction(
            currentEvents.size < values.subscriptionticketitems.length,
          );
        }, [values, isValid, isValidating, isSubmitting]);

        return (
          <form className='mt-2 ' onSubmit={handleSubmit}>
            <FieldArray name='subscriptionticketitems'>
              {(arrayHelpers) => (
                <div className='overflow-scroll mx-auto rounded-xl border border-zinc-300 bg-white w-[100%] min-h-[100px]'>
                  <OptionUpdateTable
                    addRow={() => {
                      arrayHelpers.insert(0, {
                        eventid: -1,
                        eventinstanceid: -1,
                        ticketrestrictionid: -1,
                      });
                    }}
                    removeRow={(index, setOptions) => {
                      removeRow(arrayHelpers.remove(index), setOptions);
                    }}
                    disabled={(options) =>
                      values.subscriptionticketitems.length >=
                        subscription.ticketlimit ||
                      currentEvents.has(-1) ||
                      !options.some((option) =>
                        eventRestriction && currentEvents.has(option.eventid)
                          ? false
                          : option.eventinstances.some(
                              (instance) =>
                                instance.availableseats > 0 &&
                                instance.ticketrestrictions.some(
                                  (res) => res.availabletickets > 0,
                                ),
                            ),
                      )
                    }
                    optionsInit={() =>
                      events.map((event) => ({...event}))
                    }
                    fieldName='subscriptionticketitems'
                    rowComponent={getSubscriptionTicketItemRow(
                      eventRestriction,
                      currentEvents,
                    )}
                    headings={['Event', 'Showing', 'Ticket Type']}
                    sticky={showPopUp}
                    styles={{
                      headerItem:
                        'px-2 border-r border-zinc-300 last:border-r-0 last:justify-center',
                      headerRow:
                        'bg-blue-500 border-b border-zinc-300 rounded-xl text-white whitespace-nowrap',
                      tableBody: 'text-zinc-700 p-1',
                    }}
                  />
                </div>
              )}
            </FieldArray>
          </form>
        );
      }}
    </Formik>
  );
};
