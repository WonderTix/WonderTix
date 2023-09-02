import {Showing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import {Field, FieldArray, Formik} from 'formik';
import {InputControl} from './InputControl';
import {toDateStringFormat} from '../../Events/showingInputContainer_deprecated';
import {TicketTypeUpdateTable} from './TicketTypeUpdateTable';
import {FormDeleteButton} from './FormDeleteButton';
import {FormSubmitButton} from './FormSubmitButton';
import {eventInstanceSchema} from './event.schemas';
import {useEvent} from './EventProvider';
import {getTicketTypeArray} from './ShowingUtils';

interface EventShowingFormProps {
  initialValues?: Showing;
  onSubmit: (event, action) => void;
  onDelete?: (event?) => void;
  onLeaveEdit?: () => void;
}

export const EventShowingForm = (props: EventShowingFormProps) => {
  const {initialValues, onSubmit, onDelete, onLeaveEdit} = props;
  const {eventID, showPopUp} = useEvent();

  const baseValues = {
    availableseats: initialValues ? initialValues.availableseats : 0,
    eventdate: initialValues ? toDateStringFormat(initialValues.eventdate) : '',
    eventid_fk: initialValues ? initialValues.eventid_fk : eventID,
    eventinstanceid: initialValues ? initialValues.eventinstanceid : 0,
    eventtime: initialValues ? initialValues.eventtime.slice(0, 8) : '',
    ispreview: false,
    defaulttickettype: 1,
    purchaseuri: 'http://null.com',
    instanceTicketTypes: initialValues
      ? getTicketTypeArray(
        initialValues.ticketTypeId,
        initialValues.seatsForType,
      )
      : [],
    salestatus: true,
    totalseats: initialValues ? initialValues.totalseats : 0,
  };

  const inputControlClassName = {
    labelClass: 'text-sm font-bold',
    inputClass: 'text-sm w-full rounded-lg p-1 border border-zinc-500',
    controlClass: 'grid grid-cols-2 pb-1 text-zinc-800',
  };

  return (
    <Formik
      initialValues={baseValues}
      validationSchema={eventInstanceSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, values}) => (
        <form onSubmit={handleSubmit} className={'bg-gray-300 rounded-xl p-2'}>
          <div
            className={
              'bg-gray-200 grid grid-cols-12 p-4 rounded-lg min-[1350px]:h-[250px] gap-2'
            }
          >
            <div
              className={
                'flex flex-col justify-center bg-white m-auto col-span-12 min-[1350px]:col-span-4 rounded-lg p-3 w-[100%] h-[100%] shadow-xl'
              }
            >
              {values.eventinstanceid > 0 && (
                <div className={'grid grid-cols-2 pb-1 text-sm'}>
                  <p className={'text-md font-bold'}>Showing Id</p>
                  <p className={'text-md p-1'}>{values.eventinstanceid}</p>
                </div>
              )}
              <Field
                name='eventdate'
                component={InputControl}
                label='Event Date'
                type='date'
                id={values.eventinstanceid}
                className={inputControlClassName}
              />
              <Field
                name='eventtime'
                component={InputControl}
                label='Event Time'
                type='time'
                id={values.eventinstanceid}
                className={inputControlClassName}
              />
              <Field
                name='totalseats'
                component={InputControl}
                label='Ticket Quantity'
                type='number'
                id={values.eventinstanceid}
                className={inputControlClassName}
              />
              <div className={'grid grid-cols-2 text-zinc-800'}>
                <p className={'text-sm font-bold'}>Available Seats</p>
                <p className={'text-sm p-1'}>
                  {values.eventinstanceid
                    ? values.availableseats
                    : values.totalseats}
                </p>
              </div>
            </div>
            <FieldArray
              name={'instanceTicketTypes'}
              render={(arrayHelpers) => {
                return (
                  <TicketTypeUpdateTable
                    arrayHelpers={arrayHelpers}
                    eventInstanceID={values.eventinstanceid}
                  />
                );
              }}
            />
            <div
              className={
                'flex flex-row min-[1350px]:grid content-center min-[1350px]:grid-cols-1 gap-3 mx-auto col-span-12 min-[1350px]:col-span-1'
              }
            >
              <FormSubmitButton />
              {onDelete && (
                <FormDeleteButton
                  onDelete={onDelete}
                  label={`Delete Showing ${values.eventinstanceid}`}
                />
              )}
              {onLeaveEdit && (
                <button
                  className={
                    'bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold'
                  }
                  onClick={onLeaveEdit}
                  disabled={showPopUp}
                  type={'button'}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
