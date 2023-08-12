import React, {useState} from 'react';
import {Field, Formik, useField, useFormikContext} from 'formik';
import {InputControl} from './InputControl';
import {getImageDefault, imageOnError}
  from '../../../../../utils/imageURLValidation';
import {eventGeneralSchema} from './event.schemas';
import {Button} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';


export interface EventGeneralProps {
  initialValues?;
}

export const EventGeneralForm = ( props: EventGeneralProps) => {
  const {initialValues} = props;
  const {getAccessTokenSilently} = useAuth0();
  const baseValues = {
    eventname: (initialValues?initialValues.eventname:''),
    eventid: (initialValues?initialValues.eventid:0),
    eventdescription: (initialValues?initialValues.eventdescription:''),
    imageurl: (initialValues?initialValues.imageurl:''),
    active: (initialValues?initialValues.active:true),
  };
  const submitForm = async (event, actions) => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_ROOT_URL,
      scope: 'admin',
    });

    const res = await fetch(process.env.REACT_APP_API_1_URL + `/events/`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    console.log(res);
  };

  return (
    <Formik
      initialValues={baseValues}
      onSubmit={submitForm}
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
          <Button
            variant={'contained'}
            size={'small'}
            type={'submit'}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
};


const ImageInputComponent = () => {
  const [field] = useField('imageurl');
  const [disabledURL, setDisabledURL] = useState(false);
  const {setFieldValue} = useFormikContext();
  return (
    <div className={'flex flex-row'}>
      <div className={'flex flex-col justify-evenly'}>
        <div className={'flex flex-col'}>
          <label
            htmlFor={'defaultImageUrl'}
            className={'text-sm text-zinc-600 text-center'}
          >
            Use Default Image
          </label>
          <input
            name={'defaultImageUrl'}
            id={'defaultImageUrl'}
            type='checkbox'
            value={'default'}
            checked={disabledURL}
            onChange={async () => {
              await setFieldValue('imageurl',
                !disabledURL?'Default Event Image':'');
              setDisabledURL(!disabledURL);
            }}
            className={'m-auto'}
          />
        </div>
        <Field
          name={'imageurl'}
          component={InputControl}
          label={'Image URL'}
          type={'text'}
          id={0}
          disabled={field.value==='Default Event Image'}
        />
      </div>
      <div>
        <img
          className={'w-[50%] h-auto'}
          src={getImageDefault(field.value)}
          onError={imageOnError}
          alt='Event image supplied by the user'
        />
      </div>
    </div>
  );
};
