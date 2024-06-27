import {useTicketExchangeContext} from './TicketExchangeProvider';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Field, Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import {OptionSelect} from '../Event/components/OptionSelect';
import {QuantityInputControl} from '../../mainpage/SubscriptionPurchasing/QuantityInputControl';
import {InputControl} from '../Event/components/InputControl';
import {subscriptionItemSchema} from './TicketExchangeUtils';
import {departmentOptions} from '../AdminPurchase/utils/adminCommon';
import {
  ProviderSeason,
  ProviderSeasonSubscriptionType,
} from './ticketExchangeTypes';
import {SubscriptionCartItem} from '../ticketingSlice';

const getHandleSubscriptionTypeChange =
  (
    setFieldValue,
    subscriptionTypes: Map<string, ProviderSeasonSubscriptionType>,
    seasonid: number,
  ) =>
  async (event) => {
    const subscriptiontypeid_fk = +event.target.value;
    const subscriptionType = subscriptionTypes.get(
      `${seasonid}T${subscriptiontypeid_fk}`,
    );

    await setFieldValue('subscriptiontypeid_fk', subscriptiontypeid_fk);
    await setFieldValue('qty', 0);
    await setFieldValue('price', subscriptionType?.price ?? 0);
    await setFieldValue('fee', 0);
    await setFieldValue('department', '');
  };

interface SubscriptionProps extends ProviderSeason {
  open: boolean;
  formRef: React.Ref<FormikProps<FormikValues>>;
  setDisabled: (value: any) => void;
}

export const Subscription: React.FC<SubscriptionProps> = (props) => {
  const {name, formRef, open, seasonid, seasonsubscriptiontypes, setDisabled} =
    props;
  const {updateCart, subscriptionTypes} = useTicketExchangeContext();
  const onSubmit = useCallback(
    (cartItem: SubscriptionCartItem, formikHelpers: FormikHelpers<any>) => {
      const subscriptionType = subscriptionTypes.get(
        `${seasonid}T${cartItem.subscriptiontypeid_fk}`,
      );
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();

      if (!subscriptionType) return;

      updateCart({
        ...cartItem,
        name: `${subscriptionType.subscriptiontype.name} Subscription`,
        desc: `${subscriptionType.ticketlimit} shows for ${name}`,
      });
    },
    [subscriptionTypes],
  );

  const filteredSubscriptionTypes = useMemo(
    () =>
      seasonsubscriptiontypes.reduce<Array<{description: string; id: number}>>(
        (acc, id) => {
          const subscriptionType = subscriptionTypes.get(`${seasonid}T${id}`);
          if (subscriptionType?.subscriptionsavailable > 0) {
            acc.push({
              description: subscriptionType.subscriptiontype.name,
              id: subscriptionType.subscriptiontypeid_fk,
            });
          }
          return acc;
        },
        [],
      ),
    [subscriptionTypes],
  );

  return (
    <Formik
      onSubmit={onSubmit}
      innerRef={formRef}
      validationSchema={subscriptionItemSchema}
      initialValues={{
        seasonid_fk: seasonid,
        subscriptiontypeid_fk: -1,
        qty: 0,
        price: 0,
        department: '',
      }}
    >
      {({
        handleSubmit,
        setFieldValue,
        values,
        isSubmitting,
        isValid,
        isValidating,
      }) => {
        const subscriptionType = subscriptionTypes.get(
          `${values.seasonid_fk}T${values.subscriptiontypeid_fk}`,
        );

        useEffect(() => {
          setDisabled(isSubmitting || !isValid || isValidating);
        }, [isValid, isValidating, isSubmitting]);

        return (
          <form
            onSubmit={handleSubmit}
            className={`transition-all ease-in-out duration-300 ${
              open ? 'max-h-[200px] mt-2 p-2' : 'max-h-0'
            } grid grid-cols-12 gap-2 overflow-y-auto`}
          >
            <div className='col-span-12 tab:col-span-6'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${seasonid}subscriptiontypeid_fk`}
              >
                Subscription Type:
              </label>
              <Field
                name='subscriptiontypeid_fk'
                id={seasonid}
                component={OptionSelect}
                disabled={!filteredSubscriptionTypes.length}
                styles={{
                  select:
                    'w-full border border-zinc-300 p-3 rounded-lg disabled:text-gray-300',
                }}
                options={[
                  ...filteredSubscriptionTypes,
                  {id: -1, description: 'Select Subscription Type'},
                ]}
                handleChange={getHandleSubscriptionTypeChange(
                  setFieldValue,
                  subscriptionTypes,
                  seasonid,
                )}
              />
            </div>
            <div className='col-span-12 tab:col-span-6'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${seasonid}qty`}
              >
                Quantity:
              </label>
              <Field
                name='qty'
                id={seasonid}
                component={QuantityInputControl}
                disabled={!subscriptionType}
                quantityAvailable={
                  subscriptionType?.subscriptionsavailable ?? 0
                }
                increment={() => setFieldValue('qty', values.qty + 1)}
                decrement={() => setFieldValue('qty', values.qty - 1)}
                styles={{
                  group:
                    'flex flex-row justify-center items-center w-fit max-w-full mx-auto py-1',
                  button:
                    'text-slate-700 disabled:text-gray-300 rounded-full border border-slate-700 disabled:border-gray-300 hover:bg-slate-700 hover:text-white',
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
              id={seasonid}
              disabled={!subscriptionType}
              onChange={async (event) => {
                const price = +event.target.value;
                if (price !== 0 && values.department) {
                  await setFieldValue('department', '');
                }
                await setFieldValue('price', price);
              }}
              currency={true}
              className={{
                controlClass: `col-span-12 tab:col-span-6 rounded-lg w-full`,
                labelClass: 'block text-md font-medium text-slate-700 ml-1',
                inputClass:
                  'w-[95%] text-right bg-transparent h-full self-center disabled:text-slate-300 text-lg p-3',
                inputGroupClass: 'w-full border border-zinc-300 rounded-lg',
              }}
            />
            <div className='col-span-12 tab:col-span-6'>
              <label
                className='block text-md font-medium text-slate-700 ml-1'
                htmlFor={`${seasonid}department`}
              >
                Department:
              </label>
              <Field
                name='department'
                id={seasonid}
                component={OptionSelect}
                disabled={!subscriptionType || values.price !== 0}
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
