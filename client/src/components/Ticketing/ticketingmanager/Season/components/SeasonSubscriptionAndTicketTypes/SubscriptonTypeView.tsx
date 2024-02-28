import {FormButton} from '../../../Event/components/FormButton';
import {getKeyValue} from '../../../Event/components/ShowingUtils';
import {formatUSD} from '../../../RefundOrders/RefundOrders';
import React from 'react';
import {EditIcon} from '../../../../Icons';

interface SeasonSubscriptionTypeViewProps {
  subscriptionTypes: any[];
  setEdit: () => void;
  sticky: boolean;
  disabled: boolean;
  seasonSubscriptionTypes: any[];
}

export const SeasonSubscriptionTypeView = (
  props: SeasonSubscriptionTypeViewProps,
) => {
  const {
    subscriptionTypes,
    setEdit,
    seasonSubscriptionTypes,
    sticky,
    disabled,
  } = props;

  return (
    <>
      <header className='flex flex-row justify-between mb-3'>
        <h2 className='text-2xl text-zinc-800 font-semibold'>
          Subscription Types
        </h2>
        <FormButton
          onClick={setEdit}
          title='Edit'
          disabled={disabled}
          className='bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 rounded-xl shadow-xl p-2 text-white'
          testID='edit-season-ticket-type-table'
        >
          <EditIcon className='h-6 w-6' />
        </FormButton>
      </header>
      <article className='overflow-auto shadow-xl mx-auto border border-zinc-300 rounded-md bg-white w-[100%] min-[900px]:w-[90%] lg:w-[80%] min-h-[150px]'>
        <table className='table table-fixed text-sm min-w-[100%] min-h-[100%]'>
          <thead
            className={`whitespace-nowrap bg-zinc-200 border-b border-zinc-300 rounded-lg text-zinc-800 ${
              sticky ? '' : 'sticky'
            } top-0`}
          >
            <tr className='rounded-xl'>
              {[
                'Subscription Types',
                'Price',
                'Tickets Included',
                'Subscription Total',
                'Quantity Sold',
              ].map((heading, index) => (
                <th
                  key={index}
                  className='pl-1 py-2 border-r border-zinc-300 last:border-r-0 last:justify-center'
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-zinc-700 p-1'>
            {seasonSubscriptionTypes.map((type, index) => (
              <tr key={index}>
                <td className='px-2 text-left'>
                  {getKeyValue(
                    +type.subscriptiontypeid_fk,
                    'name',
                    subscriptionTypes,
                    'subscriptiontypeid_fk',
                  )}
                </td>
                <td className='px-2 text-right'>{formatUSD(+type.price)}</td>
                <td className='px-2 text-right'>{type.ticketlimit}</td>
                <td className='px-2 text-right'>{type.subscriptionlimit}</td>
                <td className='px-2 text-right'>{type.subscriptionssold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
};
