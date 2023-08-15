import {Field, useField, useFormikContext} from 'formik';
import React, {useState} from 'react';
import {InputControl} from './InputControl';
import {
  getImageDefault,
  imageOnError,
} from '../../../../../utils/imageURLValidation';

export const ImageInputComponent = () => {
  const [field] = useField('imageurl');
  const [disabledURL, setDisabledURL] =
    useState(field.value === 'Default Event Image');
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
                !disabledURL ? 'Default Event Image' : '');
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
          disabled={field.value === 'Default Event Image'}
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
