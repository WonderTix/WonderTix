import React, {useState} from 'react';
import {Field, Formik} from 'formik';
import {InputControl} from './InputControl';
import {eventGeneralSchema} from './event.schemas';
import {FormDeleteButton} from './FormDeleteButton';
import {FormSubmitButton} from './FormSubmitButton';
import {useEvent} from './EventProvider';
import {EventImage} from '../../../../../utils/imageURLValidation';
import {useFetchSeasons} from './ShowingUtils';

interface EventGeneralFormProps {
  onSubmit: (event, actions) => void;
  onDelete: (event) => void;
  onLeaveEdit?: () => void;
}

export const EventGeneralForm = (props: EventGeneralFormProps) => {
  const {onSubmit, onDelete, onLeaveEdit} = props;
  const {eventData, showPopUp, token} = useEvent();
  const {seasons} = useFetchSeasons(token);
  const [disabledURL, setDisabledURL] = useState(
    eventData?.imageurl === 'Default Event Image',
  );

  const baseValues = {
    eventname: eventData ? eventData.eventname : '',
    eventid: eventData ? eventData.eventid : 0,
    eventdescription: eventData ? eventData.eventdescription : '',
    imageurl: eventData ? eventData.imageurl : '',
    active: eventData ? eventData.active : true,
    seasonid_fk: eventData ? eventData.seasonid_fk : 7,
  };

  return (
    <Formik
      initialValues={baseValues}
      onSubmit={onSubmit}
      validationSchema={eventGeneralSchema}
    >
      {({handleSubmit, values, setFieldValue}) => (
        <form className={'bg-white flex flex-col  p-6 rounded-xl shadow-xl'} onSubmit={handleSubmit}>
          <div className={'grid grid-cols-12 mb-5 gap-2'}>
            <h2 className={'col-span-12 min-[650px]:col-span-6 text-center min-[650px]:text-start text-3xl font-semibold text-zinc-800'}>
              {eventData? 'Edit Event': 'Add Event'}
            </h2>
            <div className={'col-span-12 min-[650px]:col-span-6 flex flex-row gap-4 flex-wrap justify-center min-[650px]:justify-end'}>
              <FormSubmitButton />
              {eventData && (
                <FormDeleteButton
                  onDelete={onDelete}
                  label={`Delete event ${values.eventid}`}
                />
              )}
              {onLeaveEdit && eventData && (
                <button
                  className={
                    'bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold h-fit'
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
          <div className={'grid grid-cols-12'}>
            <div className={'flex flex-col col-span-12 min-[450px]:col-span-6'}>
              <Field
                name='eventname'
                component={InputControl}
                type='text'
                label='Event Name'
                id={0}
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
                id={0}
                className={{
                  labelClass: 'text-sm font-semibold',
                  inputClass:
                  'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400',
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
                  inputClass:
                  'text-sm min-[450px]:text-md w-full rounded-lg p-1 border border-zinc-400 disabled:bg-zinc-200 disabled:text-zinc-200',
                  inputGroupClass: 'flex flex-col',
                  controlClass: 'flex flex-col mb-2 text-zinc-800',
                }}
              />
              <div className={'grid grid-cols-12 mb-2'}>
                <div className={'flex flex-col justify-evenly col-span-6'}>
                  <label
                    htmlFor={'defaultImageUrl'}
                    className={
                      'text-sm text-zinc-800 font-semibold text-center pb-1'
                    }
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
                      await setFieldValue(
                        'imageurl',
                        !disabledURL ? 'Default Event Image' : '',
                      );
                      setDisabledURL(!disabledURL);
                    }}
                  />
                </div>
                <div className={'flex flex-col justify-evenly col-span-6'}>
                  <label
                    htmlFor={'active'}
                    className={
                      'text-sm text-zinc-800 font-semibold text-center pb-1'
                    }
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
                      await setFieldValue('active', !values.active);
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={'seasonSelect'}
                >
                  Season:
                </label>
                <Field
                  component={'select'}
                  name={'seasonid_fk'}
                  id={'seasonSelect'}
                >
                  {
                    seasons?.length > 0 &&
                    seasons.map((season, index) => (
                      <option
                        value={Number(season.seasonid)}
                        key={`${season.seasonid} ${index}`}
                      >
                        {season.name}
                      </option>
                    ))
                  }
                </Field>
              </div>
            </div>
            <div
              className={'col-span-12 min-[450px]:col-span-6'}
            >
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
