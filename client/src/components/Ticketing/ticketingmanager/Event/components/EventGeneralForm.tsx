import React, {useState, useEffect, useCallback} from 'react';
import {Field, Formik, useFormikContext} from 'formik';
import {InputControl} from './InputControl';
import {eventGeneralSchema} from './event.schemas';
import {FormSubmitButton} from './FormSubmitButton';
import {useEvent} from './EventProvider';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {getData} from './ShowingUtils';
import {FormButton} from './FormButton';
import {useDropzone} from 'react-dropzone';
import {BackIcon, SaveIcon} from '../../../Icons';

interface EventGeneralFormProps {
  onSubmit: (event, actions) => void;
  onLeaveEdit?: () => void;
}

const ImageUpload = () => {
  const {setFieldValue} = useFormikContext();

  const onDrop = useCallback(async (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch(
        process.env.REACT_APP_API_2_URL + '/events/image-upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      if (!response.ok) {
        throw response;
      }
      const img = await response.json();
      setFieldValue('imageurl', img.url);
    } catch (error) {
      console.error(error.message);
    }
  }, [setFieldValue]);

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()}></input>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-2">
            <div className="flex flex-col items-center justify-center">
              <p>Drag & Drop File or Click Here to Upload</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventGeneralForm = (props: EventGeneralFormProps) => {
  const {onSubmit, onLeaveEdit} = props;
  const {eventData, showPopUp, token} = useEvent();
  const [seasons, setSeasons] = useState([]);
  const [showButton, setShowButton] = useState(eventData && eventData.imageurl !== 'Default Event Image');

  const handleInputChange = (event) => {
    setShowButton(event.target.value !== 'Default Event Image');
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getData(
      `${process.env.REACT_APP_API_2_URL}/season`,
      setSeasons,
      signal,
      token,
    ).catch(() => console.error('Failed to fetch seasons'));

    return () => controller.abort();
  }, []);

  const baseValues = {
    eventname: eventData ? eventData.eventname : '',
    eventid: eventData ? eventData.eventid : 0,
    eventdescription: eventData ? eventData.eventdescription : '',
    imageurl: eventData && eventData.imageurl !== '' ? eventData.imageurl : 'Default Event Image',
    active: eventData ? eventData.active : false,
    seasonid_fk: eventData?.seasonid_fk ? eventData.seasonid_fk : undefined,
    subscriptioneligible: eventData?.subscriptioneligible ?? true,
  };

  return (
    <Formik
      initialValues={baseValues}
      onSubmit={onSubmit}
      validationSchema={eventGeneralSchema}
    >
      {({handleSubmit, values, setFieldValue, isSubmitting}) => (
        <form
          className={'bg-white flex flex-col  p-6 rounded-xl shadow-xl'}
          onSubmit={handleSubmit}
        >
          <div className={'grid grid-cols-12 mb-5 gap-2'}>
            <h2
              className={
                'col-span-12 min-[650px]:col-span-6 text-center min-[650px]:text-start text-3xl font-semibold text-zinc-800'
              }
            >
              {eventData ? 'Edit Event' : 'Add Event'}
            </h2>
            <div
              className={
                'col-span-12 min-[650px]:col-span-6 flex flex-row gap-2 flex-wrap justify-center min-[650px]:justify-end'
              }
            >
              <FormSubmitButton
                className='flex items-center justify-center bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl h-fit shadow-xl'
                testID='event-save-button'
              >
                <SaveIcon className='h-6 w-6' />
              </FormSubmitButton>
              {onLeaveEdit && eventData && (
                <FormButton
                  title='Back'
                  testID='event-leave-edit'
                  disabled={isSubmitting || showPopUp}
                  onClick={onLeaveEdit}
                  className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold'
                >
                  <BackIcon className='h-6 w-6' />
                </FormButton>
              )}
            </div>
          </div>
          <div className={'grid grid-cols-12'}>
            <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
              <Field
                name='eventname'
                component={InputControl}
                type='text'
                label='Event Name'
                className={{
                  labelClass:
                    'text-sm font-semibold col-span-5 min-[450px]:col-span-12',
                  inputClass:
                    'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400',
                  inputGroupClass: 'col-span-7 min-[450px]:col-span-12',
                  controlClass: 'grid grid-cols-12 text-zinc-800 gap-1 mb-2',
                }}
              />
              <Field
                name='eventdescription'
                component={InputControl}
                type='textarea'
                label='Event Description'
                className={{
                  labelClass: 'text-sm font-semibold',
                  inputClass:
                    'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400',
                  inputGroupClass: 'flex flex-col',
                  controlClass: 'flex flex-col mb-2 text-zinc-800',
                }}
              />
              <div className={'grid grid-cols-5 mb-2 items-end text-zinc-800'}>
                <div className={showButton ? 'col-span-4' : 'col-span-5'}>
                  <Field name='imageurl'>
                    {({field}) => (
                      <div className='flex flex-col text-zinc-800'>
                        <label
                          className='text-sm font-semibold'
                          htmlFor='imageurl'
                        >
                          Image URL:
                        </label>
                        <input
                          type='text'
                          className='text-sm w-full rounded-lg p-1 border border-zinc-400 disabled:bg-zinc-200 disabled:text-zinc-200'
                          {...field}
                          onChange={(event) => {
                            field.onChange(event);
                            handleInputChange(event);
                          }}
                          id='imageurl'
                        />
                      </div>
                    )}
                  </Field>
                  <ImageUpload />
                </div>
                {showButton && (
                  <button
                    id={'defaultImageUrl'}
                    className={
                      'bg-blue-500 hover:bg-blue-700 text-white rounded-lg py-1.5 px-1 ml-2 font-bold text-sm h-fit self-end whitespace-nowrap'
                    }
                    onClick={async () => {
                      await setFieldValue('imageurl', 'Default Event Image');
                      setShowButton(false);
                    }}
                    type='button'
                  >
                    Default
                  </button>
                )}
              </div>

              <div className={'flex flex-col mb-2 text-zinc-800'}>
                <label
                  className={'text-sm font-semibold'}
                  htmlFor={'seasonSelect'}
                >
                  Season:
                </label>
                <Field
                  component={'select'}
                  name={'seasonid_fk'}
                  id={'seasonSelect'}
                  className={
                    'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400 disabled:bg-zinc-200 disabled:text-zinc-200'
                  }
                >
                  <option value={undefined}>None</option>
                  {seasons?.length > 0 &&
                    seasons
                      .sort((a, b) => b.seasonid - a.seasonid)
                      .map((season, index) => (
                        <option
                          value={Number(season.seasonid)}
                          key={`${season.seasonid} ${index}`}
                        >
                          {season.name}
                        </option>
                      ))}
                </Field>
              </div>
              <div className={'grid grid-cols-12 mb-2'}>
                <div
                  className={'flex flex-col justify-evenly col-span-6'}
                ></div>
              </div>
            </div>
            <div className={'col-span-12 min-[450px]:col-span-6'}>
              <EventImage
                className={'mx-auto w-[50%] h-auto max-w-[150px]'}
                src={values.imageurl}
                title='Supplied By User for Event'
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
