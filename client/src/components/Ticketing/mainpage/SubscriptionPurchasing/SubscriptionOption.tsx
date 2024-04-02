import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {
  addSubscription,
  createSubscriptionCartItem,
  editSubscriptionQty,
  selectSubscriptionCartItem,
} from '../../ticketingmanager/ticketingSlice';
import {Field, Formik} from 'formik';
import {formatUSD} from '../../ticketingmanager/RefundOrders/RefundOrders';
import React from 'react';
import {QuantityInputControl} from './QuantityInputControl';

interface SubscriptionOption {
  option: any;
  season: any;
  setPopUpProps: any;
}

export const SubscriptionOption = (props: SubscriptionOption) => {
  const {option, season, setPopUpProps} = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentValue = useAppSelector((state) =>
    selectSubscriptionCartItem(
      state,
      option.seasonid_fk,
      option.subscriptiontypeid_fk,
    ),
  );

  if (
    currentValue &&
    currentValue.qty > option.subscriptionlimit - option.subscriptionssold
  ) {
    dispatch(
      editSubscriptionQty({
        seasonid_fk: currentValue.seasonid_fk,
        subscriptiontypeid_fk: currentValue.subscriptiontypeid_fk,
        qty: option.subscriptionlimit - option.subscriptionssold,
      }),
    );
  }

  const onSubmit = async (event) => {
    const qtyChange = event.qty - (currentValue?.qty ?? 0);
    if (!qtyChange) return;
    setPopUpProps(
      'Success!',
      `You ${qtyChange < 0 ? 'removed' : 'added'} ${Math.abs(qtyChange)} ${
        option.name
      } Subscription${Math.abs(qtyChange) > 1 ? 's' : ''} ${
        qtyChange < 0 ? 'from' : 'to'
      } your cart`,
      true,
      'subscription-cart-change-pop-up',
      () => navigate('/cart'),
      'Go To Cart',
      'Close',
    );
    dispatch(addSubscription(event));
  };

  return (
    <Formik
      initialValues={{
        ...createSubscriptionCartItem({...option, season}),
        qty: !currentValue
          ? 0
          : currentValue.qty >
            option.subscriptionlimit - option.subscriptionssold
          ? option.subscriptionlimit - option.subscriptionssold
          : currentValue.qty,
      }}
      onSubmit={onSubmit}
    >
      {({handleSubmit, values}) => (
        <form
          onSubmit={handleSubmit}
          className='bg-zinc-900/80 rounded-2xl grid grid-cols-12 p-4 shadow-x w-full min-[768px]:w-[80%] min-[1300px]:w-full'
        >
          <header className='text-zinc-200 text-center md:text-left col-span-12 md:col-span-8 min-[1300px]:col-span-6 max-[1300px]:mb-4'>
            <h2 className='text-lg font-semibold mb-1'>
              {option.name} Subscription
            </h2>
            <p className='text-sm mb-1'>{option.description}</p>
            <p className='font-bold text-md'>
              {option.ticketlimit} show{option.ticketlimit > 1 && 's'} for {formatUSD(values.price)}
            </p>
          </header>
          <div className='flex flex-row col-span-12 md:col-span-4 min-[1300px]:col-span-6 justify-center md:justify-end items-center gap-2'>
            <Field
              name='qty'
              component={QuantityInputControl}
              quantityAvailable={option.subscriptionlimit - option.subscriptionssold}
            />
            <button
              type='submit'
              disabled={values.qtyAvailable === 0}
              className='bg-blue-500 hover:bg-blue-600 disabled:bg-red-200 disabled:text-red-800  disabled:font-bold
              rounded-3xl px-3 p-2 text-white flex flex-col justify-center shadow-xl'
            >
              {values.qtyAvailable <= 0
                ? 'SOLD OUT'
                : currentValue
                ? 'Update Cart'
                : 'Add To Cart'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
