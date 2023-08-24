import React, {useState} from 'react';
import {Field, Formik} from 'formik';
import {InputControl} from './InputControl';
import {eventGeneralSchema} from './event.schemas';
import {FormDeleteButton} from './FormDeleteButton';
import {FormSubmitButton} from './FormSubmitButton';
import {useEvent} from './EventProvider';
import {EventImage} from '../../../../../utils/imageURLValidation';

interface EventGeneralFormProps {
 onSubmit: (event, actions) => void;
 onDelete: (event) => void;
 onLeaveEdit?: () => void;
}
export const EventGeneralForm = (props: EventGeneralFormProps) => {
  const {onSubmit, onDelete, onLeaveEdit} = props;
  const {eventData} = useEvent();
  const [disabledURL, setDisabledURL] = useState(eventData?.imageurl === 'Default Event Image');

  const baseValues = {
    eventname: (eventData?eventData.eventname:''),
    eventid: (eventData?eventData.eventid:0),
    eventdescription: (eventData?eventData.eventdescription:''),
    imageurl: (eventData?eventData.imageurl:''),
    active: (eventData?eventData.active:true),
    seasonid_fk: (eventData?eventData.seasonid_fk:7),
  };

  return (
    <Formik
      initialValues={baseValues}
      onSubmit={onSubmit}
      validationSchema={eventGeneralSchema}
    >
      {({handleSubmit, values, setFieldValue}) => (
        <form
          className={'grid grid-cols-12'}
          onSubmit={handleSubmit}
        >
          <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
            <Field
              name='eventname'
              component={InputControl}
              type='text'
              label='Event Name'
              id={0}
              className={{
                labelClass: 'text-sm font-semibold col-span-5 min-[450px]:col-span-12',
                inputClass: 'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400',
                inputGroupClass: 'col-span-7 min-[450px]:col-span-12',
                controlClass: 'grid grid-cols-12 text-zinc-800 gap-1 mb-2',
              }}
            />
            <Field
              name='eventdescription'
              component={InputControl}
              type='textarea'
              label='Event Description'
              id={0}
              className={{
                labelClass: 'text-sm font-semibold',
                inputClass: 'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400',
                inputGroupClass: 'flex flex-col',
                controlClass: 'flex flex-col mb-2 text-zinc-800',
              }}
            />
            <Field
              name={'imageurl'}
              component={InputControl}
              label={'Image URL'}
              type={'text'}
              id={0}
              disabled={values.imageurl === 'Default Event Image'}
              className={{
                labelClass: 'text-sm font-semibold',
                inputClass: 'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400 disabled:bg-zinc-200 disabled:text-zinc-200',
                inputGroupClass: 'flex flex-col',
                controlClass: 'flex flex-col mb-2 text-zinc-800',
              }}
            />
            <div className={'grid grid-cols-12 mb-2'}>
              <div className={'flex flex-col justify-evenly col-span-6'}>
                <label
                  htmlFor={'defaultImageUrl'}
                  className={'text-sm text-zinc-800 font-semibold text-center pb-1'}
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
                    await setFieldValue('imageurl', !disabledURL ? 'Default Event Image' : '');
                    setDisabledURL(!disabledURL);
                  }}
                />
              </div>
              <div className={'flex flex-col justify-evenly col-span-6'}>
                <label
                  htmlFor={'active'}
                  className={'text-sm text-zinc-800 font-semibold text-center pb-1'}
                >
                  Active
                </label>
                <input
                  name={'active'}
                  id={'active'}
                  type='checkbox'
                  value={values.active}
                  checked={values.active}
                  onChange={async () => {
                    void setFieldValue('active', !values.active);
                  }}
                />
              </div>
            </div>
          </div>
          {/* Need to fix image sizing so height does not grow past needs of sibling div */}
          <div className={'grid grid-cols-12 col-span-12 min-[450px]:col-span-6'}>
            <div className={'grid content-center col-span-9 w-[100%] h-[100%]'}>
              <EventImage
                className={'mx-auto w-[50%] h-auto max-w-[200px]'}
                src={values.imageurl}
                title='Supplied By User for Event'
              />
            </div>
            <div className={'grid col-span-3 content-center gap-4'}>
              <FormSubmitButton />
              {eventData?
                <FormDeleteButton onDelete={onDelete} />:
                null}
              {
                onLeaveEdit && eventData?
                  <button
                    className={'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-xl p-2 font-bold'}
                    onClick={onLeaveEdit}
                  >
                    Cancel
                  </button>:
                  null
              }
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};


