import React, {MutableRefObject} from 'react';
import {useTicketExchangeContext} from './TicketExchangeProvider';
import {FormikProps, FormikValues} from 'formik';
import {SeasonImage} from '../Season/seasonUtils';
import format from 'date-fns/format';
import PurchaseOption from './PurchaseOption';
import {getDate} from '../Event/components/ShowingUtils';
import {Subscription} from './Subscription';

const Subscriptions = () => {
  const {seasons, subscriptionTypes} = useTicketExchangeContext();

  if (!seasons || !subscriptionTypes || !seasons.length) {
    return <p className='w-full text-center'>NO SUBSCRIPTIONS AVAILABLE</p>;
  }

  return (
    <ul className='w-full flex flex-col gap-2 items-center p-3'>
      {seasons.map((season, index) => (
        <PurchaseOption
          key={index}
          title={season.name}
          subTitle={`${format(
            getDate(season.startdate),
            'MM/dd/yyyy',
          )} - ${format(getDate(season.enddate), 'MM/dd/yyyy')}`}
          image={
            <SeasonImage
              src={season.imageurl}
              alt={season.name}
              className='h-[80px] w-[60px] object-cover object-left-top rounded-lg'
            />
          }
          Form={(props: {
            open: boolean;
            formRef: MutableRefObject<FormikProps<FormikValues>>;
          }) => (
            <Subscription
              {...season}
              formRef={props.formRef}
              open={props.open}
            />
          )}
          id={season.seasonid}
        />
      ))}
    </ul>
  );
};

export default Subscriptions;
