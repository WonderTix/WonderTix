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

interface EventShowingFormProps {
  initialValues?: Showing;
  onSubmit: (event, action) => void;
  onDelete?: () => void;
}

export const EventShowingForm = (props: EventShowingFormProps) => {
  const {initialValues, onSubmit, onDelete} = props;
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

  return (
    <Formik
      initialValues={baseValues}
      validationSchema={eventInstanceSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, values}) => (
        <form onSubmit={handleSubmit}>
          <div className={'grid grid-cols-8'}>
            <div className={'col-span-2 flex flex-col justify-between'}>
              <div>
                {values.eventinstanceid === 0 ?
                    null :
                    <h2>Showing ID: {values.eventinstanceid}</h2>
                }
              </div>
              <Field
                name='eventdate'
                component={InputControl}
                label='Event Date'
                type='date'
                id={values.eventinstanceid}
              />
              <Field
                name='eventtime'
                component={InputControl}
                label='Event Time'
                type='time'
                id={values.eventinstanceid}
              />
              <Field
                name='totalseats'
                component={InputControl}
                label='Ticket Quantity'
                type='number'
                id={values.eventinstanceid}
              />
              <div>
                <h3>
                    Available Seats:{
                    values.eventinstanceid === 0 ?
                      values.totalseats :
                      values.availableseats
                  }
                </h3>
              </div>
            </div>
            <div className={'col-span-5'}>
              <FieldArray
                name={'instanceTicketTypes'}
                render={(arrayHelpers) => (
                  <TicketTypeUpdateTable
                    arrayHelpers={arrayHelpers}
                    eventInstanceID={values.eventinstanceid}
                  />
                )
                }/>
            </div>
            <div className={'col-span-1 flex flex-col justify-evenly p-3'}>
              <FormSubmitButton />
              {
                onDelete?
                  <FormDeleteButton onDelete={onDelete} />:
                  null
              }
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};


