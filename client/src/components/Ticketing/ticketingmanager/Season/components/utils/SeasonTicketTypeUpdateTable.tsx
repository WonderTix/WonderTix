import {IconButton, Tooltip} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {SeasonTicketValues, seasonTicketDefaultValues} from './seasonCommon';

interface SeasonTicketTypeUpdateTableProps {
  seasonTicketTypeData: SeasonTicketValues[];
  onUpdate: (updatedData: SeasonTicketValues[]) => void;
}
export const SeasonTicketTypeUpdateTable = (props: SeasonTicketTypeUpdateTableProps) => {
  const {seasonTicketTypeData} = props;
  const [currentSeasonTicketTypeData, setCurrentSeasonTicketTypeData] = useState<SeasonTicketValues[]>([...seasonTicketTypeData]);
  const [seasonTicketPrice, setSeasonTicketPrice] = useState<number>(0);
  const [seasonTicketConcessionPrice, setSeasonTicketConcessionPrice] = useState<number>(0);

  useEffect(() => {
    setCurrentSeasonTicketTypeData(seasonTicketTypeData);
  }, [seasonTicketTypeData]);

  const handleUpdatedPrice = (newTicketPrice, index) => {
    const updatedData = [...currentSeasonTicketTypeData];
    updatedData[index] ={...updatedData[index], price: newTicketPrice};
    setSeasonTicketPrice(newTicketPrice);
  };
  const handleUpdatedConcessionPrice = (newTicketConcessionPrice, index) => {
    const updatedData = [...currentSeasonTicketTypeData];
    updatedData[index] ={...updatedData[index], concessionprice: newTicketConcessionPrice};
    setSeasonTicketConcessionPrice(newTicketConcessionPrice);
  };

  const handleAddTicketType = () => {
    setCurrentSeasonTicketTypeData((prevData) => [...prevData, seasonTicketDefaultValues]);
  };

  const handleFormSubmit = () => {
    props.onUpdate(currentSeasonTicketTypeData);
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
                    onClick={handleAddTicketType}
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
            {currentSeasonTicketTypeData && currentSeasonTicketTypeData.length > 0 ? (
                currentSeasonTicketTypeData.map((id, index) =>(
                <tr key={index} className='bg-gray-200'>
                  <td className={'px-2'}> {id.description}</td>
                  <td className='px-2 border border-white'><span>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='text'
                      value={`${Number(id.price).toFixed(2)}`}
                      onChange={(e) => handleUpdatedPrice(Number(e.target.value), index)}
                    />
                  </td>
                  <td className='px-2 border border-white'><span>$</span>
                    <input
                      className='w-[75px] bg-gray-100'
                      type='text'
                      value={`${Number(id.concessionprice).toFixed(2)}`}
                      onChange={(e) => handleUpdatedConcessionPrice(Number(e.target.value), index)}
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
