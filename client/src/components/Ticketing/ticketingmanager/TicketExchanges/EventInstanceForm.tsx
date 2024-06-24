import React from 'react';
import {eventInstanceItemSchema, getDateTime} from './TicketExchangeUtils';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import format from 'date-fns/format';
import {Field, Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import {OptionSelect} from '../Event/components/OptionSelect';
import {QuantityInputControl} from '../../mainpage/SubscriptionPurchasing/QuantityInputControl';
import {InputControl} from '../Event/components/InputControl';
import {ProviderEvent} from './ticketExchangeInterfaces';
import {departmentOptions} from '../AdminPurchase/utils/adminCommon';
import {TicketCartItem} from '../ticketingSlice';

const getHandleEventInstanceChange = (setFieldValue) => (event) => {
  setFieldValue('product_id', +event.target.value);
  setFieldValue(`typeID`, -1);
  setFieldValue(`price`, 0);
  setFieldValue(`fee`, 0);
  setFieldValue(`qty`, 0);
  setFieldValue(`department`, '');
};

const getHandleTicketTypeChange =
  (setFieldValue, ticketRestrictions) => (event) => {
    const ticketrestriction = ticketRestrictions.get(+event.target.value);
    setFieldValue(`typeID`, ticketrestriction?.ticketrestrictionsid ?? -1);
    setFieldValue(`price`, ticketrestriction?.price ?? 0);
    setFieldValue(`fee`, ticketrestriction?.fee ?? 0);
    setFieldValue(`qty`, 0);
    setFieldValue(`department`, '');
  };

const EventInstanceForm: React.FC<
  ProviderEvent & {open: boolean; formRef: React.Ref<FormikProps<FormikValues>>}
> = (props) => {
  const {eventname, eventinstances, open, formRef, eventid} = props;
  const {eventInstances, ticketRestrictions, updateCart} =
    useTicketExchangeContext();
  const onSubmit = (
    cartItem: TicketCartItem,
    formikHelpers: FormikHelpers<any>,
  ) => {
    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm();
    const eventInstance = eventInstances.get(cartItem.product_id);
    const ticketRestriction = ticketRestrictions.get(cartItem.typeID);
    if (eventInstance && ticketRestriction) {
      const date = getDateTime(eventInstance.eventdate, eventInstance.eventtime);
      updateCart({
        ...cartItem,
        name: `${eventname} ticket${cartItem.qty > 1 ? 's' : ''}`,
        desc: `${ticketRestriction?.tickettype?.description} - ${format(
          date,
          'eee, MMM dd - h:mm a',
        )}`,
        eventId: eventInstance.eventid_fk,
        date,
        payWhatCan: false,
      });
    }
  };

  const filteredEventInstances = eventinstances
    .filter((instance) => eventInstances.get(instance)?.availableseats > 0)
    .map((instance) => {
      const eventInstance = eventInstances.get(instance);
      return {
        description: `${format(
          getDateTime(eventInstance.eventdate, eventInstance.eventtime),
          'MM/dd/yyy h:mm a',
        )}${eventInstance.detail ? ` - ${eventInstance.detail}` : ''}`,
        id: instance,
      };
    });

  return (
    <Formik
      onSubmit={onSubmit}
      innerRef={formRef}
      validationSchema={eventInstanceItemSchema}
      initialValues={{
        product_id: -1,
        typeID: -1,
        qty: 0,
        price: 0,
        fee: 0,
        department: '',
      }}
    >
      {({handleSubmit, setFieldValue, values}) => {
        const eventInstance = eventInstances.get(values.product_id);
        return (
          <form
            onSubmit={handleSubmit}
            className={`transition-all ease-in-out duration-300 ${
              open ? 'max-h-[200px] mt-2 p-2' : 'max-h-0'
            } grid grid-cols-12 gap-2 overflow-y-auto`}
          >
            <div className='col-span-12 tab:col-span-5'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${eventid}-product_id`}
              >
                Showing:
              </label>
              <Field
                name={`product_id`}
                id={`${eventid}-product_id`}
                component={OptionSelect}
                disabled={!filteredEventInstances.length}
                styles={{
                  select:
                    'w-full border border-zinc-300 p-3 rounded-lg disabled:text-gray-300',
                }}
                options={[
                  ...filteredEventInstances,
                  {id: -1, description: 'Select Showing'},
                ]}
                handleChange={getHandleEventInstanceChange(setFieldValue)}
              />
            </div>
            <div className='col-span-12 tab:col-span-5'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${eventid}-typeID`}
              >
                Ticket Type:
              </label>
              <Field
                name='typeID'
                id={`${eventid}-typeID`}
                component={OptionSelect}
                disabled={!eventInstance}
                styles={{
                  select:
                    'w-full border border-zinc-300 p-3 rounded-lg disabled:text-gray-300',
                }}
                options={
                  !eventInstance
                    ? [{id: -1, description: 'Select Ticket Type'}]
                    : eventInstance.ticketrestrictions.reduce(
                        (acc, res) => {
                          const restriction = ticketRestrictions.get(res);
                          if (restriction?.ticketsavailable > 0) {
                            acc.push({
                              id: res,
                              description:
                                ticketRestrictions.get(res).tickettype
                                  .description,
                            });
                          }
                          return acc;
                        },
                        [{id: -1, description: 'Select Ticket Type'}],
                      )
                }
                handleChange={getHandleTicketTypeChange(
                  setFieldValue,
                  ticketRestrictions,
                )}
              />
            </div>
            <div className='col-span-12 tab:col-span-2'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${eventid}-qty`}
              >
                Quantity:
              </label>
              <Field
                name={`qty`}
                id={`${eventid}-qty`}
                component={QuantityInputControl}
                disabled={values.typeID === -1}
                quantityAvailable={
                  values.typeID === -1
                    ? 0
                    : Math.min(
                        ticketRestrictions.get(values.typeID)?.ticketsavailable,
                        eventInstance.availableseats,
                      )
                }
                increment={() => setFieldValue('qty', values.qty + 1)}
                decrement={() => setFieldValue('qty', values.qty - 1)}
                styles={{
                  group:
                    'flex flex-row justify-center items-center w-fit max-w-full mx-auto py-1',
                  button: 'text-slate-700 disabled:text-gray-300 rounded-full border border-slate-700 disabled:border-gray-300 hover:bg-slate-700 hover:text-white',
                  quantity: 'text-2xl px-2',
                  icon: 'h-5 w-5',
                }}
              />
            </div>
            <Field
              name='price'
              component={InputControl}
              type='number'
              label='Price'
              id={`${eventid}-price`}
              disabled={values.typeID === -1}
              onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                const price = +event.target.value;
                if (price !== 0 && values.department) {
                  await setFieldValue('department', '');
                }
                await setFieldValue('price', price);
              }}
              currency={true}
              className={{
                controlClass: `col-span-12 tab:col-span-4 rounded-lg w-full`,
                labelClass: 'block text-md font-medium text-slate-700 ml-1',
                inputClass:
                  'w-[95%] text-right bg-transparent h-full self-center disabled:text-slate-300 text-lg p-3',
                inputGroupClass: 'w-full border border-zinc-300 rounded-lg',
              }}
            />
            <Field
              name='fee'
              component={InputControl}
              type='number'
              label='Fee'
              id={`${eventid}-fee`}
              disabled={values.typeID === -1}
              currency={true}
              className={{
                controlClass: `col-span-12 tab:col-span-4 rounded-lg w-full`,
                labelClass: 'block text-md font-medium text-slate-700 ml-1',
                inputClass:
                  'w-[95%] text-right bg-transparent h-full self-center disabled:text-slate-300 text-lg p-3',
                inputGroupClass: 'w-full border border-zinc-300 rounded-lg',
              }}
            />
            <div className='col-span-12 tab:col-span-4'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${eventid}-department`}
              >
                Department:
              </label>
              <Field
                name='department'
                id={`${eventid}-department`}
                component={OptionSelect}
                disabled={values.typeID === -1 || values.price > 0}
                styles={{
                  select:
                    'w-full border border-zinc-300 p-3 rounded-lg disabled:text-slate-300',
                }}
                options={[
                  ...Object.keys(departmentOptions).map((key) => ({
                    description: departmentOptions[key],
                    id: key,
                  })),
                  {description: 'No Department', id: ''},
                ]}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EventInstanceForm;
