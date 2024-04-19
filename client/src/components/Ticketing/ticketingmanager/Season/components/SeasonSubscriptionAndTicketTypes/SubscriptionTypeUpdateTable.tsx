import React from 'react';
import {OptionUpdateTable} from '../../../Event/components/OptionUpdateTable';
import {FieldArray, Formik} from 'formik';
import {FormSubmitButton} from '../../../Event/components/FormSubmitButton';
import {SeasonSubscriptionTypeRow} from './SeasonSubscriptionTypeRow';
import {subscriptionTypesSchema} from './season.schemas';
import {FormButton} from '../../../Event/components/FormButton';
import {SaveIcon, XIcon} from '../../../../Icons';

interface SeasonSubscriptionTypeUpdateTableProps {
  options: any[];
  seasonSubscriptionTypes: any[];
  showPopUp: boolean;
  onSubmit: (event, actions) => Promise<void>;
  setEdit: () => void;
}

export const SubscriptionTypeUpdateTable = (
  props: SeasonSubscriptionTypeUpdateTableProps,
) => {
  const {options, seasonSubscriptionTypes, onSubmit, setEdit, showPopUp} =
    props;

  return (
    <Formik
      initialValues={{
        subscriptionTypes: seasonSubscriptionTypes,
      }}
      onSubmit={onSubmit}
      validationSchema={subscriptionTypesSchema}
    >
      {({handleSubmit, isSubmitting}) => (
        <form onSubmit={handleSubmit}>
          <header className='flex flex-row justify-between mb-3'>
            <h2 className='text-2xl text-zinc-800 font-semibold'>
              Subscription Types
            </h2>
            <div className='flex flex-row gap-2'>
              <FormSubmitButton
                disabled={showPopUp}
                className='bg-green-500 hover:bg-green-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
                testID='season-subscription-type-save-button'
              >
                <SaveIcon className='w-6 h-6' />
              </FormSubmitButton>
              <FormButton
                onClick={setEdit}
                title='Cancel'
                disabled={isSubmitting}
                className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
                testID='leave-edit-season-subscription-type-table'
              >
                <XIcon className='h-6 w-6' />
              </FormButton>
            </div>
          </header>
          <FieldArray name='subscriptionTypes'>
            {(arrayHelpers) => (
              <article className='overflow-auto border border-zinc-300 shadow-xl rounded-md mx-auto bg-white w-[100%] min-[900px]:w-[90%] lg:w-[80%] min-h-[175px]'>
                <OptionUpdateTable
                  addRow={(options, setOptions) => {
                    arrayHelpers.unshift({
                      ...options[0],
                      ticketlimit: 0,
                      subscriptionlimit: 0,
                    });
                    setOptions(options.slice(1));
                  }}
                  removeRow={(index, setOptions) => {
                    const {ticketlimit, subscriptionlimit, ...removed} = arrayHelpers.remove(index);
                    setOptions((prev) => [...prev, removed]);
                  }}
                  getDisabled={(options) => !options.length}
                  optionsInit={(values) =>
                    options.filter(
                      (option) =>
                        !values.some(
                          (type) =>
                            type.subscriptiontypeid_fk ===
                            option.subscriptiontypeid_fk,
                        ),
                    )
                  }
                  fieldName='subscriptionTypes'
                  rowType='Subscription Type'
                  rowComponent={SeasonSubscriptionTypeRow}
                  headings={[
                    'Subscription Type',
                    'Price',
                    'Tickets Included',
                    'Quantity',
                  ]}
                  sticky={showPopUp}
                  styles={{
                    headerItem:
                      'px-2 py-1 border-r border-zinc-300 last:border-r-0 last:justify-center',
                    headerRow:
                      'bg-zinc-200 border-b border-zinc-300 rounded-lg text-zinc-800 whitespace-nowrap p-1',
                    tableBody: 'text-zinc-700 p-1',
                  }}
                />
              </article>
            )}
          </FieldArray>
        </form>
      )}
    </Formik>
  );
};
