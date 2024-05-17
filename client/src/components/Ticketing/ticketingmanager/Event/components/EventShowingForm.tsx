import {UpdatedShowing} from '../../../../../interfaces/showing.interface';
import React from 'react';
import {Field, FieldArray, Formik} from 'formik';
import {InputControl} from './InputControl';
import {toDateStringFormat} from './util/EventsUtil';
import {OptionUpdateTable} from './OptionUpdateTable';
import {FormSubmitButton} from './FormSubmitButton';
import {eventInstanceSchema} from './event.schemas';
import {useEvent} from './EventProvider';
import {getInstanceTicketType} from './ShowingUtils';
import {FormButton} from './FormButton';
import {BackIcon, SaveIcon} from '../../../Icons';
import {FormSwitch} from '../../Season/components/SeasonSubscriptionAndTicketTypes/FormSwitch';
import {TicketTypeTableRow} from './TicketTypeTableRow';

interface EventShowingFormProps {
  initialValues?: UpdatedShowing;
  onSubmit: (event, action) => Promise<void>;
  onLeaveEdit?: () => void;
}

export const EventShowingForm = (props: EventShowingFormProps) => {
  const {initialValues, onSubmit, onLeaveEdit} = props;
  const {eventID, showPopUp, ticketTypes} = useEvent();
  const baseValues = {
    availableseats: initialValues ? initialValues.availableseats : 0,
    eventdate: initialValues ? toDateStringFormat(initialValues.eventdate) : '',
    eventid_fk: initialValues ? initialValues.eventid_fk : eventID,
    eventinstanceid: initialValues ? initialValues.eventinstanceid : 0,
    eventtime: initialValues
      ? initialValues.eventtime.split('T')[1].slice(0, 8)
      : '',
    ispreview: initialValues?.ispreview ?? false,
    defaulttickettype: 1,
    purchaseuri: 'http://null.com',
    instanceTicketTypes: initialValues
      ? initialValues.ticketrestrictions.map((restriction) => {
        // Remove ticketssold from restriction so it isn't passed to PUT API
        const {ticketssold, ...restOfRestriction} = restriction;
        return restOfRestriction;
      }): [],
    salestatus: true,
    totalseats: initialValues ? initialValues.totalseats : 0,
    detail: initialValues?.detail ? initialValues.detail : '',
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
      {({handleSubmit, values, setFieldValue}) => (
        <form onSubmit={handleSubmit} className={'bg-gray-300 rounded-xl p-2'}>
          <div
            className={
              'bg-gray-200 grid grid-cols-12 p-4 rounded-lg min-[1350px]:h-[280px] gap-2'
            }
          >
            <div
              className={
                'flex flex-col justify-center bg-white m-auto col-span-12 min-[1350px]:col-span-4 rounded-lg p-3 w-[100%] h-[100%] shadow-xl'
              }
            >
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
                name='detail'
                component={InputControl}
                label='Detail'
                type='text'
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
                  {values.eventinstanceid
                    ? values.availableseats
                    : values.totalseats}
                </p>
              </div>
              <Field
                name='ispreview'
                component={FormSwitch}
                className={inputControlClassName}
                label='Preview'
                size='small'
                color='primary'
                onChange={(value) => setFieldValue('ispreview', value)}
              />
            </div>
            <FieldArray
              name='instanceTicketTypes'
              render={(arrayHelpers) => {
                return (
                  <article
                    className='overflow-auto col-span-12 min-[1350px]:col-span-7 shadow-xl mx-auto rounded-xl bg-white w-[100%] min-h-[100px]'
                  >
                    <OptionUpdateTable
                      addRow={(options, setOptions) => {
                        arrayHelpers.unshift(getInstanceTicketType(options[0]));
                        setOptions(options.slice(1));
                      }}
                      removeRow={(index, setOptions) => {
                        const {ticketlimit, ...removed} = arrayHelpers.remove(index);
                        setOptions((prev) => [...prev, removed]);
                      }}
                      getDisabled={(options) => !options.length}
                      optionsInit={(values) =>
                        ticketTypes.filter(
                          (type) =>
                            !values.some(
                              (restriction) =>
                                +restriction.tickettypeid_fk === +type.tickettypeid_fk,
                            ),
                        )
                      }
                      fieldName='instanceTicketTypes'
                      rowType='Ticket Type'
                      sticky={showPopUp}
                      rowComponent={TicketTypeTableRow}
                      headings={[
                        'Admission Type',
                        'Ticket Price',
                        'Fee',
                        'Quantity',
                      ]}
                      styles={{
                        headerRow:
                          'text-left text-zinc-800 whitespace-nowrap bg-gray-300',
                        headerItem:
                          'px-2 py-1 border-b border-l border-r border-white',
                        tableBody: 'text-sm whitespace-nowrap text-zinc-700',
                      }}
                    />
                  </article>
                );
              }}
            />
            <div className='flex flex-row min-[1350px]:grid content-center min-[1350px]:grid-cols-1 gap-3 mx-auto col-span-12 min-[1350px]:col-span-1'>
              <FormSubmitButton
                disabled={showPopUp}
                className='flex items-center justify-center bg-green-500 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold p-2 rounded-xl shadow-xl'
                testID='showing-save-button'
              >
                <SaveIcon className='h-7 w-7' />
              </FormSubmitButton>
              {onLeaveEdit && (
                <FormButton
                  title='Back'
                  testID='showing-leave-edit'
                  disabled={showPopUp}
                  onClick={onLeaveEdit}
                  className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-xl p-2 font-bold shadow-xl'
                >
                  <BackIcon className='h-7 w-7' />
                </FormButton>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
