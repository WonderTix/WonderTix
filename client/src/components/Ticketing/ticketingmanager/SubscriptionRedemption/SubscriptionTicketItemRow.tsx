import React from 'react';
import {Field, FormikErrors, useFormikContext} from 'formik';
import {OptionRowProps} from '../Event/components/OptionUpdateTable';
import {OptionSelect} from '../Event/components/OptionSelect';
import {FormButton} from '../Event/components/FormButton';
import {TrashCanIcon} from '../../Icons';
import {Event} from './SubscriptionRedemptionUtils';
import {getDate} from '../Event/components/ShowingUtils';
import format from 'date-fns/format';
import {SubscriptionRedemptionFormRow} from './SubscriptionTicketItemUpdateTable';

const getHandleEventChangeAdmin =
  (
    options: Event[],
    setOptions: (value) => void,
    parentFieldName: string,
    setFieldValue: (
      name: string,
      value: any,
    ) => Promise<void | FormikErrors<unknown>>,
    currentValue: SubscriptionRedemptionFormRow,
  ) =>
  async (inputEvent) => {
    const newEventId = +inputEvent.target.value;
    setOptions(
      options.map((option) =>
        option.eventid !== currentValue.eventid
          ? option
          :{
              ...option,
              eventinstances:
                currentValue.eventinstanceid === -1
                  ? option.eventinstances
                  : option.eventinstances.map((instance) =>
                      instance.eventinstanceid !== currentValue.eventinstanceid
                        ? instance
                        : {
                            ...instance,
                            availableseats: instance.availableseats + 1,
                            ticketrestrictions:
                              currentValue.ticketrestrictionid === -1
                                ? instance.ticketrestrictions
                                : instance.ticketrestrictions.map((res) =>
                                    res.ticketrestrictionsid !==
                                    currentValue.ticketrestrictionid
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

    await setFieldValue(parentFieldName, {
      eventid: newEventId,
      eventinstanceid: -1,
      ticketrestrictionid: -1,
    });
  };

const getHandleEventInstanceChange =
  (
    options: Event[],
    setOptions: (value) => void,
    parentFieldName: string,
    setFieldValue: (
      name: string,
      value: any,
    ) => Promise<void | FormikErrors<unknown>>,
    currentValue: SubscriptionRedemptionFormRow,
  ) =>
  async (event) => {
    const newEventInstanceId = +event.target.value;
    setOptions(
      options.map((option) =>
        option.eventid !== currentValue.eventid
          ? option
          : {
              ...option,
              eventinstances: option.eventinstances.map((instance) =>
                instance.eventinstanceid === currentValue.eventinstanceid
                  ? {
                      ...instance,
                      availableseats: instance.availableseats + 1,
                      ticketrestrictions:
                        currentValue.ticketrestrictionid === -1
                          ? instance.ticketrestrictions
                          : instance.ticketrestrictions.map((res) =>
                              res.ticketrestrictionsid !==
                              currentValue.ticketrestrictionid
                                ? res
                                : {
                                    ...res,
                                    availabletickets: res.availabletickets + 1,
                                  },
                            ),
                    }
                  : instance.eventinstanceid === newEventInstanceId
                  ? {
                      ...instance,
                      availableseats: instance.availableseats - 1,
                    }
                  : instance,
              ),
            },
      ),
    );

    await setFieldValue(parentFieldName, {
      eventid: currentValue.eventid,
      eventinstanceid: newEventInstanceId,
      ticketrestrictionid: -1,
    });
  };

const getHandleTicketRestrictionChange =
  (
    options: Event[],
    setOptions: (value) => void,
    parentFieldName: string,
    setFieldValue: (
      name: string,
      value: any,
    ) => Promise<void | FormikErrors<unknown>>,
    currentValue: SubscriptionRedemptionFormRow,
  ) =>
  async (event) => {
    const newTicketRestrictionId = +event.target.value;
    setOptions(
      options.map((option) =>
        option.eventid !== currentValue.eventid
          ? option
          : {
              ...option,
              eventinstances: option.eventinstances.map((instance) =>
                instance.eventinstanceid !== currentValue.eventinstanceid
                  ? instance
                  : {
                      ...instance,
                      ticketrestrictions: instance.ticketrestrictions.map(
                        (res) => ({
                          ...res,
                          availabletickets:
                            res.ticketrestrictionsid ===
                            currentValue.ticketrestrictionid
                              ? res.availabletickets + 1
                              : res.ticketrestrictionsid ===
                                newTicketRestrictionId
                              ? res.availabletickets - 1
                              : res.availabletickets,
                        }),
                      ),
                    },
              ),
            },
      ),
    );
    await setFieldValue(parentFieldName, {
      ...currentValue,
      ticketrestrictionid: newTicketRestrictionId,
    });
  };

export const getSubscriptionTicketItemRow = (eventRestriction: boolean, currentEvents: Set<number>) => {
  // eslint-disable-next-line react/display-name
  return (props: OptionRowProps) => {
    const {options, setOptions, removeOption, field} = props;
    const {setFieldValue} = useFormikContext();

    const event = options.find(
      (event) => event.eventid === field.value.eventid,
    );

    const eventInstance = event?.eventinstances.find(
      (instance) => instance.eventinstanceid === field.value.eventinstanceid,
    );

    return (
      <tr>
        <td className='p-1'>
          <Field
            name={`${field.name}.eventid`}
            component={OptionSelect}
            handleChange={getHandleEventChangeAdmin(
              options,
              setOptions,
              field.name,
              setFieldValue,
              field.value,
            )}
            options={options
              .filter(
                ({eventinstances, ...option}) =>
                  option.eventid === field.value.eventid ||
                  eventinstances.some(
                    (instance) =>
                      instance.availableseats &&
                      instance.ticketrestrictions.some(
                        (res) => res.availabletickets,
                      ) &&
                      (!eventRestriction || !currentEvents.has(option.eventid)),
                  ),
              )
              .map((option) => ({
                id: option.eventid,
                description: option.eventname,
              }))
              .concat({id: -1, description: 'Select Event'})}
          />
        </td>
        <td className='p-1'>
          <Field
            name={`${field.name}.eventinstanceid`}
            component={OptionSelect}
            disabled={field.value.eventid === -1}
            handleChange={getHandleEventInstanceChange(
              options,
              setOptions,
              field.name,
              setFieldValue,
              field.value,
            )}
            options={[{id: -1, description: 'Select Showing'}].concat(
              event?.eventinstances
                .filter(
                  (instance) =>
                    instance.eventinstanceid === field.value.eventinstanceid ||
                    (instance.availableseats > 0 &&
                      instance.ticketrestrictions.some(
                        (res) => res.availabletickets,
                      )),
                )
                .map((instance) => ({
                  id: instance.eventinstanceid,
                  description: `${format(
                    getDate(instance.eventdate, instance.eventtime),
                    'MM/dd/yyyy hh:mm aa',
                  )} ${instance.ispreview? '(preview)': ''}`,
                })) ?? [],
            )}
          />
        </td>
        <td className='p-1'>
          <Field
            name={`${field.name}.ticketrestrictionid`}
            component={OptionSelect}
            disabled={field.value.eventinstanceid === -1}
            handleChange={getHandleTicketRestrictionChange(
              options,
              setOptions,
              field.name,
              setFieldValue,
              field.value,
            )}
            options={[{id: -1, description: 'Select Ticket Type'}].concat(
              eventInstance?.ticketrestrictions
                .filter(
                  (res) =>
                    res.availabletickets > 0 ||
                    res.ticketrestrictionsid ===
                      field.value.ticketrestrictionid,
                )
                .map((res) => ({
                  id: res.ticketrestrictionsid,
                  description: res.description,
                })) ?? [],
            )}
          />
        </td>
        <td>
          <FormButton
            testID='remove-subscription-row-button'
            title='remove row'
            className='flex justify-center'
            disabled={false}
            onClick={() => removeOption()}
          >
            <TrashCanIcon className='h-4 w-4' />
          </FormButton>
        </td>
      </tr>
    );
  };
};
