import React from 'react';
import {getKeyValue} from '../../../Event/components/ShowingUtils';
import {formatUSD} from '../../../RefundOrders/RefundOrders';
import {FormButton} from '../../../Event/components/FormButton';
import {EditIcon} from '../../../../Icons';

interface SeasonTicketTypeViewProps {
  seasonTicketTypes: any[];
  sticky: boolean;
  ticketTypes: any[];
  setEdit: () => void;
  disabled: boolean;
}

export const SeasonTicketTypeView = (props: SeasonTicketTypeViewProps) => {
  const {seasonTicketTypes, ticketTypes, sticky, setEdit, disabled} = props;
  return (
    <>
      <header className='flex flex-row justify-between mb-3'>
        <h2 className='text-2xl text-zinc-800 font-semibold'>Ticket Types</h2>
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
            className={`whitespace-nowrap bg-zinc-200 border-b border-zinc-300 rounded-lg text-zinc-800 p-1 ${
              sticky ? '' : 'sticky'
            } top-0`}
          >
            <tr className='rounded-xl'>
              <th className='pl-1 py-2 border-r border-zinc-300 last:border-r-0 last:justify-center max-w-[14%]'>
                Admission Type
              </th>
              <th className='p-2 px-4 border-r border-zinc-300 last:border-r-0 last:justify-center'>
                Ticket Price
              </th>
              <th className='pl-1 py-2 border-r border-zinc-300 last:border-r-0 last:justify-center'>
                Fee
              </th>
            </tr>
          </thead>
          <tbody className='text-zinc-700 p-1'>
            {seasonTicketTypes.map((type, index) => (
              <tr key={index}>
                <td className='px-2 text-left'>
                  {getKeyValue(
                    +type.tickettypeid_fk,
                    'description',
                    ticketTypes,
                  )}
                </td>
                <td className='px-2 text-right'>{formatUSD(+type.price)}</td>
                <td className='px-2 text-right'>
                  {formatUSD(+type.fee)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
};
