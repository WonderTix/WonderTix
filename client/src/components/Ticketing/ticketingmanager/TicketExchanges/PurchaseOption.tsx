import React, {useRef, useState} from 'react';
import {ChevronDown, ChevronUp, PlusIcon} from '../../Icons';
import {FormButton} from '../Event/components/FormButton';
import {FormikProps, FormikValues} from 'formik';

interface PurchaseOptionProps {
  title: string;
  subTitle?: string;
  image?: React.ReactNode;
  Form: (props: {
    open: boolean;
    formRef: React.MutableRefObject<FormikProps<FormikValues>>;
    setDisabled: (value: any) => void;
  }) => JSX.Element;
  id: number;
}

const PurchaseOption: React.FC<PurchaseOptionProps> = (props) => {
  const {title, subTitle, image, Form, id} = props;
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const ref = useRef<FormikProps<FormikValues>>(null);

  return (
    <li className='bg-white rounded-xl px-4 py-3 shadow-xl w-full'>
      <header className='flex flex-col items-center tab:flex-row gap-2 text-zinc-800'>
        {image}
        <h3 className='flex flex-col justify-center text-lg font-semibold text-center tab:text-start'>
          {title}
          {subTitle && (
            <span className='italic text-base font-normal'>{subTitle}</span>
          )}
        </h3>
        <div className='flex items-center justify-center tab:justify-end flex-grow gap-1'>
          <FormButton
            onClick={() => ref.current?.submitForm()}
            title={disabled? undefined:'Add to cart'}
            disabled={disabled}
            className={`${!open && 'hidden'} p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-xl text-white shadow-xl`}
            testID={`add-to-cart-${id}`}
          >
            <PlusIcon className='h-7 w-7' />
          </FormButton>
          <FormButton
            key={3}
            disabled={false}
            testID='open-accordian'
            className='bg-blue-500 hover:bg-blue-600 rounded-xl shadow-xl p-2 text-white'
            onClick={() => {
              setOpen(!open);
              ref.current?.resetForm?.();
            }}
          >
            {open ? (
              <ChevronUp className='h-7 w-7' />
            ) : (
              <ChevronDown className='h-7 w-7' />
            )}
          </FormButton>
        </div>
      </header>
      <Form open={open} formRef={ref} setDisabled={setDisabled}/>
    </li>
  );
};

export default PurchaseOption;
