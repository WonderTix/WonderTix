import React from 'react';
import {Field, Formik} from 'formik';
import {InputControl} from './InputControl';
import {eventGeneralSchema} from './event.schemas';
import {FormDeleteButton} from './FormDeleteButton';
import {ImageInputComponent} from './ImageInputComponent';
import {FormSubmitButton} from './FormSubmitButton';
import {useEvent} from './EventProvider';


export const EventGeneralForm = (props: {onSubmit, onDelete}) => {
  const {onSubmit, onDelete} = props;
  const {eventData} = useEvent();
  const baseValues = {
    eventname: (eventData?eventData.eventname:''),
    eventid: (eventData?eventData.eventid:0),
    eventdescription: (eventData?eventData.eventdescription:''),
    imageurl: (eventData?eventData.imageurl:''),
    active: (eventData?eventData.active:true),
    seasonid_fk: (eventData?eventData.seasonid:7),
  };


  return (
    <Formik
      initialValues={baseValues}
      onSubmit={onSubmit}
      validationSchema={eventGeneralSchema}>
      {({handleSubmit}) => (
        <form
          className={'flex flex-row justify-between'}
          onSubmit={handleSubmit}
        >
          <div className={'flex flex-col justify-evenly'}>
            <Field
              name='eventname'
              component={InputControl}
              type='text'
              label='Event Name'
              id={0}
            />
            <Field
              name='eventdescription'
              component={InputControl}
              type='text'
              label='Event Description'
              id={0}
            />
          </div>
          <div>
            <ImageInputComponent />
          </div>
          <FormSubmitButton />
          {eventData? <FormDeleteButton onDelete={onDelete} />:null}
        </form>
      )}
    </Formik>
  );
};


