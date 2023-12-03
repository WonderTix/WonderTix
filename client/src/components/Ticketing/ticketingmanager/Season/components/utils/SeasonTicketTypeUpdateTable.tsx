import {IconButton, Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {SeasonTicketValues} from './seasonCommon';

interface SeasonTicketTypeUpdateTableProps {
  seasonTicketTypeData: SeasonTicketValues[];
}
export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeUpdateTableProps) => {
  const {seasonTicketTypeData} = props;
  const [seasonTicketPrice, setSeasonTicketPrice] = useState();
  const [seasonTicketConcessionPrice, setSeasonTicketConcessionPrice] = useState();

  const handleUpdatedPrice = (newTicketPrice) => {
    setSeasonTicketPrice(newTicketPrice);
  };
  const handleUpdatedConcessionPrice = (newTicketConcessionPrice) => {
    setSeasonTicketConcessionPrice(newTicketConcessionPrice);
  };

  return (
    <div className={'bg-gray-300 grid grid-cols-12 rounded-xl p-1 h-[100%]'}>
      <div className={'overflow-y-auto overflow-x-auto col-span-12 shadow-xl border border-white rounded-xl bg-white w-[100%] min-h-[100px]'}>
        <table className='table table-fixed text-sm min-w-[100%]'>
          <thead className='text-left text-zinc-800 whitespace-nowrap bg-gray-300 sticky top-0'>
            <tr className='rounded-xl'>
              <th className='px-2 py-1 border-b border-r border-white'>Admission Type</th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>Ticket Price</th>
              <th className='px-2 py-1 border-b border-l border-r border-white'>Concession Price</th>
              <th className='px-2 py-1 border-b border-l border-white'>
                <Tooltip title="Add Ticket Type" arrow>
                  <IconButton
                    size={'small'}
                    aria-label={'add ticket type'}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      stroke='white'
                      strokeWidth={1.5}
                      className={'w-[1.5rem] h-[1.5] text-green-500'}
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm whitespace-nowrap text-zinc-800'>
            {seasonTicketTypeData && seasonTicketTypeData.length > 0 ? (
                seasonTicketTypeData.map((id, index) =>(
                <tr key={index} className='bg-gray-200'>
                  <td className={'px-2'}> {id.description}</td>
                  <td className='px-2 border border-white'><span>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='text'
                      value={`${Number(id.price).toFixed(2)}`}
                      onChange={(e) => handleUpdatedPrice(e.target.value)}
                    />
                  </td>
                  <td className='px-2 border border-white'><span>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='text'
                      value={`${Number(id.concessionprice).toFixed(2)}`}
                      onChange={(e) => handleUpdatedConcessionPrice(e.target.value)}
                    />
                  </td>
                  <td className='px-2 border border-white'></td>
                </tr>
            ))
            ) : (
              <tr>
                <td></td>
                <td className={'px-2'}><span>No Current Ticket Types</span></td>
                <td></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
