/* eslint-disable max-len */
import {Showing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import {Field, FieldArray, Formik} from 'formik';
import {InputControl} from './InputControl';
import {toDateStringFormat} from '../../Events/showingInputContainer';
import {TicketTypeUpdateTable} from './TicketTypeUpdateTable';
import {FormDeleteButton} from './FormDeleteButton';
import {FormSubmitButton} from './FormSubmitButton';
import {eventInstanceSchema} from './event.schemas';
import {useEvent} from './EventProvider';
import {getTicketTypeArray} from './ShowingUtils';
import {Button} from '@mui/material';

interface EventShowingFormProps {
  initialValues?: Showing;
  onSubmit: (event, action) => void;
  onDelete?: () => void;
  onLeaveEdit?: ()=>void;
}

export const EventShowingForm = (props: EventShowingFormProps) => {
  const {initialValues, onSubmit, onDelete, onLeaveEdit} = props;
  const {eventID} = useEvent();


  const baseValues = {
    availableseats: initialValues?initialValues.availableseats:0,
    eventdate: initialValues?toDateStringFormat(initialValues.eventdate):'',
    eventid_fk: initialValues?initialValues.eventid_fk:eventID,
    eventinstanceid: initialValues?initialValues.eventinstanceid:0,
    eventtime: initialValues?initialValues.eventtime.slice(0, 8):'',
    ispreview: false,
    defaulttickettype: 1,
    purchaseuri: 'http://null.com',
    instanceTicketTypes: initialValues?
      getTicketTypeArray(initialValues.ticketTypeId,
          initialValues.seatsForType):
      [],
    salestatus: true,
    totalseats: initialValues?initialValues.totalseats:0,
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
        <form
          onSubmit={handleSubmit}
          className={'bg-blue-100 rounded-xl p-2'}
        >
          <div className={'bg-blue-700 grid grid-cols-12 p-4 rounded-lg h-[500px] min-[1350px]:h-[250px] gap-2'}>
            <div className={'col-span-12 min-[1350px]:col-span-4 rounded-lg p-2 w-[100%] bg-blue-200'}>
              <div className={'flex flex-col justify-center bg-white m-auto rounded-lg p-3 w-[100%] h-[100%]'}>
                {
              values.eventinstanceid?
            <div className={'grid grid-cols-2 pb-1 text-sm'}>
              <p className={'text-md font-bold'}>Showing Id</p>
              <p className={'text-md p-1'}>
                {values.eventinstanceid}
              </p>
            </div>:
                null
                }
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
                    {values.eventinstanceid?values.availableseats:values.totalseats}
                  </p>
                </div>
              </div>
            </div>
            <FieldArray
              name={'instanceTicketTypes'}
              render={(arrayHelpers) =>{
                return (
                  <TicketTypeUpdateTable
                    arrayHelpers={arrayHelpers}
                    eventInstanceID={values.eventinstanceid}
                  />
                );
              }}/>
            <div className={'grid content-center grid-cols-3 min-[1350px]:grid-cols-1 gap-3 mx-auto col-span-12 min-[1350px]:col-span-1'}>
              <FormSubmitButton />
              {
                onDelete?
                  <FormDeleteButton onDelete={onDelete} />:
                  null
              }
              {
                onLeaveEdit?
                  <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={onLeaveEdit}
                  >
                    Return
                  </Button>:
                  null
              }
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};


